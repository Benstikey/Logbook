// placeholder-data.js

const movies = [
    { 
        id: '410544b2-4001-4271-9855-fec4b6a6442b',
        title: 'Inception', 
        info1: '03-20-2022', 
        info2: 'Abdel', 
        info3: 'Review: 10/10',
    },
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442c',
        title: 'Children of Men', 
        info1: '06-09-2024', 
        info2: 'Alone', 
        info3: 'Review: 9/10' 
    },
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442c',
        title: 'Midsommar', 
        info1: '06-09-2024', 
        info2: 'Alone', 
        info3: '9/10' 
    },
];

const books = [
    { 
        id: '410544b2-4001-4271-9523',
        title: 'Book X', 
        info1: '2022-03-10', 
        info2: 'Physical book', 
        info3: 'Author X' 
    },
    { 
        id: '410544b2-4001-4271-9533',
        title: 'Book Y', 
        info1: '2022-03-25', 
        info2: 'E-book', 
        info3: 'Author Y' 
    },
];

const flights = [
    { 
        id: '410544b2-4001-4271-3123',
        title: 'CMN → DXB', 
        info1: 'SK 123', 
        info2: '03-21-2022', 
        info3: '849 kms' 
    },
    { 
        id: '410544b2-4001-4271-2323',
        title: 'CMN → DXB', 
        info1: 'SK 123', 
        info2: '04-25-2024', 
        info3: '948 kms' 
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
    movies,
    books,
    flights,
    users,
};