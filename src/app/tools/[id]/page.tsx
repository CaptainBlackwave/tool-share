import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { tools, users, reviews } from '@/lib/data';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  
  if (!tool) {
    return {
      title: 'Tool Not Found - ToolShare',
    };
  }

  return {
    title: `${tool.title} - ToolShare`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      images: tool.images[0] ? [tool.images[0]] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: tool.images[0] ? [tool.images[0]] : [],
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  
  if (!tool) {
    notFound();
  }

  const owner = users.find(u => u.id === tool.ownerId)!;
  const toolReviews = reviews.filter(r => r.toolId === tool.id);
  
  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-8">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#e85d04]">Home</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-[#e85d04]">Browse</Link>
          <span>/</span>
          <span className="text-[#222]">{tool.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden mb-6">
              <div className="aspect-video relative">
                <Image 
                  src={tool.images[0]} 
                  alt={tool.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  priority
                />
                {tool.instantBook && (
                  <span className="absolute top-4 left-4 badge bg-[#2d6a4f] text-white">
                    Instant Book
                  </span>
                )}
              </div>
              
              {tool.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {tool.images.map((img, idx) => (
                    <button 
                      key={idx}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${idx === 0 ? 'border-[#e85d04]' : 'border-transparent'}`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-medium text-[#222] mb-2">{tool.title}</h1>
                  <div className="flex items-center gap-2">
                    <span className="badge bg-[#f0ede8] text-[#6b6b6b] capitalize">
                      {tool.category.replace('-', ' ')}
                    </span>
                    <span className="badge bg-[#f0ede8] text-[#6b6b6b] capitalize">
                      {tool.condition.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-[#d4d0c8]">
                <Image 
                  src={owner.avatar} 
                  alt={owner.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[#222]">{owner.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#ffbe0b] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span>{owner.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[#6b6b6b]">({owner.reviewCount} reviews)</span>
                    <span className="text-[#6b6b6b]">·</span>
                    <span className="text-[#6b6b6b]">{owner.rentalsCompleted} rentals</span>
                    {owner.verified && (
                      <>
                        <span className="text-[#6b6b6b]">·</span>
                        <span className="text-[#2d6a4f]">✓ Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-4">
                <h3 className="font-medium text-[#222] mb-2">Description</h3>
                <p className="text-[#6b6b6b]">{tool.description}</p>
              </div>

              <div className="py-4 border-t border-[#d4d0c8]">
                <h3 className="font-medium text-[#222] mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b6b6b]">Brand</span>
                    <span className="text-[#222]">{tool.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6b6b]">Condition</span>
                    <span className="text-[#222] capitalize">{tool.condition.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6b6b]">Replacement Value</span>
                    <span className="text-[#222]">${tool.replacementValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6b6b]">Location</span>
                    <span className="text-[#222]">{tool.location.city}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
              <h3 className="font-medium text-[#222] mb-4">
                Reviews ({toolReviews.length})
              </h3>
              
              {toolReviews.length > 0 ? (
                <div className="space-y-4">
                  {toolReviews.map(review => {
                    const reviewer = getUser(review.reviewerId);
                    return (
                      <div key={review.id} className="border-b border-[#d4d0c8] pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Image 
                            src={reviewer?.avatar || ''} 
                            alt={reviewer?.name || ''}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#222]">{reviewer?.name}</p>
                            <p className="text-sm text-[#6b6b6b]">{review.createdAt}</p>
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-[#ffbe0b] fill-current' : 'text-[#d4d0c8]'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-[#6b6b6b]">{review.text}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[#6b6b6b]">No reviews yet.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6 sticky top-24">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="price text-3xl text-[#e85d04]">${tool.pricePerDay}</span>
                <span className="text-[#6b6b6b]">/day</span>
                {tool.pricePerWeek && (
                  <span className="text-sm text-[#6b6b6b] ml-auto">
                    ${tool.pricePerWeek}/week
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Select Dates</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="date" 
                    className="px-3 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] text-sm"
                  />
                  <input 
                    type="date" 
                    className="px-3 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] text-sm"
                  />
                </div>
              </div>

              <Link href={`/book/${tool.id}`} className="btn btn-primary w-full py-3 mb-3">
                Request to Book
              </Link>

              <button className="btn btn-outline w-full py-3 mb-4">
                Message Owner
              </button>

              <div className="text-sm text-[#6b6b6b] text-center">
                <p>You won&apos;t be charged yet</p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#d4d0c8]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6b6b6b]">Security Deposit</span>
                  <span>${tool.replacementValue}</span>
                </div>
                <p className="text-xs text-[#6b6b6b]">
                  The deposit is a pre-authorization hold, not a charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
