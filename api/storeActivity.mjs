import pkg from 'pg';
const { Pool } = pkg;
import { v5 as uuidv5 } from 'uuid';

// Create a UUID namespace (you can use any valid UUID here)
const UUID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

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

    if (!userId || !category || !activity || !date) {
        console.error('Missing required fields:', { userId, category, activity, date });
        res.status(400).json({ status: 'error', message: 'Missing required fields' });
        return;
    }

    // Generate a UUID from the Clerk userId
    const uuidUserId = uuidv5(userId, UUID_NAMESPACE);

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.error('Invalid date format:', date);
        res.status(400).json({ status: 'error', message: 'Invalid date format' });
        return;
    }

    try {
        let queryText;
        let queryParams;

        switch (category.toLowerCase()) {
            case 'movies':
                queryText = 'INSERT INTO activities(userId, category, activity, date, info2, info3, info4) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                queryParams = [uuidUserId, category, activity, date, info2, info3, info4]; // info2: Watched on, info3: Review, info4: Directed by
                break;
            case 'books':
                queryText = 'INSERT INTO activities(userId, category, activity, date, info2, info3, info4) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                queryParams = [uuidUserId, category, activity, date, info2, info3, info4]; // info2: Read on, info3: Review, info4: Written by
                break;
            case 'flights':
                queryText = 'INSERT INTO activities(userId, category, activity, date, info2, info3, info4) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                queryParams = [uuidUserId, category, activity, date, info2, info3, info4]; // info2: Flight Number, info3: Distance, info4: Days Traveling
                break;
            default:
                queryText = 'INSERT INTO activities(userId, category, activity, date, info2, info3, info4) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                queryParams = [uuidUserId, category, activity, date, info2, info3, info4];
        }

        const response = await pool.query(queryText, queryParams);

        res.json({ status: 'success', data: response.rows[0] });
    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(500).json({ status: 'error', message: 'Error saving activity' });
    }
};