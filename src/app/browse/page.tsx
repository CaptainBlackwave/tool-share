'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, users, categories } from '@/lib/data';
import { ToolCard } from '@/components/ui/ToolCard';

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [distance, setDistance] = useState(25);
  const [sortBy, setSortBy] = useState('relevance');

  const getOwner = (ownerId: string) => users.find(u => u.id === ownerId)!;

  const filteredTools = tools.filter(tool => {
    if (selectedCategory && tool.category !== selectedCategory) return false;
    if (tool.pricePerDay < priceRange[0] || tool.pricePerDay > priceRange[1]) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-8">
        <div className="container-main">
          <h1 className="text-3xl text-white mb-6" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Browse Tools
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search for tools..." 
                className="w-full pl-10 pr-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
              />
            </div>
            <input 
              type="text" 
              placeholder="Location" 
              className="md:w-64 px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
            />
            <input 
              type="date" 
              className="md:w-40 px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
            />
            <Link href="/browse" className="btn btn-primary py-3 px-6">
              Search
            </Link>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 sticky top-24">
              <h3 className="font-medium text-lg mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>FILTERS</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6b6b6b] mb-2">
                  Price: ${priceRange[0]} - ${priceRange[1]}/day
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#e85d04]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6b6b6b] mb-2">
                  Distance: {distance} miles
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full accent-[#e85d04]"
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#e85d04]" />
                  <span className="text-sm">Instant Book Only</span>
                </label>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([0, 200]);
                  setDistance(25);
                }}
                className="w-full btn btn-outline text-sm"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#6b6b6b]">
                <strong className="text-[#222]">{filteredTools.length}</strong> tools found
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Distance: Nearest</option>
                <option value="rating">Rating: Highest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} owner={getOwner(tool.ownerId)} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#f0ede8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#222] mb-2">No tools found</h3>
                <p className="text-[#6b6b6b]">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
