'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <svg className="w-10 h-10 text-[#e85d04]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
            </svg>
            <span className="text-3xl tracking-wide text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              TOOLSHARE
            </span>
          </Link>
          <h1 className="text-2xl font-medium text-[#222]">Verify Your Identity</h1>
          <p className="text-[#6b6b6b]">Required for all users</p>
        </div>

        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#f0ede8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium mb-2">Upload Government ID</h2>
                <p className="text-sm text-[#6b6b6b]">
                  Please upload a clear photo of your driver&apos;s license or passport
                </p>
              </div>

              <div className="border-2 border-dashed border-[#d4d0c8] rounded-lg p-8 text-center mb-4">
                <svg className="w-12 h-12 text-[#6b6b6b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[#6b6b6b]">Click to upload your ID</p>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="btn btn-primary w-full py-3"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#f0ede8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium mb-2">Selfie Verification</h2>
                <p className="text-sm text-[#6b6b6b]">
                  Take a selfie to verify you match your ID
                </p>
              </div>

              <div className="border-2 border-dashed border-[#d4d0c8] rounded-lg p-8 text-center mb-4">
                <svg className="w-16 h-16 text-[#6b6b6b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[#6b6b6b]">Click to take selfie</p>
              </div>

              <button 
                onClick={() => setStep(3)}
                className="btn btn-primary w-full py-3"
              >
                Continue
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#2d6a4f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium mb-2">Verification Complete!</h2>
                <p className="text-sm text-[#6b6b6b]">
                  Your identity has been verified. You can now use all features of ToolShare.
                </p>
              </div>

              <Link href="/dashboard" className="btn btn-primary w-full py-3">
                Go to Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
