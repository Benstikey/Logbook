import { Pool } from 'pg';

// Create a new pool using the connection string from your .env file
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async (req, res) => {
    const { userId } = req.query;

    console.log('Fetching activities for user:', userId);

    try {
        const queryText = 'SELECT * FROM activities WHERE userId = $1';
        const queryParams = [userId];
        const response = await pool.query(queryText, queryParams);

        res.json({ status: 'success', data: response.rows });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching activities' });
    }
};
