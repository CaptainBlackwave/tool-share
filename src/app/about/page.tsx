import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - ToolShare",
  description: "Learn about ToolShare's mission to make tool sharing easy and accessible for everyone.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          About ToolShare
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-6">
          <p className="text-[#6b6b6b] text-lg">
            ToolShare is a peer-to-peer marketplace connecting tool owners with people who need tools, 
            making home improvement projects more accessible and affordable.
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Our Mission</h2>
            <p className="text-[#6b6b6b]">
              We believe everyone should have access to the tools they need to complete their projects, 
              without the burden of owning equipment they only use occasionally. By connecting neighbors 
              who share, we reduce waste, save money, and build stronger communities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Our Story</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare was founded in 2024 when our founders realized how many quality tools sat idle 
              in garages and workshops across neighborhoods. Instead of spending hundreds on tools they'd 
              use once or twice, people were abandoning projects or paying premium rental prices.
            </p>
            <p className="text-[#6b6b6b]">
              We built ToolShare to create a simple, secure platform where anyone can rent tools from 
              their neighbors or earn money from tools they already own. Today, thousands of people use 
              ToolShare to complete home projects, from simple repairs to major renovations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Our Values</h2>
            <ul className="space-y-3 text-[#6b6b6b]">
              <li className="flex items-start gap-3">
                <span className="text-[#e85d04] text-xl">▸</span>
                <span><strong>Community First</strong> – We believe in the power of neighborly connections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e85d04] text-xl">▸</span>
                <span><strong>Sustainability</strong> – Sharing reduces waste and promotes reuse</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e85d04] text-xl">▸</span>
                <span><strong>Trust & Safety</strong> – Every transaction is protected and verified</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e85d04] text-xl">▸</span>
                <span><strong>Simplicity</strong> – Tool renting should be as easy as borrowing from a friend</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">For Renters</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Access thousands of tools in your neighborhood. Find the right tool for any project 
                  at a fraction of retail cost.
                </p>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">For Owners</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Turn your idle tools into income. List your equipment and start earning while helping neighbors.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Join Us</h2>
            <p className="text-[#6b6b6b] mb-4">
              Whether you&apos;re a DIY enthusiast, a professional contractor, or just have a garage full of 
              tools, ToolShare has a place for you. Join thousands of neighbors who are already sharing, 
              saving, and building together.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}