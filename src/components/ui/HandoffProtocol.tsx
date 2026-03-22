'use client';

import { useState, useRef } from 'react';
import { uploadFiles } from '@/lib/uploadthing/core';

interface HandoffProtocolProps {
  bookingId: string;
  type: 'pickup' | 'return';
  onComplete: (photos: string[]) => void;
}

export function HandoffProtocol({ bookingId, type, onComplete }: HandoffProtocolProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [consent, setConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const fileArray = Array.from(files);
      // In production, this would call the actual UploadThing endpoint
      // For now, we'll use a mock approach
      const urls = fileArray.map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...urls]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (photos.length < 2) {
      alert('Please upload at least 2 photos');
      return;
    }
    if (!consent) {
      alert('Please confirm the condition of the tool');
      return;
    }
    onComplete(photos);
  };

  return (
    <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">
        {type === 'pickup' ? 'Pickup Verification' : 'Return Verification'}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-[#6b6b6b] mb-2">
          {type === 'pickup' 
            ? 'Take photos of the tool before handing it over.'
            : 'Take photos of the tool when it is returned.'}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((photo, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
              <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-sm"
              >
                ×
              </button>
            </div>
          ))}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed border-[#d4d0c8] rounded-lg flex items-center justify-center text-[#6b6b6b] hover:border-[#e85d04] transition-colors"
          >
            {uploading ? '...' : '+'}
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-[#e85d04]"
          />
          <span className="text-sm">
            {type === 'pickup' 
              ? 'I confirm the tool is in working order and matches the listing description.'
              : 'I confirm the tool has been returned in acceptable condition.'}
          </span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={photos.length < 2 || !consent}
        className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {type === 'pickup' ? 'Confirm Pickup' : 'Confirm Return'}
      </button>
    </div>
  );
}

interface BookingCardProps {
  booking: {
    id: string;
    status: string;
    startDate: string;
    endDate: string;
    totalPrice: string;
    tool?: {
      title: string;
      images: string[];
    };
    renter?: {
      name: string;
      avatar: string;
    };
    owner?: {
      name: string;
      avatar: string;
    };
  };
  viewAs: 'renter' | 'owner';
  onAccept?: () => void;
  onReject?: () => void;
  onStartRental?: () => void;
  onComplete?: () => void;
  onDispute?: () => void;
}

export function BookingCard({ 
  booking, 
  viewAs, 
  onAccept, 
  onReject, 
  onStartRental,
  onComplete,
  onDispute 
}: BookingCardProps) {
  const statusColors: Record<string, string> = {
    pending: 'bg-[#ffbe0b] text-[#1a1a1a]',
    accepted: 'bg-[#2d6a4f] text-white',
    rejected: 'bg-[#6b6b6b] text-white',
    cancelled: 'bg-[#d00000] text-white',
    active: 'bg-[#e85d04] text-white',
    completed: 'bg-[#2d6a4f] text-white',
    disputed: 'bg-[#d00000] text-white',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getOtherUser = () => {
    return viewAs === 'renter' ? booking.owner : booking.renter;
  };

  return (
    <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4">
      <div className="flex items-start gap-4">
        {booking.tool?.images?.[0] && (
          <img 
            src={booking.tool.images[0]} 
            alt={booking.tool.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-[#222]">{booking.tool?.title}</h3>
              <p className="text-sm text-[#6b6b6b]">
                {viewAs === 'renter' ? 'From ' : 'From '}
                {getOtherUser()?.name}
              </p>
            </div>
            <span className={`badge ${statusColors[booking.status]} capitalize`}>
              {booking.status}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-[#6b6b6b] mb-3">
            <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
            <span className="price">${parseFloat(booking.totalPrice).toFixed(2)}</span>
          </div>

          {booking.status === 'pending' && viewAs === 'owner' && (
            <div className="flex gap-2">
              <button onClick={onAccept} className="btn btn-primary py-2 px-4 text-sm">
                Accept
              </button>
              <button onClick={onReject} className="btn btn-outline py-2 px-4 text-sm">
                Reject
              </button>
            </div>
          )}

          {booking.status === 'accepted' && (
            <div className="flex gap-2">
              {viewAs === 'owner' && onStartRental && (
                <button onClick={onStartRental} className="btn btn-primary py-2 px-4 text-sm">
                  Start Rental
                </button>
              )}
              <button onClick={onDispute} className="btn btn-outline py-2 px-4 text-sm text-[#d00000] border-[#d00000]">
                Report Issue
              </button>
            </div>
          )}

          {booking.status === 'active' && (
            <div className="flex gap-2">
              {viewAs === 'owner' && onComplete && (
                <button onClick={onComplete} className="btn btn-primary py-2 px-4 text-sm">
                  Complete Rental
                </button>
              )}
              <button onClick={onDispute} className="btn btn-outline py-2 px-4 text-sm text-[#d00000] border-[#d00000]">
                Report Issue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
