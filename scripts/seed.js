const { db } = require('@vercel/postgres');
const { users, movies, books, flights } = require('../lib/placeholder-data');
const bcrypt = require('bcrypt');

async function seedUsers() {
    try {
        await db.connect();

        // Create the "users" table if it doesn't exist
        await db.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return db.sql`
                    INSERT INTO users (id, name, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        await db.end();
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedMovies() {
    try {
        await db.connect();

        // Create "movies" table if it doesn't exist
        await db.sql`
            CREATE TABLE IF NOT EXISTS movies (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date_watched DATE,
                watched_with VARCHAR(255),
                review VARCHAR(255)
            );
        `;

        console.log(`Created "movies" table`);

        // Insert data into the "movies" table
        const insertedMovies = await Promise.all(
            movies.map(async (movie) => {
                return db.sql`
                    INSERT INTO movies (id, title, date_watched, watched_with, review)
                    VALUES (${movie.id}, ${movie.title}, ${movie.info1}, ${movie.info2}, ${movie.info3})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedMovies.length} movies`);

        await db.end();
    } catch (error) {
        console.error('Error seeding movies:', error);
        throw error;
    }
}

async function seedBooks() {
    try {
        await db.connect();

        // Create "books" table if it doesn't exist
        await db.sql`
            CREATE TABLE IF NOT EXISTS books (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date_watched DATE,
                watched_with VARCHAR(255),
                review VARCHAR(10)
            );
        `;

        console.log(`Created "books" table`);

        // Insert data into the "books" table
        const insertedBooks = await Promise.all(
            books.map(async (book) => {
                return db.sql`
                    INSERT INTO books (id, title, date_watched, watched_with, review)
                    VALUES (${book.id}, ${book.title}, ${book.info1}, ${book.info2}, ${book.info3})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedBooks.length} books`);

        await db.end();
    } catch (error) {
        console.error('Error seeding books:', error);
        throw error;
    }
}

async function seedFlights() {
    try {
        await db.connect();

        // Create "flights" table if it doesn't exist
        await db.sql`
            CREATE TABLE IF NOT EXISTS flights (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                departure_arrival VARCHAR(255),
                flight_number VARCHAR(10) NOT NULL,
                arrival_date DATE,
                distance_traveled VARCHAR(10) NOT NULL
            );
        `;

        console.log(`Created "flights" table`);

        // Insert data into the "flights" table
        const insertedFlights = await Promise.all(
            flights.map(async (flight) => {
                return db.sql`
                    INSERT INTO flights (id, departure_arrival, flight_number, arrival_date, distance_traveled)
                    VALUES (${flight.id}, ${flight.title}, ${flight.info1}, ${flight.info2}, ${flight.info3})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedFlights.length} flights`);

        await db.end();
    } catch (error) {
        console.error('Error seeding flights:', error);
        throw error;
    }
}
// Add additional seeding functions for other categories and data as needed

// Import any additional seeding functions as needed
async function seedAllData() {
    try {
        await seedUsers(); // Seed users data
        await seedMovies(); // Seed movies data
        await seedBooks(); // Seed books data
        await seedFlights(); // Seed flights data
        // Add more seeding functions for other categories if needed

        console.log('All data seeded successfully.');
    } catch (error) {
        console.error('An error occurred while seeding the database:', error);
        throw error;
    }
}

// Call the seedAllData function to initiate the seeding process for all categories
seedAllData().catch((err) => {
    console.error('An error occurred while seeding the database:', err);
});