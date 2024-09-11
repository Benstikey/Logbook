'use client'

import React, { useState } from 'react';
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

    // Handle date picker
    const [date, setDate] = useState<Date | undefined>(undefined);

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
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel >Select a category</SelectLabel>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="movies">Movies</SelectItem>
                        <SelectItem value="series">Series</SelectItem>
                        <SelectItem value="flights">Flights</SelectItem>
                        <SelectItem value="concerts">Concerts</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Activity</Label>
                <Input placeholder="Your activity" onChange={e => setActivity(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 1 - Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 2</Label>
                <Input placeholder="Information 2" onChange={e => setInfo2(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 3</Label>
                <Input placeholder="Information 3" onChange={e => setInfo3(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 4</Label>
                <Input placeholder="Information 4" onChange={e => setInfo4(e.target.value)} />
            </div>

            <div className="flex flex-row justify-between">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default ActivityLogCard;