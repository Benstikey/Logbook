"use client"

import React, { useState, useEffect } from 'react';
import NavbarMenu from '@/app/ui/navbar-menu';
import CategoryCard from '@/app/ui/category-card';
import ActivityLogCard from '@/app/ui/activity-log-card';
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from '@clerk/nextjs'

interface Activity {
    category: string;
    title: string;  // Add this line
    info1: string;  // Add this line
    info2: string;  // Add this line
    info3: string;  // Add this line
    // Add other properties of Activity if needed
}

interface Content {
    title: string;
    info1: string;
    info2: string;
    info3: string;
}

const MyLogbookPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [showActivityLog, setShowActivityLog] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchActivities = async () => {
            if (!user) return; // Add null check for user
            try {
                const response = await fetch(`/api/getActivity?userId=${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data.data);
                } else {
                    console.error('Failed to fetch activities');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchActivities();
    }, [user]);

    const toggleActivityLog = () => {
        setShowActivityLog(!showActivityLog);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleClose = () => {
        setShowActivityLog(false);        // This hides the overlay and should remove the ActivityLogCard from the DOM
    };

    const filterActivitiesByCategory = (category: string) => {
        return activities.filter(activity => activity.category === category);
    };

    function mapActivitiesToContent(activities: Activity[]): Content[] {
        return activities.map(activity => ({
            title: activity.title,
            info1: activity.info1,
            info2: activity.info2,
            info3: activity.info3
        }));
    };

    return (
        <div className="h-screen w-screen p-4 flex flex-col gap-4">
            {/* Pass the onCategoryChange prop to the NavbarMenu component */}
            <div className="flex flex-row justify-between items-center">
                <NavbarMenu onCategoryChange={handleCategoryChange} />

                {/* Log an Activity Button & User Button */}
                <div className="flex flex-row justify-between items-center gap-4">
                    <Button onClick={toggleActivityLog} className="h-full">Log an activity</Button>
                    <UserButton/>
                </div>
                {/* Activity Log Card Overlay */}
                {showActivityLog && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 backdrop-filter">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md border border-solid border-slate-200 rounded-lg shadow p-4">
                            <ActivityLogCard onClose={handleClose}/>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-full flex flex-row gap-4">
                {/* Conditional Rendering of CategoryCards */}
                {selectedCategory === 'All Categories' && (
                    <>
                        <CategoryCard title="Movies" subtitle="Movies I watched" contentList={mapActivitiesToContent(filterActivitiesByCategory('movies'))} />
                        <CategoryCard title="Books" subtitle="Books I read" contentList={mapActivitiesToContent(filterActivitiesByCategory('books'))} />
                        <CategoryCard title="Flights" subtitle="Flights I took" contentList={mapActivitiesToContent(filterActivitiesByCategory('flights'))} />
                    </>
                )}
                {selectedCategory === 'Movies' && <CategoryCard title="Movies" subtitle="Movies I watched" contentList={mapActivitiesToContent(filterActivitiesByCategory('movies'))} />}
                {selectedCategory === 'Books' && <CategoryCard title="Books" subtitle="Books I read" contentList={mapActivitiesToContent(filterActivitiesByCategory('books'))} />}
                {selectedCategory === 'Flights' && <CategoryCard title="Flights" subtitle="Flights I took" contentList={mapActivitiesToContent(filterActivitiesByCategory('flights'))} />}
                {/* Conditionally render other CategoryCards based on selectedCategory */}
            </div>
        </div>
    );
};

export default MyLogbookPage;