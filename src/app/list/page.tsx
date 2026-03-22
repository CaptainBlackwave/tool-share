'use client';

import { useState } from 'react';
import { categories } from '@/lib/data';

export default function ListToolPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    brand: '',
    pricePerDay: '',
    pricePerWeek: '',
    replacementValue: '',
    instantBook: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      alert('Listing created successfully! (Demo)');
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-12">
        <div className="container-main">
          <h1 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            List Your Tool
          </h1>
          <p className="text-white/60">Turn your idle tools into income</p>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= s ? 'bg-[#e85d04] text-white' : 'bg-[#f0ede8] text-[#6b6b6b]'
                  }`}
                >
                  {s}
                </div>
                {s < 5 && (
                  <div className={`w-16 md:w-24 h-1 ${step > s ? 'bg-[#e85d04]' : 'bg-[#d4d0c8]'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Basic Information</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Category *</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Title *</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., DeWalt 20V Cordless Drill"
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Description *</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      placeholder="Describe your tool, its condition, and what's included..."
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] resize-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Brand</label>
                    <input 
                      type="text" 
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      placeholder="e.g., DeWalt, Makita, Honda"
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Photos</h2>
                  <p className="text-[#6b6b6b] mb-4">Add at least 3 photos of your tool</p>
                  
                  <div className="border-2 border-dashed border-[#d4d0c8] rounded-lg p-8 text-center mb-4">
                    <svg className="w-12 h-12 text-[#6b6b6b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-[#6b6b6b]">Drag and drop photos here</p>
                    <p className="text-sm text-[#9ca3af]">or click to browse</p>
                  </div>
                  
                  <div className="text-sm text-[#6b6b6b]">
                    <p>Tips for great photos:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Show the tool from multiple angles</li>
                      <li>Include close-ups of any labels or features</li>
                      <li>Show the tool in good lighting</li>
                      <li>Include any accessories that come with it</li>
                    </ul>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Pricing</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Daily Rate *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b]">$</span>
                      <input 
                        type="number" 
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Weekly Rate (optional)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b]">$</span>
                      <input 
                        type="number" 
                        value={formData.pricePerWeek}
                        onChange={(e) => setFormData({...formData, pricePerWeek: e.target.value})}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                      />
                    </div>
                    <p className="text-xs text-[#6b6b6b] mt-1">Offer a discount for weekly rentals</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Replacement Value *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b]">$</span>
                      <input 
                        type="number" 
                        value={formData.replacementValue}
                        onChange={(e) => setFormData({...formData, replacementValue: e.target.value})}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                        required
                      />
                    </div>
                    <p className="text-xs text-[#6b6b6b] mt-1">Used for security deposit calculation</p>
                  </div>

                  <button type="button" className="text-sm text-[#e85d04] hover:underline">
                    Get Smart Price Suggestion →
                  </button>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Availability</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Block unavailable dates</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                    />
                    <p className="text-xs text-[#6b6b6b] mt-1">Select dates when the tool is not available</p>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-[#d4d0c8] rounded-md">
                      <input 
                        type="checkbox" 
                        checked={formData.instantBook}
                        onChange={(e) => setFormData({...formData, instantBook: e.target.checked})}
                        className="w-5 h-5 accent-[#e85d04]"
                      />
                      <div>
                        <span className="font-medium">Enable Instant Book</span>
                        <p className="text-sm text-[#6b6b6b]">Renters can book immediately without approval</p>
                      </div>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#6b6b6b] mb-2">Pickup Instructions</label>
                    <textarea 
                      rows={3}
                      placeholder="Any specific instructions for pickup..."
                      className="w-full px-4 py-3 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Review & Publish</h2>
                  
                  <div className="bg-[#f0ede8] rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">Listing Summary</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="text-[#6b6b6b]">Category:</span> {formData.category || '-'}</p>
                      <p><span className="text-[#6b6b6b]">Title:</span> {formData.title || '-'}</p>
                      <p><span className="text-[#6b6b6b]">Daily Rate:</span> ${formData.pricePerDay || '0'}/day</p>
                      <p><span className="text-[#6b6b6b]">Weekly Rate:</span> ${formData.pricePerWeek || '0'}/week</p>
                      <p><span className="text-[#6b6b6b]">Instant Book:</span> {formData.instantBook ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="w-5 h-5 mt-0.5 accent-[#e85d04]" />
                      <span className="text-sm">
                        I agree to the <a href="#" className="text-[#e85d04] underline">Terms of Service</a> and <a href="#" className="text-[#e85d04] underline">Listing Guidelines</a>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8">
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
                  {step === 5 ? 'Publish Listing' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
