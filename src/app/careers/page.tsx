import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers - ToolShare",
  description: "Join the ToolShare team and help build the future of peer-to-peer tool sharing.",
};

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Backend Engineer",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: "Build and scale our API infrastructure, work with Stripe Connect, and optimize database performance.",
    },
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful, responsive user interfaces using Next.js and Tailwind CSS.",
    },
    {
      title: "Product Manager",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Define product roadmap and work closely with engineering to deliver features users love.",
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time",
      description: "Support our community of tool owners and renters, resolve issues, and gather feedback.",
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Unlimited PTO",
    "Remote-first culture",
    "Learning & development budget",
    "Home office stipend",
    "Team retreats",
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Careers at ToolShare
        </h1>
        <p className="text-[#6b6b6b] text-lg mb-12 max-w-2xl">
          Join a team passionate about building the future of the sharing economy. 
          We&apos;re looking for creative, driven individuals to help us make tool sharing accessible to everyone.
        </p>

        <section className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 mb-8">
          <h2 className="text-2xl text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Open Positions
          </h2>
          
          {openPositions.length > 0 ? (
            <div className="space-y-4">
              {openPositions.map((position, idx) => (
                <div key={idx} className="border border-[#d4d0c8] rounded-lg p-6 hover:border-[#e85d04] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#222]">{position.title}</h3>
                      <p className="text-[#6b6b6b]">{position.location} · {position.type}</p>
                      <p className="text-[#6b6b6b] mt-2">{position.description}</p>
                    </div>
                    <Link 
                      href="/contact" 
                      className="btn btn-primary whitespace-nowrap"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#6b6b6b]">No open positions at this time. Check back soon!</p>
          )}
        </section>

        <section className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 mb-8">
          <h2 className="text-2xl text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Why Join Us?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#e85d04] rounded-full"></span>
                <span className="text-[#6b6b6b]">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f0ede8] rounded-lg p-8 text-center">
          <h2 className="text-2xl text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-[#6b6b6b] mb-6">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </section>
      </div>
    </main>
  );
}