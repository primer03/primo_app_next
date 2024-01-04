// import { sql } from "@vercel/postgres";

// export default class UserModel {
//     constructor() {
//         this.client = null;
//     }

//     async initClient() {
//         try {
//             this.client = await sql.connect();
//         } catch (error) {
//             console.error('Failed to connect to the database', error);
//         }
//     }

//     async createUserTable() {
//         try {
//             await this.client.query(
//                 `CREATE TABLE IF NOT EXISTS users (
//                     id SERIAL PRIMARY KEY, 
//                     name TEXT NOT NULL, 
//                     email TEXT NOT NULL
//                 )`
//             );
//         } catch (error) {
//             console.error('Failed to create users table', error);
//         }
//     }

//     async insertUser(name, email) {
//         try {
//             await this.client.query(
//                 `INSERT INTO users (name, email) VALUES ($1, $2)`,
//                 [name, email]
//             );
//         } catch (error) {
//             console.error('Failed to insert user', error);
//         }
//     }

//     async getUsers() {
//         try {
//             const results = await this.client.query(`SELECT * FROM users`);
//             return results.rows;
//         } catch (error) {
//             console.error('Failed to get users', error);
//         }
//     }

//     async closeClient() {
//         try {
//             await this.client.end();
//         } catch (error) {
//             console.error('Failed to close the database connection', error);
//         }
//     }

//     async dropTable() {
//         try {
//             await this.client.query(`DROP TABLE users CASCADE`);
//         } catch (error) {
//             console.error('Failed to drop users table', error);
//         }
//     }
// }