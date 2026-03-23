'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllUsers, suspendUser, verifyUserIdentity } from '@/actions/admin';

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: string;
  rating: string;
  reviewCount: number;
  stripeAccountStatus: string | null;
  identityVerified: boolean;
  createdAt: string;
}

function UsersContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers(page, search);
      setUsers(result.users as User[]);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchInput);
    url.searchParams.set('page', '1');
    window.location.href = url.toString();
  };

  const handleSuspend = async (userId: string, currentStatus: boolean) => {
    if (!confirm(currentStatus ? 'Unsuspend this user?' : 'Suspend this user?')) return;
    
    try {
      await suspendUser(userId, !currentStatus);
      loadUsers();
    } catch (error) {
      alert('Failed to update user status');
    }
  };

  const handleVerify = async (userId: string, verified: boolean) => {
    try {
      await verifyUserIdentity(userId, !verified);
      loadUsers();
    } catch (error) {
      alert('Failed to update verification status');
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            User Management
          </h1>
          <p className="text-[#6b6b6b]">{total} total users</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-[#d4d0c8] rounded-lg focus:outline-none focus:border-[#e85d04]"
        />
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
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">User</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Role</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Stripe</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Verified</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Rating</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Joined</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-[#f0ede8]">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f0ede8] flex items-center justify-center">
                          {user.avatar ? (
                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <span className="text-[#6b6b6b]">{user.name?.[0] || '?'}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#222]">{user.name || 'Unknown'}</p>
                          <p className="text-xs text-[#6b6b6b]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'admin' ? 'bg-[#e85d04] text-white' : 'bg-[#f0ede8] text-[#6b6b6b]'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.stripeAccountStatus === 'active' ? 'bg-[#2d6a4f]/20 text-[#2d6a4f]' : 'bg-[#f0ede8] text-[#6b6b6b]'
                      }`}>
                        {user.stripeAccountStatus || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleVerify(user.id, user.identityVerified)}
                        className={`px-2 py-1 rounded text-xs ${
                          user.identityVerified ? 'bg-[#2d6a4f] text-white' : 'bg-[#f0ede8] text-[#6b6b6b]'
                        }`}
                      >
                        {user.identityVerified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-[#ffbe0b]">★</span>
                        <span>{parseFloat(user.rating || '0').toFixed(1)}</span>
                        <span className="text-[#6b6b6b] text-xs">({user.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#6b6b6b]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleSuspend(user.id, false)}
                        className="text-xs text-[#d00000] hover:underline"
                      >
                        Suspend
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
              href={`/admin/users?page=${p}&search=${search}`}
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

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <UsersContent />
    </Suspense>
  );
}