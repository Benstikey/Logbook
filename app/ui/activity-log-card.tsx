'use client'

import React, { useState } from 'react';
import { storeData } from '@/lib/placeholder-data.js'; // Import the storeData function
import { Calendar } from "@/components/ui/calendar"

const ActivityCard: React.FC = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [watchedOn, setWatchedOn] = useState('');
    const [watchedWith, setWatchedWith] = useState('');
    const [review, setReview] = useState('');

    // Handle category change function
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

// Handle form submission
const handleSubmit = () => {
    let info1Label, info2Label, info3Label;

    switch (category) {
        case 'Books':
            info1Label = 'Date Finished';
            info2Label = 'Read on';
            info3Label = 'Written by';
            break;
        case 'Movies':
            info1Label = 'Date Watched On';
            info2Label = 'Watched with';
            info3Label = 'Review';
            break;
        // Handle other categories as needed
        default:
            info1Label = 'Info 1 Label';
            info2Label = 'Info 2 Label';
            info3Label = 'Info 3 Label';
            break;
    }

    const inputData = {
        title,
        info1: `${info1Label}: ${watchedOn}`,
        info2: `${info2Label}: ${watchedWith}`,
        info3: `${info3Label}: ${review}`,
    };

    storeData(inputData, category);
};
    
    return (
        <div className="activity-card bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block pb-2">Category:
                <select className="rounded border" value={category} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    <option value="Books">Books</option>
                    <option value="Movies">Movies</option>
                    <option value="Movies">Series</option>
                    <option value="Movies">Flights</option>
                    {/* Add more category options as needed */}
                </select>
            </label>
            {category === 'Books' && (
                <>
                    <input type="text" className="rounded border w-full mb-2" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="date" className="rounded border w-full mb-2" placeholder="Date Finished" value={watchedOn} onChange={(e) => setWatchedOn(e.target.value)} />
                    <input type="text" className="rounded border w-full mb-2" placeholder="Read on" value={watchedWith} onChange={(e) => setWatchedWith(e.target.value)} />
                    <input type="text" className="rounded border w-full mb-2" placeholder="Written by" value={review} onChange={(e) => setReview(e.target.value)} />
                    <Calendar/>
                </>
            )}
            {category === 'Movies' && (
                <>
                    <input type="text" className="rounded border w-full mb-2" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="date" className="rounded border w-full mb-2" placeholder="Date Watched on" value={watchedOn} onChange={(e) => setWatchedOn(e.target.value)} />
                    <input type="text" className="rounded border w-full mb-2" placeholder="Watched with" value={watchedWith} onChange={(e) => setWatchedWith(e.target.value)} />
                    <input type="text" className="rounded border w-full mb-2" placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} />
                    <Calendar/>
                </>
            )}
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ActivityCard;