'use client'

import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator"

interface Content {
    title: string;
    date: string; // Change info1 to date
    info2: string;
    info3: string;
}

interface CategoryCardProps {
    title: string;
    subtitle: string;
    contentList: Content[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, contentList }) => {
    const [expandedContent, setExpandedContent] = useState<Content | null>(null);

    // Function to format date from yyyy-mm-dd to dd-mm-yyyy
    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Function to generate default labels based on category type
    const getDefaultLabels = (category: string) => {
        let labelinfo1 = 'Date';
        let labelinfo2 = 'Watched with';
        let labelinfo3 = 'Review';

        if (category === 'Books') {
            labelinfo1 = 'Date';
            labelinfo2 = 'Read on';
            labelinfo3 = 'Written by';
        } else if (category === 'Flights') {
            labelinfo1 = 'Flight number';
            labelinfo2 = 'Arrival date';
            labelinfo3 = 'Distance';
        }
        return { labelinfo1, labelinfo2, labelinfo3 };
    };

    const handleContentClick = (content: Content) => {
        setExpandedContent(content === expandedContent ? null : content);
    };

    return (
        <div className="w-full max-w-sm h-full border border-solid border-slate-200 rounded-md shadow p-4">
            <div className="flex flex-col gap-1 pb-3">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h2>
                <p className="text-sm text-muted-foreground pb-3">{subtitle}</p>
                <Separator />
            </div>
            {contentList.map((content, index) => (
                <div key={index} onClick={() => handleContentClick(content)} className="cursor-pointer p-1 my-1 rounded">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <h3 className="scroll-m-20 text font-semibold tracking-tight">{content.title}</h3>
                        <Separator className="flex-1"/>
                        <p className="text-sm text-muted-foreground">{formatDate(content.date)}</p> {/* Display formatted date */}
                    </div>
                    {expandedContent === content && (
                        <div className="flex flex-col mt-2 gap-1">
                            <div className="flex flex-row g-4 justify-between pl-4">
                                <p className="text-sm">{getDefaultLabels(title).labelinfo2}</p>
                                <p className="text-sm text-muted-foreground">{content.info2}</p>
                            </div>
                            <div className="flex flex-row g-4 justify-between pl-4">
                                <p className="text-sm">{getDefaultLabels(title).labelinfo3}</p>                                
                                <p className="text-sm text-muted-foreground">{content.info3}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryCard;