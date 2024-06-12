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
   

const ActivityCard: React.FC = () => {

    // Handle date picker
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="activity-card flex flex-col gap-4 justify-start">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Log an Activity</h2>
            <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select>
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
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Activity</Label>
                <Input placeholder="Your activity"/>
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
                <Input placeholder="Information 2"/>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 3</Label>
                <Input placeholder="Information 3"/>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Information 4</Label>
                <Input placeholder="Information 4"/>
            </div>

            <div className="flex flex-row justify-between">
                <Button variant="outline">Close</Button>
                <Button>Submit</Button>
            </div>
        </div>
    );
};

export default ActivityCard;