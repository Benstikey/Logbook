import React, { useState } from 'react';

interface NavbarMenuProps {
    onCategoryChange: (category: string) => void;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    return (
        <div className="flex items-center p-1 border border-solid border-slate-200 rounded-md shadow">
            <label className="flex items-center">
                <input
                    type="radio"
                    value="All Categories"
                    checked={selectedCategory === 'All Categories'}
                    onChange={() => handleCategoryChange('All Categories')}
                    className="appearance-none border-none outline-none focus:outline-none"
                />
                <span className={`font-medium rounded px-3 py-2 cursor-pointer ${selectedCategory === 'All Categories' ? 'bg-gray-100' : ''}`}>
                    All Categories
                </span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    value="Movies"
                    checked={selectedCategory === 'Movies'}
                    onChange={() => handleCategoryChange('Movies')}
                    className="appearance-none border-none outline-none focus:outline-none"
                />
                <span className={`font-medium rounded px-3 py-2 cursor-pointer ${selectedCategory === 'Movies' ? 'bg-gray-100' : ''}`}>
                    Movies
                </span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    value="Series"
                    checked={selectedCategory === 'Series'}
                    onChange={() => handleCategoryChange('Series')}
                    className="appearance-none border-none outline-none focus:outline-none"
                />
                <span className={`font-medium rounded px-3 py-2 cursor-pointer ${selectedCategory === 'Series' ? 'bg-gray-100' : ''}`}>
                    Series
                </span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    value="Books"
                    checked={selectedCategory === 'Books'}
                    onChange={() => handleCategoryChange('Books')}
                    className="appearance-none border-none outline-none focus:outline-none"
                />
                <span className={`font-medium rounded px-3 py-2 cursor-pointer ${selectedCategory === 'Books' ? 'bg-gray-100' : ''}`}>
                    Books
                </span>
            </label>
            {/* Add more category options as needed */}
        </div>
    );
};

export default NavbarMenu;