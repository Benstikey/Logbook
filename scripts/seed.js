const { db } = require('@vercel/postgres');
const { users, movies, books, flights } = require('@/lib/placeholder-data.js');
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

// Call the seedUsers function to start seeding the users data
seedUsers().catch((err) => {
    console.error('An error occurred while seeding the database:', err);
});

async function seedMovies() {
    try {
        await db.connect();

        // Create "movies" table if it doesn't exist
        await db.sql`
            CREATE TABLE IF NOT EXISTS movies (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                release_date DATE,
                director VARCHAR(255),
                genre VARCHAR(255)
            );
        `;

        console.log(`Created "movies" table`);

        // Insert data into the "movies" table
        const insertedMovies = await Promise.all(
            movies.map(async (movie) => {
                return db.sql`
                    INSERT INTO movies (id, title, release_date, director, genre)
                    VALUES (${movie.id}, ${movie.title}, ${movie.release_date}, ${movie.director}, ${movie.genre})
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
                author VARCHAR(255),
                publication_date DATE,
                genre VARCHAR(255)
            );
        `;

        console.log(`Created "books" table`);

        // Insert data into the "books" table
        const insertedBooks = await Promise.all(
            books.map(async (book) => {
                return db.sql`
                    INSERT INTO books (id, title, author, publication_date, genre)
                    VALUES (${book.id}, ${book.title}, ${book.author}, ${book.publication_date}, ${book.genre})
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
                flight_number VARCHAR(10) NOT NULL,
                departure_city VARCHAR(255),
                arrival_city VARCHAR(255),
                departure_date DATE,
                arrival_date DATE,
                airline VARCHAR(255)
            );
        `;

        console.log(`Created "flights" table`);

        // Insert data into the "flights" table
        const insertedFlights = await Promise.all(
            flights.map(async (flight) => {
                return db.sql`
                    INSERT INTO flights (id, flight_number, departure_city, arrival_city, departure_date, arrival_date, airline)
                    VALUES (${flight.id}, ${flight.flight_number}, ${flight.departure_city}, ${flight.arrival_city}, ${flight.departure_date}, ${flight.arrival_date}, ${flight.airline})
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