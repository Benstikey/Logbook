import pkg from 'pg';
const { Pool } = pkg;
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

// Create a new pool using the connection string from your .env file
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { userId, category, activity, date, info2, info3, info4 } = req.body;

    console.log('Received data:', { userId, category, activity, date, info2, info3, info4 });

    if (!uuidValidate(userId)) {
        res.status(400).json({ status: 'error', message: 'Invalid userId format' });
        return;
    }

    try {
        const queryText = 'INSERT INTO activities(userId, category, activity, date, info2, info3, info4) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const queryParams = [userId, category, activity, date, info2, info3, info4];
        const response = await pool.query(queryText, queryParams);

        res.json({ status: 'success', data: response.rows[0] });
    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(500).json({ status: 'error', message: 'Error saving activity' });
    }
};