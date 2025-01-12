import { query } from './db';

export async function getAllPosts() {
    const sql = "SELECT * FROM forums.golfforum ORDER BY date DESC";
    const results = await query(sql);
    
    return results;
  }