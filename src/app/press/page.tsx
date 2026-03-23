import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press - ToolShare",
  description: "Press resources, media kit, and latest news about ToolShare.",
};

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Press & Media
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">About ToolShare</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare is a peer-to-peer marketplace for tool rentals, connecting neighbors who have 
              tools with those who need them. Our platform makes home improvement projects more accessible 
              and affordable while helping tool owners earn extra income.
            </p>
            <p className="text-[#6b6b6b]">
              Founded in 2024, ToolShare is headquartered in San Francisco and serves communities across the United States.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Brand Assets</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#faf9f7] p-4 rounded-lg text-center">
                <div className="h-24 flex items-center justify-center mb-3">
                  <svg className="w-16 h-16 text-[#e85d04]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                </div>
                <p className="text-[#6b6b6b] text-sm">Logo (SVG)</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
                <div className="h-24 flex items-center justify-center mb-3">
                  <span className="text-white text-3xl font-bold" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>TOOLSHARE</span>
                </div>
                <p className="text-gray-400 text-sm">Logo (White)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Press Contact</h2>
            <p className="text-[#6b6b6b] mb-4">
              For media inquiries, interview requests, or additional information, please contact:
            </p>
            <div className="bg-[#faf9f7] p-4 rounded-lg">
              <p className="text-[#222] font-medium">Press Team</p>
              <p className="text-[#6b6b6b]">press@toolshare.example.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Recent Coverage</h2>
            <div className="space-y-4">
              <div className="border border-[#d4d0c8] rounded-lg p-4">
                <p className="text-[#6b6b6b] text-sm mb-1">Coming Soon</p>
                <h3 className="font-medium text-[#222]">ToolShare Launches Peer-to-Peer Tool Rental Platform</h3>
                <p className="text-[#6b6b6b] text-sm">Local News · January 2024</p>
              </div>
              <div className="border border-[#d4d0c8] rounded-lg p-4">
                <p className="text-[#6b6b6b] text-sm mb-1">Coming Soon</p>
                <h3 className="font-medium text-[#222]">The Rise of the Sharing Economy in Home Improvement</h3>
                <p className="text-[#6b6b6b] text-sm">Home & Garden Magazine · February 2024</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Key Facts</h2>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>• Founded: 2024</li>
              <li>• Headquarters: San Francisco, CA</li>
              <li>• Service: Tool rental marketplace</li>
              <li>• Users: Growing community of tool owners and renters</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}