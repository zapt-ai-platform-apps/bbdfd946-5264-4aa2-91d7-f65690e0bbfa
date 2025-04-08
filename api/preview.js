import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { websites } from '../drizzle/schema.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: preview endpoint called with method:', req.method);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Website ID is required' });
    }
    
    console.log('Fetching website for preview:', id);
    
    // Connect to the database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get website data
    const result = await db.select()
      .from(websites)
      .where(eq(websites.id, id));
    
    if (result.length === 0) {
      console.log('Website not found');
      return res.status(404).json({ error: 'Website not found' });
    }
    
    console.log('Website found:', result[0].id);
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error in preview API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}