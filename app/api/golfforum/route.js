// app/api/golfforum/route.js
import { NextResponse } from 'next/server';
import { query } from "../../lib/db"; // Adjust the path as necessary

export async function GET(request) {
  try {
    const sql = "SELECT * FROM forums.golfforum";
    const results = await query(sql);
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
    try {
      // Parse the JSON body of the request
      const body = await request.json();
      const { name, date, text } = body;
  
      // Validate the presence of required fields
      if (!name || !date || !text) {
        return NextResponse.json(
          { error: "Missing required fields: name, date, text" },
          { status: 400 }
        );
      }
  
      // Validate 'date' is a valid date
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid 'date' format." },
          { status: 400 }
        );
      }
  
      // Define the SQL query to insert a new forum post
      const sql = "INSERT INTO forums.golfforum (name, date, text) VALUES (?, ?, ?)";
      const values = [name, parsedDate, text];
  
      // Execute the query
      const result = await query(sql, values);
  
      // Return a success response with the new post's ID
      return NextResponse.json(
        { message: "Forum post created successfully", id: result.insertId },
        { status: 201 }
      );
    } catch (error) {
      console.error("POST API Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
