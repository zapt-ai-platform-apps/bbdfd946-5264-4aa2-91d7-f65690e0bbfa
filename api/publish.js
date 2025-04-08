import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { websites } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: publish endpoint called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Get website ID from request
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Website ID is required' });
    }
    
    // Connect to the database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Verify the website belongs to the user
    const websiteCheck = await db.select()
      .from(websites)
      .where(eq(websites.id, id))
      .where(eq(websites.userId, user.id));
    
    if (websiteCheck.length === 0) {
      console.log('Website not found or does not belong to user');
      return res.status(404).json({ error: 'Website not found' });
    }
    
    // Generate a unique URL for the published website
    // In a real implementation, this would be more sophisticated
    const publishedUrl = `${process.env.VITE_PUBLIC_APP_ID}-${id}`;
    
    // Update the website to mark it as published
    const result = await db.update(websites)
      .set({
        published: true,
        publishedUrl,
        updatedAt: new Date()
      })
      .where(eq(websites.id, id))
      .returning();
    
    console.log('Website published:', result[0].id);
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error in publish API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}