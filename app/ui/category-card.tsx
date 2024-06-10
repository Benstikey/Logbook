'use client'

import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator"

interface Content {
    title: string;
    info1: string;
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

    const handleContentClick = (content: Content) => {
        setExpandedContent(content === expandedContent ? null : content);
    };

    return (
        <div className="w-full max-w-sm h-full border border-solid border-slate-200 rounded-md shadow p-4">
            <div className="flex flex-col gap-1 pb-3">
                <h2 className="text-lg font-medium">{title}</h2>
                <p className="text-sm text-slate-400 pb-2">{subtitle}</p>
                <Separator />
            </div>
            {contentList.map((content, index) => (
                <div key={index} onClick={() => handleContentClick(content)} className="cursor-pointer p-1 my-1 rounded">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <h3 className="font-semibold">{content.title}</h3>
                        <Separator className="flex-1"/>
                        <p className="text-slate-500">{content.info1}</p>
                    </div>
                    {expandedContent === content && (
                        <div className="mt-2">
                            <p>{content.info2}</p>
                            <p>{content.info3}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryCard;