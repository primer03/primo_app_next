import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export async function GET(request) {
    const client = await sql.connect()
    try{
        // await client.sql`CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name TEXT NOT NULL)`
        // const UserData = ['Macus Anthony','Jessica','John Doe'];
        // UserData.forEach(async (name)=>{
        //     await client.sql`INSERT INTO users (name) VALUES (${name})`
        // })
        // await client.sql`DELETE FROM users`
        // client.sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
        // await client.sql`DROP TABLE users CASCADE`
    }catch(err){
        console.log(err)
    }
    const users = await client.sql`SELECT * FROM users`
    console.log(users)
    return NextResponse.json(users.rows, {
        headers: {
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    })
}