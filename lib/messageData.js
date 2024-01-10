import { sql } from "@vercel/postgres";

export default class MessageModel {
    constructor() {
        this.client = null;
    }

    async initClient() {
        try {
            this.client = await sql.connect();
        } catch (error) {
            console.error('Failed to connect to the database', error);
        }
    }
    async createMessageTable() {
        try {
            await this.client.query(
                `CREATE TABLE IF NOT EXISTS messages (
                    id SERIAL PRIMARY KEY, 
                    generation TEXT NOT NULL, 
                    type TEXT NOT NULL,
                    url TEXT NOT NULL,
                    folder TEXT NOT NULL,
                    public_id TEXT NOT NULL,
                    width INT NOT NULL,
                    height INT NOT NULL,
                    active BOOLEAN DEFAULT FALSE
                )`
            );
        } catch (error) {
            console.error('Failed to create messages table', error);
        }
    }
    async insertMessage(generation, type, url, folder, public_id, width, height) {
        console.log(generation, type, url, folder, public_id, width, height);
        try {
            await this.client.query(
                `INSERT INTO messages (generation, type, url, folder, public_id, width, height) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [generation, type, url, folder, public_id, width, height]
            );
            if (this.client) {
                return true;
            }
        } catch (error) {
            console.error('Failed to insert message', error);
        }
    }
    async getMessages() {
        try {
            const results = await this.client.query(`SELECT * FROM messages`);
            return results.rows;
        } catch (error) {
            console.error('Failed to get messages', error);
        }
    }

    async countMessages() {
        try {
            const results = await this.client.query(`SELECT COUNT(*) FROM messages`);
            return results.rows[0]['count'];
        } catch (error) {
            console.error('Failed to get messages', error);
        }
    }

    async getMessage(id) {
        try {
            const results = await this.client.query(`SELECT * FROM messages WHERE id = $1`, [id]);
            return results.rows[0];
        } catch (error) {
            console.error('Failed to get message', error);
        }
    }

    async dropTable() {
        try {
            await this.client.query(`DROP TABLE messages CASCADE`);
        } catch (error) {
            console.error('Failed to drop messages table', error);
        }
    }

    async check_public_id(public_id) {
        try {
            const results = await this.client.query(`SELECT * FROM messages WHERE public_id = $1`, [public_id]);
            if (results.rows.length > 0) {
                if (results.rows[0].active == true) {
                    return { status: "error", message: "คะแนนนี้ถูกใช้งานไปแล้ว" };
                } else {
                    return { status: "success", message: "คะแนนนี้ยังไม่ถูกใช้งาน", data: results.rows[0] };
                }
            }else{
                return { status: "error", message: "ไม่พบไอดีนี้ในระบบ" };
            }
        } catch (error) {
            console.error('Failed to get message', error);
        }
    }

    async update_active(public_id) {
        try {
            await this.client.query(
                `UPDATE messages SET active = TRUE WHERE public_id = $1`,
                [public_id]
            );
            if (this.client) {
                return true;
            }
        } catch (error) {
            console.error('Failed to update message', error);
        }
    }

    async closeClient() {
        try {
            await this.client.end();
        } catch (error) {
            console.error('Failed to close the database connection', error);
        }
    }
}