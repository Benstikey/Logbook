'use client'

import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useUser } from '@clerk/clerk-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@clerk/nextjs';

interface ActivityCardProps {
    onClose: () => void;  // Prop to handle closing the card
}

const ActivityLogCard: React.FC<ActivityCardProps> = ({ onClose }) => {

    const { userId } = useAuth();
    const [category, setCategory] = useState('');
    const [activity, setActivity] = useState('');
    const [info2, setInfo2] = useState('');
    const [info3, setInfo3] = useState('');
    const [info4, setInfo4] = useState('');
    const [labels, setLabels] = useState({
        activity: '',
        labelInfo1: '',
        labelInfo2: '',
        labelInfo3: '',
        labelInfo4: '',
    });

    // Handle date picker
    const [date, setDate] = useState<Date | undefined>(undefined);

    const getLabelsByCategory = (category: string) => {
        switch (category) {
            case 'Movies':
                return {
                    activity: 'Title',
                    labelInfo1: 'Date watched on',
                    labelInfo2: 'Watched with',
                    labelInfo3: 'Review',
                    labelInfo4: 'Directed by',
                };
            case 'Books':
                return {
                    activity: 'Title',
                    labelInfo1: 'Date read on',
                    labelInfo2: 'Written by',
                    labelInfo3: 'Review',
                    labelInfo4: 'Genre',
                };
            case 'Flights':
                return {
                    activity: 'Country of arrival',
                    labelInfo1: 'Arrival date',
                    labelInfo2: 'Distance',
                    labelInfo3: 'Airline',
                    labelInfo4: 'Days Traveling',
                };
            case 'Concerts':
                return {
                    activity: 'Concert Name',
                    labelInfo1: 'Date of Concert',
                    labelInfo2: 'Venue',
                    labelInfo3: 'Artists',
                    labelInfo4: 'Review',
                };
            default:
                return {
                    activity: 'Activity',
                    labelInfo1: 'Information 1',
                    labelInfo2: 'Information 2',
                    labelInfo3: 'Information 3',
                    labelInfo4: 'Information 4',
                };
        }
    };

    // Update labels whenever the category changes
    useEffect(() => {
        setLabels(getLabelsByCategory(category));
    }, [category]);

    const handleSubmit = async () => {
        if (!date) {
            toast.error('Please select a date');
            return;
        }

        const formattedDate = format(date, 'yyyy-MM-dd');

        const activityData = {
            userId,
            category,
            activity,
            date: formattedDate,
            info2,
            info3,
            info4
        };

        console.log('Submitting activity data:', activityData);
    
        try {
            const response = await fetch('/api/storeActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            console.log('Response status:', response.status);
            console.log('Response data:', await response.json());
    
            if (response.ok) {
                const data = await response.json();
                console.log('Success data:', data);  // Handle response accordingly
                toast.success('Activity submitted successfully!');
                onClose();  // Close the card after successful submission
            } else {
                const errorText = await response.text();
                console.error('Failed to submit activity:', errorText);
                toast.error('Failed to submit activity');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while submitting the activity');
        }
    };

    return (
        <div className="activity-card flex flex-col gap-4 justify-start">
            <ToastContainer />
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Log an Activity</h2>
            
            <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select a category</SelectLabel>
                            <SelectItem value="Movies">Movies</SelectItem>
                            <SelectItem value="Books">Books</SelectItem>
                            <SelectItem value="Flights">Flights</SelectItem>
                            <SelectItem value="Concerts">Concerts</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {category && ( // Only render if a category is selected
                <>
                    <div className="flex flex-col gap-2">
                        <Label>{labels.activity}</Label>
                        <Input placeholder={labels.activity} onChange={e => setActivity(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>{labels.labelInfo1}</Label>
                        <Input placeholder={labels.labelInfo1} onChange={e => setInfo2(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>{labels.labelInfo2}</Label>
                        <Input placeholder={labels.labelInfo2} onChange={e => setInfo3(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>{labels.labelInfo3}</Label>
                        <Input placeholder={labels.labelInfo3} onChange={e => setInfo4(e.target.value)} />
                    </div>
                </>
            )}

            <div className="flex flex-row justify-between">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default ActivityLogCard;