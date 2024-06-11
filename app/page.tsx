"use client"

import React, { useState } from 'react';
import NavbarMenu from '@/app/ui/navbar-menu';
import CategoryCard from '@/app/ui/category-card';
import ActivityLogCard from '@/app/ui/activity-log-card';
import { movies, books } from '@/lib/placeholder-data.js';
import { Button } from "@/components/ui/button"

const MyLogbookPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [showActivityLog, setShowActivityLog] = useState(false);

    const toggleActivityLog = () => {
        setShowActivityLog(!showActivityLog);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className="h-screen w-screen p-4 flex flex-col gap-4">
            {/* Pass the onCategoryChange prop to the NavbarMenu component */}
            <div className="flex flex-row justify-between items-center">
                <NavbarMenu onCategoryChange={handleCategoryChange} />

                {/* Log an Activity Button */}
                <Button onClick={toggleActivityLog} className="h-full">Log an activity</Button>

                {/* Activity Log Card Overlay */}
                {showActivityLog && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 backdrop-filter">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                            <h2>Log an Activity</h2>
                            <ActivityLogCard />
                            <button onClick={toggleActivityLog}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-full flex flex-row gap-4">
                {/* Conditional Rendering of CategoryCards */}
                {selectedCategory === 'All Categories' && (
                    <>
                      {/* <CategoryCard title="Movies" subtitle="Movies I watched" contentList={movies} /> */}
                        <CategoryCard title="Books" subtitle="Books I read" contentList={books} />
                        {/* Add more CategoryCard components for other categories */}
                    </>
                )}
                {/*selectedCategory === 'Movies' && <CategoryCard title="Movies" subtitle="Movies I watched" contentList={movies} />*/}
                {selectedCategory === 'Books' && <CategoryCard title="Books" subtitle="Books I read" contentList={books} />}
                {/* Conditionally render other CategoryCards based on selectedCategory */}
            </div>
        </div>
    );
};

export default MyLogbookPage;