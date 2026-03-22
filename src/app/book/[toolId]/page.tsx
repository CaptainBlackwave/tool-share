'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { tools, users } from '@/lib/data';

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;
  
  const tool = tools.find(t => t.id === toolId);
  const owner = users.find(u => u.id === tool?.ownerId);

  const [step, setStep] = useState(1);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [pickupMethod, setPickupMethod] = useState<'meetup' | 'delivery'>('meetup');

  if (!tool || !owner) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <p>Tool not found</p>
      </div>
    );
  }

  const calculatePrice = () => {
    if (!dates.start || !dates.end) return null;
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const subtotal = days * tool.pricePerDay;
    const platformFee = subtotal * 0.05;
    const total = subtotal + platformFee;
    return { days, subtotal, platformFee, total };
  };

  const price = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      alert('Booking request submitted! (Demo)');
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-8">
        <div className="container-main">
          <h1 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Book {tool.title}
          </h1>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= s ? 'bg-[#e85d04] text-white' : 'bg-[#f0ede8] text-[#6b6b6b]'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div className={`w-12 md:w-20 h-1 ${step > s ? 'bg-[#e85d04]' : 'bg-[#d4d0c8]'}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h2 className="text-lg font-medium mb-4">Select Dates</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Start Date</label>
                        <input 
                          type="date" 
                          value={dates.start}
                          onChange={(e) => setDates({...dates, start: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-2">End Date</label>
                        <input 
                          type="date" 
                          value={dates.end}
                          onChange={(e) => setDates({...dates, end: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                          required
                        />
                      </div>
                    </div>
                    {price && (
                      <div className="bg-[#f0ede8] rounded-lg p-4">
                        <p className="text-sm text-[#6b6b6b] mb-1">{price.days} day{price.days > 1 ? 's' : ''} × ${tool.pricePerDay}/day</p>
                        <p className="font-medium">Subtotal: ${price.subtotal}</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-lg font-medium mb-4">Pickup Details</h2>
                    
                    <div className="space-y-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setPickupMethod('meetup')}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                          pickupMethod === 'meetup'
                            ? 'border-[#e85d04] bg-[#e85d04]/5'
                            : 'border-[#d4d0c8]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            pickupMethod === 'meetup' ? 'border-[#e85d04]' : 'border-[#d4d0c8]'
                          }`}>
                            {pickupMethod === 'meetup' && <div className="w-3 h-3 bg-[#e85d04] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-medium">Safe Meetup Spot</p>
                            <p className="text-sm text-[#6b6b6b]">Meet at a public location</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPickupMethod('delivery')}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                          pickupMethod === 'delivery'
                            ? 'border-[#e85d04] bg-[#e85d04]/5'
                            : 'border-[#d4d0c8]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            pickupMethod === 'delivery' ? 'border-[#e85d04]' : 'border-[#d4d0c8]'
                          }`}>
                            {pickupMethod === 'delivery' && <div className="w-3 h-3 bg-[#e85d04] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-medium">Pickup at Owner&apos;s Address</p>
                            <p className="text-sm text-[#6b6b6b]">Get it from their location</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    {pickupMethod === 'meetup' && (
                      <div className="bg-[#f0ede8] rounded-lg p-4">
                        <p className="text-sm font-medium mb-2">Suggested Safe Spots:</p>
                        <ul className="text-sm text-[#6b6b6b] space-y-1">
                          <li>• Local Police Station Parking Lot</li>
                          <li>• Busy Public Park</li>
                          <li>• Grocery Store Parking Lot</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-lg font-medium mb-4">Payment</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Expiry</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-2">CVC</label>
                        <input 
                          type="text" 
                          placeholder="123"
                          className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                        />
                      </div>
                    </div>

                    <div className="bg-[#f0ede8] rounded-lg p-4 mb-4">
                      <p className="text-sm text-[#6b6b6b] mb-2">
                        <strong>Security Deposit:</strong> ${tool.replacementValue}
                      </p>
                      <p className="text-xs text-[#6b6b6b]">
                        This is a pre-authorization hold, not a charge. Your card will only be charged if there are damages.
                      </p>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-lg font-medium mb-4">Confirm Booking</h2>
                    
                    <div className="bg-[#f0ede8] rounded-lg p-4 mb-4">
                      <h3 className="font-medium mb-3">Booking Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">Tool</span>
                          <span>{tool.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">Dates</span>
                          <span>{dates.start} to {dates.end}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">Pickup</span>
                          <span className="capitalize">{pickupMethod === 'meetup' ? 'Safe Meetup Spot' : "Owner's Address"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">Owner</span>
                          <span>{owner.name}</span>
                        </div>
                      </div>
                    </div>

                    {price && (
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">{price.days} days × ${tool.pricePerDay}</span>
                          <span>${price.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6b6b6b]">Platform fee (5%)</span>
                          <span>${price.platformFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium text-base pt-2 border-t border-[#d4d0c8]">
                          <span>Total</span>
                          <span className="price text-[#e85d04]">${price.total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="w-5 h-5 mt-0.5 accent-[#e85d04]" />
                      <span className="text-sm text-[#6b6b6b]">
                        I agree to the <a href="#" className="text-[#e85d04] underline">Terms of Service</a> and understand the rental agreement.
                      </span>
                    </label>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={() => setStep(step - 1)}
                      className="btn btn-outline py-3 px-6"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    type="submit" 
                    className="btn btn-primary py-3 px-6 flex-1"
                  >
                    {step === 4 ? 'Confirm Booking' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 sticky top-24">
              <img 
                src={tool.images[0]} 
                alt={tool.title}
                className="w-full aspect-video object-cover rounded-md mb-4"
              />
              <h3 className="font-medium mb-2">{tool.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={owner.avatar} 
                  alt={owner.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm">{owner.name}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <svg className="w-4 h-4 text-[#ffbe0b] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-sm">{owner.rating}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="price text-2xl text-[#e85d04]">${tool.pricePerDay}</span>
                <span className="text-[#6b6b6b]">/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
