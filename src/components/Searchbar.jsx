import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Categories for filtering
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Finance'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // This would be replaced with your actual API call
    setTimeout(() => {
      // Simulate search results - replace with actual API integration
      const mockResults = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'Remote', type: 'Full-time', category: 'Technology' },
        { id: 2, title: 'UX/UI Designer', company: 'CreativeWorks', location: 'San Francisco, CA', type: 'Contract', category: 'Design' },
        { id: 3, title: 'Marketing Specialist', company: 'GrowthHackers', location: 'Chicago, IL', type: 'Full-time', category: 'Marketing' }
      ];
      
      setSearchResults(mockResults);
      setIsLoading(false);
      setIsExpanded(true);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsExpanded(false);
  };

  return (
    <div className="fixed top-35 left-0 right-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={clearSearch}
                >
                  <span className="text-gray-400 hover:text-gray-500">✕</span>
                </button>
              )}
            </div>
            
            <div className="ml-2">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
          
          {isExpanded && searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-2 px-4 text-xs font-semibold text-gray-500 border-b">
                {searchResults.length} results found
              </div>
              <ul className="max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <li key={result.id} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-blue-600">{result.title}</h4>
                    <div className="text-sm text-gray-600">{result.company}</div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{result.location}</span>
                      <span className="mx-2">•</span>
                      <span>{result.type}</span>
                      <span className="mx-2">•</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{result.category}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10 p-4 text-center">
              <div className="animate-pulse">Searching...</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Searchbar;