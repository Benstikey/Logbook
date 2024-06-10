// Additional functions for data manipulation can be added if needed
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
        // Add cases for other categories as needed
        default:
            // Handle default or other categories
            break;
    }
    // Log the updated movies array for verification
    console.log('Updated Movies Data:', movies);
};

export const movies = [
    { 
        title: 'Inception', 
        info1: '03/20/2022', 
        info2: 'Watched with: Abdel', 
        info3: 'Review: 10/10'
    },
    { 
        title: 'Chilren of Men', 
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