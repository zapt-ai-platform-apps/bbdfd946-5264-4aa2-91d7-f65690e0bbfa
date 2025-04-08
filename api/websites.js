import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { websites } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: websites endpoint called with method:', req.method);
  
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);

    // Connect to the database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Handle different HTTP methods
    if (req.method === 'GET') {
      console.log('Fetching websites for user:', user.id);
      const result = await db.select()
        .from(websites)
        .where(eq(websites.userId, user.id))
        .orderBy(websites.updatedAt);

      console.log(`Found ${result.length} websites`);
      return res.status(200).json(result);
    } 
    
    else if (req.method === 'POST') {
      console.log('Creating new website');
      const { name, description } = req.body;
      
      const result = await db.insert(websites).values({
        name,
        description,
        components: [],
        userId: user.id
      }).returning();
      
      console.log('Website created with ID:', result[0].id);
      return res.status(201).json(result[0]);
    }
    
    else if (req.method === 'PUT') {
      console.log('Updating website:', req.body.id);
      const { id, name, description, components } = req.body;
      
      // Verify the website belongs to the user
      const websiteCheck = await db.select()
        .from(websites)
        .where(eq(websites.id, id))
        .where(eq(websites.userId, user.id));

      if (websiteCheck.length === 0) {
        console.log('Website not found or does not belong to user');
        return res.status(404).json({ error: 'Website not found' });
      }
      
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (components !== undefined) updateData.components = components;
      updateData.updatedAt = new Date();
      
      const result = await db.update(websites)
        .set(updateData)
        .where(eq(websites.id, id))
        .returning();
      
      console.log('Website updated:', result[0].id);
      return res.status(200).json(result[0]);
    }
    
    else if (req.method === 'DELETE') {
      console.log('Deleting website:', req.query.id);
      const id = req.query.id;
      
      // Verify the website belongs to the user
      const websiteCheck = await db.select()
        .from(websites)
        .where(eq(websites.id, id))
        .where(eq(websites.userId, user.id));

      if (websiteCheck.length === 0) {
        console.log('Website not found or does not belong to user');
        return res.status(404).json({ error: 'Website not found' });
      }
      
      await db.delete(websites)
        .where(eq(websites.id, id));
      
      console.log('Website deleted:', id);
      return res.status(204).send();
    }
    
    else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in websites API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}