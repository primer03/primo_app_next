import { sql } from "@vercel/postgres";
export default class ScoreModel {
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

    async createScoreTable() {
        try {
            await this.client.query(
                `CREATE TABLE IF NOT EXISTS scores (
                    id SERIAL PRIMARY KEY, 
                    name TEXT NOT NULL, 
                    score INT NOT NULL
                )`
            );

            const generation = Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`)
            generation.map(async (item, index) => {
                await this.client.query(
                    `INSERT INTO scores (name, score) VALUES ($1, $2)`,
                    [item, 0]
                );
            })
            if (this.client) {
                return {
                    status: "success",
                    message: "Score created successfully"
                }
            }
        } catch (error) {
            console.error('Failed to create scores table', error);
        }
    }

    async insertScore(name, score) {
        try {
            await this.client.query(
                `INSERT INTO scores (name, score) VALUES ($1, $2)`,
                [name, score]
            );
        } catch (error) {
            console.error('Failed to insert score', error);
        }
    }

    async updateScore(name, score) {
        try {
            const oldScore = await this.client.query(
                `SELECT score FROM scores WHERE name = $1`,
                [name]
            );
            await this.client.query(
                `UPDATE scores SET score = $2 WHERE name = $1`,
                [name, parseInt(oldScore.rows[0].score) + parseInt(score)]
            );
            if (this.client) {
                return {
                    status: "success",
                    message: "Score updated successfully"
                }
            }
        } catch (error) {
            console.error('Failed to update score', error);
        }
    }

    async getScore(){
        try {
            const score = await this.client.query(
                `SELECT * FROM scores`
            );
            return score.rows;
        } catch (error) {
            console.error('Failed to get score', error);
        }
    }

    async dropTable() {
        try {
            await this.client.query(`DROP TABLE IF EXISTS scores`);
        } catch (error) {
            console.error('Failed to drop scores table', error);
        }
    }
}