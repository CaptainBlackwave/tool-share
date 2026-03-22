import Link from 'next/link';
import { tools, users, categories } from '@/lib/data';
import { ToolCard } from '@/components/ui/ToolCard';

export default function Home() {
  const featuredTools = tools.slice(0, 4);
  
  const getOwner = (ownerId: string) => users.find(u => u.id === ownerId)!;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#faf9f7]">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#1a1a1a" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect fill="url(#diagonal-stripes)" width="100%" height="100%"/>
          </svg>
        </div>
        
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#e85d04] rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-[#ffbe0b] rounded-full opacity-20 animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#2d6a4f] rounded-full opacity-10 animate-pulse delay-500" />

        <div className="container-main relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-7xl text-[#1a1a1a] mb-6"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            >
              Rent Tools From Your Neighbors
            </h1>
            <p className="text-xl text-[#6b6b6b] mb-10 max-w-2xl mx-auto">
              Save money. Complete your project. Join thousands of tool-sharers in your community.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-[#d4d0c8] max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Enter your location" 
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                  />
                </div>
                <select className="px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] bg-white">
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <Link href="/browse" className="btn btn-primary py-3 px-6">
                  Find Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 
            className="text-4xl text-center text-[#1a1a1a] mb-12"
            style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
          >
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id} 
                href={`/browse?category=${category.id}`}
                className="card p-6 text-center group"
              >
                <span className="text-4xl block mb-3">{category.icon}</span>
                <h3 className="font-medium text-[#222] group-hover:text-[#e85d04] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-[#6b6b6b]">{category.count} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f0ede8]">
        <div className="container-main">
          <h2 
            className="text-4xl text-center text-[#1a1a1a] mb-4"
            style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
          >
            How It Works
          </h2>
          <p className="text-center text-[#6b6b6b] mb-12">Rent a tool in three simple steps</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e85d04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>1. FIND</h3>
              <p className="text-[#6b6b6b]">
                Search for tools near you. Browse by category, price, and availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e85d04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>2. BOOK</h3>
              <p className="text-[#6b6b6b]">
                Request your dates and coordinate pickup with the owner.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e85d04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>3. COMPLETE</h3>
              <p className="text-[#6b6b6b]">
                Finish your project, return the tool, and leave a review.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <h2 
              className="text-3xl text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            >
              Featured Tools
            </h2>
            <Link href="/browse" className="text-[#e85d04] hover:underline font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} owner={getOwner(tool.ownerId)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1a1a] text-white">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#e85d04] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>10,000+</div>
              <div className="text-[#9ca3af]">Tools Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#e85d04] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>5,000+</div>
              <div className="text-[#9ca3af]">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#e85d04] mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>98%</div>
              <div className="text-[#9ca3af]">Satisfaction Rate</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-[#2d6a4f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">ID Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-[#2d6a4f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-[#2d6a4f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Insurance Covered</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#e85d04] to-[#ffbe0b]">
        <div className="container-main text-center">
          <h2 
            className="text-4xl text-white mb-4"
            style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
          >
            Got Tools Collecting Dust?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Turn your idle tools into income. Join thousands of neighbors earning money on ToolShare.
          </p>
          <Link href="/list" className="btn bg-white text-[#e85d04] hover:bg-[#f0ede8] py-3 px-8 text-lg">
            Start Earning
          </Link>
        </div>
      </section>
    </main>
  );
}
