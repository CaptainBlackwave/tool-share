'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#d4d0c8]">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-[#e85d04]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
            </svg>
            <span className="text-2xl tracking-wide text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              TOOLSHARE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-[#222] hover:text-[#e85d04] transition-colors font-medium">
              Browse Tools
            </Link>
            <Link href="/list" className="text-[#222] hover:text-[#e85d04] transition-colors font-medium">
              List a Tool
            </Link>
            <Link href="#" className="text-[#222] hover:text-[#e85d04] transition-colors font-medium">
              How It Works
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-[#f0ede8] rounded-full transition-colors">
              <svg className="w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:bg-[#f0ede8] px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#e85d04] rounded-full flex items-center justify-center text-white font-medium">
                    M
                  </div>
                  <svg className="w-4 h-4 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-[#d4d0c8] rounded-lg shadow-lg py-2">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-[#f0ede8] text-[#222]">
                      Dashboard
                    </Link>
                    <Link href="/messages" className="block px-4 py-2 hover:bg-[#f0ede8] text-[#222]">
                      Messages
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-[#f0ede8] text-[#d00000]"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin" className="text-[#222] hover:text-[#e85d04] font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-[#d4d0c8]">
            <nav className="flex flex-col gap-4">
              <Link href="/browse" className="text-[#222] font-medium py-2">
                Browse Tools
              </Link>
              <Link href="/list" className="text-[#222] font-medium py-2">
                List a Tool
              </Link>
              <Link href="#" className="text-[#222] font-medium py-2">
                How It Works
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-[#222] font-medium py-2">
                    Dashboard
                  </Link>
                  <Link href="/messages" className="text-[#222] font-medium py-2">
                    Messages
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="text-left text-[#d00000] font-medium py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/auth/signin" className="btn btn-outline">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn btn-primary">
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
