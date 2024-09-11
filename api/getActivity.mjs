import pkg from 'pg';
const { Pool } = pkg;
import { v5 as uuidv5 } from 'uuid';

// Create a UUID namespace (use the same one as in storeActivity.mjs)
const UUID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

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

    if (!userId) {
        res.status(400).json({ status: 'error', message: 'Missing userId' });
        return;
    }

    // Generate a UUID from the Clerk userId
    const uuidUserId = uuidv5(userId, UUID_NAMESPACE);

    try {
        const queryText = 'SELECT * FROM activities WHERE userId = $1';
        const queryParams = [uuidUserId];
        const response = await pool.query(queryText, queryParams);

        const activities = response.rows.map(activity => {
            let info1, info2, info3;
            switch (activity.category.toLowerCase()) {
                case 'movies':
                    info1 = activity.info2; // Watched on
                    info2 = activity.info3; // Review
                    info3 = activity.info4; // Directed by
                    break;
                case 'books':
                    info1 = activity.info2; // Read on
                    info2 = activity.info3; // Review
                    info3 = activity.info4; // Written by
                    break;
                case 'flights':
                    info1 = activity.info2; // Flight Number
                    info2 = activity.info3; // Distance
                    info3 = activity.info4; // Days Traveling
                    break;
                default:
                    info1 = activity.info2;
                    info2 = activity.info3;
                    info3 = activity.info4;
            }
            return {
                title: activity.activity,
                category: activity.category,
                info1,
                info2,
                info3
            };
        });

        res.json({ status: 'success', data: activities });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching activities' });
    }
};
