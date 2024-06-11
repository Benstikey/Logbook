// placeholder-data.js

// Adjust the export statements to use module.exports instead of export

function storeData(inputData, category) {
    const newData = {
        title: inputData.title,
        info1: inputData.info1,
        info2: inputData.info2,
        info3: inputData.info3,
    };

    // Update the respective category array based on the selected category
    switch (category) {
        case 'Movies':
            movies.push(newData);
            console.log('Updated Movies Data:', movies);
            break;
        case 'Books':
            books.push(newData);
            console.log('Updated Books Data:', books);
            break;
        case 'Flights':
            flights.push(newData);
            console.log('Updated Flights Data:', flights);
            break;
        // Add cases for other categories as needed
        default:
            // Handle default or other categories
            break;
    }
}

const movies = [
    { 
        id: '410544b2-4001-4271-9855',
        title: 'Inception', 
        date_watched: '03/20/2022', 
        watched_with: 'Watched with: Abdel', 
        review: 'Review: 10/10'
    },
    {
        id: '410544b2-4001-4271-9823',
        title: 'Children of Men', 
        date_watched: '06/09/2024', 
        watched_with: 'Watched with: Alone', 
        review: 'Review: 9/10' 
    },
];

const books = [
    { 
        id: '410544b2-4001-4271-9523',
        title: 'Book X', 
        info1: '2022-03-10', 
        info2: 'Read on: Physical book', 
        info3: 'Written by: Author X' 
    },
    { 
        id: '410544b2-4001-4271-9533',
        title: 'Book Y', 
        info1: '2022-03-25', 
        info2: 'Read on: E-book', 
        info3: 'Written by: Author Y' 
    },
];

const flights = [
    { 
        id: '410544b2-4001-4271-3123',
        title: 'CMN → DXB', 
        info1: 'Flight Number: SK 123', 
        info2: 'Arrival: 03/21/2022', 
        info3: 'Distance: 849 kms' 
    },
    { 
        id: '410544b2-4001-4271-2323',
        title: 'CMN → DXB', 
        info1: 'Flight Number: SK 123', 
        info2: 'Arrival: 04/25/2024', 
        info3: 'Distance: 948 kms' 
    },
];

const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Wassim',
        email: 'benstikey@gmail.com',
        password: '123456',
    },
];

// Export the variables if needed
module.exports = {
    storeData,
    movies,
    books,
    flights,
    users,
};