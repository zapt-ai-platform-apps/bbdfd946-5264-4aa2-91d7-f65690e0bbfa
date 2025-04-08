import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: user endpoint called with method:', req.method);
  
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Connect to the database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    if (req.method === 'GET') {
      // Check if user exists in our database
      const existingUser = await db.select()
        .from(users)
        .where(eq(users.id, user.id));
      
      if (existingUser.length === 0) {
        // User doesn't exist in our database, create them
        console.log('User not found in database, creating:', user.id);
        const newUser = await db.insert(users)
          .values({
            id: user.id,
            email: user.email
          })
          .returning();
        
        console.log('User created:', newUser[0].id);
        return res.status(201).json(newUser[0]);
      }
      
      console.log('User found:', existingUser[0].id);
      return res.status(200).json(existingUser[0]);
    } 
    
    else if (req.method === 'PUT') {
      // Only allow updating email for now (limited functionality)
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      const updatedUser = await db.update(users)
        .set({
          email,
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id))
        .returning();
      
      console.log('User updated:', updatedUser[0].id);
      return res.status(200).json(updatedUser[0]);
    }
    
    else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in user API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}