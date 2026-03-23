'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllTools, takedownTool } from '@/actions/admin';

interface Tool {
  id: string;
  title: string;
  category: string;
  pricePerDay: string;
  rating: string;
  reviewCount: number;
  city: string | null;
  createdAt: string;
  owner: { id: string; name: string; email: string };
}

function ToolsContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(search);
  const [categoryFilter, setCategoryFilter] = useState(category);

  const categories = ['power-tools', 'garden', 'cleaning', 'construction', 'automotive', 'painting'];

  useEffect(() => {
    loadTools();
  }, [page, search, category]);

  const loadTools = async () => {
    setLoading(true);
    try {
      const result = await getAllTools(page, search, categoryFilter, 'all');
      setTools(result.tools as Tool[]);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchInput);
    url.searchParams.set('category', categoryFilter);
    url.searchParams.set('page', '1');
    window.location.href = url.toString();
  };

  const handleTakedown = async (toolId: string, title: string) => {
    const reason = prompt(`Reason for takedown of "${title}":`);
    if (!reason) return;
    
    try {
      await takedownTool(toolId, reason);
      loadTools();
    } catch (error) {
      alert('Failed to takedown tool');
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Tools & Inventory
          </h1>
          <p className="text-[#6b6b6b]">{total} total tools</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by title or brand..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-[#d4d0c8] rounded-lg focus:outline-none focus:border-[#e85d04]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border-2 border-[#d4d0c8] rounded-lg bg-white focus:outline-none focus:border-[#e85d04]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6b6b6b]">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#faf9f7]">
                <tr>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Tool</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Category</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Owner</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Price/Day</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Rating</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Location</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Listed</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-t border-[#f0ede8]">
                    <td className="p-4">
                      <p className="font-medium text-[#222] max-w-xs truncate">{tool.title}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs bg-[#f0ede8] text-[#6b6b6b] capitalize">
                        {tool.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-[#222]">{tool.owner?.name || 'Unknown'}</p>
                      <p className="text-xs text-[#6b6b6b]">{tool.owner?.email}</p>
                    </td>
                    <td className="p-4 text-[#e85d04] font-medium">
                      ${parseFloat(tool.pricePerDay).toFixed(0)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-[#ffbe0b]">★</span>
                        <span>{parseFloat(tool.rating || '0').toFixed(1)}</span>
                        <span className="text-[#6b6b6b] text-xs">({tool.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#6b6b6b]">
                      {tool.city || 'N/A'}
                    </td>
                    <td className="p-4 text-[#6b6b6b]">
                      {new Date(tool.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTakedown(tool.id, tool.title)}
                        className="text-xs text-[#d00000] hover:underline"
                      >
                        Takedown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/tools?page=${p}&search=${search}&category=${category}`}
              className={`px-4 py-2 rounded ${
                p === page ? 'bg-[#e85d04] text-white' : 'bg-white border border-[#d4d0c8] text-[#6b6b6b]'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminToolsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ToolsContent />
    </Suspense>
  );
}