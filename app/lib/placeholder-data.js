// placeholder-data.js
export const storeData = (inputData, category) => {
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
};

export const movies = [
    { 
        title: 'Inception', 
        info1: '03/20/2022', 
        info2: 'Watched with: Abdel', 
        info3: 'Review: 10/10'
    },
    { 
        title: 'Children of Men', 
        info1: '06/09/2024', 
        info2: 'Watched with: Alone', 
        info3: 'Review: 9/10' 
    },
];

export const books = [
    { 
        title: 'Book X', 
        info1: '2022-03-10', 
        info2: 'Read on: Physical book', 
        info3: 'Written by: Author X' 
    },
    { 
        title: 'Book Y', 
        info1: '2022-03-25', 
        info2: 'Read on: E-book', 
        info3: 'Written by: Author Y' 
    },
];

export const flights = [
    { 
        title: 'Flight A', 
        info1: 'Departure: 03/20/2022', 
        info2: 'Arrival: 03/21/2022', 
        info3: 'Airline: XYZ Airlines' 
    },
    { 
        title: 'Flight B', 
        info1: 'Departure: 06/09/2024', 
        info2: 'Arrival: 06/10/2024', 
        info3: 'Airline: ABC Airlines' 
    },
];

export const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Wassim',
        email: 'benstikey@gmail.com',
        password: '123456',
    },
];