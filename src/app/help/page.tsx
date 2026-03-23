import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center - ToolShare",
  description: "Find answers to common questions and get support for using ToolShare.",
};

export default function HelpPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: "🚀",
      questions: [
        { q: "How do I sign up for ToolShare?", a: "Click the Sign Up button in the header and create an account using your email or sign in with Google." },
        { q: "How do I verify my identity?", a: "Go to your dashboard and complete the identity verification process by providing a valid government ID." },
        { q: "Is ToolShare available in my area?", a: "ToolShare is available nationwide. Enter your location to see available tools near you." },
      ],
    },
    {
      title: "Renting Tools",
      icon: "🔧",
      questions: [
        { q: "How do I rent a tool?", a: "Search for tools in your area, select the tool you need, choose your rental dates, and complete the booking request." },
        { q: "What is a security deposit?", a: "A security deposit is a temporary hold on your card to cover potential damages. It's released after the tool is returned in good condition." },
        { q: "Can I cancel my rental?", a: "Yes, you can cancel up to 24 hours before the rental starts for a full refund. Cancellations within 24 hours may incur a fee." },
      ],
    },
    {
      title: "Listing Tools",
      icon: "📦",
      questions: [
        { q: "How do I list my tool for rent?", a: "Go to 'List a Tool' in the navigation, add photos, set your price, and publish your listing." },
        { q: "How do I set my rental price?", a: "Research similar tools in your area and consider your tool's condition, brand, and demand when setting your price." },
        { q: "When do I get paid?", a: "Payments are released 24 hours after the rental period ends, once the tool is confirmed returned in good condition." },
      ],
    },
    {
      title: "Payments & Billing",
      icon: "💳",
      questions: [
        { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, and some digital wallets through Stripe." },
        { q: "How does pricing work?", a: "The price you see includes the daily rental rate plus a service fee. Weekly rates are available for longer rentals." },
        { q: "When am I charged?", a: "You're charged when your booking request is accepted by the tool owner." },
      ],
    },
    {
      title: "Safety & Trust",
      icon: "🛡️",
      questions: [
        { q: "How is my safety protected?", a: "All users go through identity verification, and we provide $1,000 in coverage per rental for property damage or theft." },
        { q: "What happens if a tool is damaged?", a: "Report the damage immediately. Our team will help resolve the issue, and the security deposit may be used to cover repairs." },
        { q: "Can I trust other users?", a: "All users have verified identities, and you can review ratings and reviews before completing any transaction." },
      ],
    },
    {
      title: "Troubleshooting",
      icon: "🔍",
      questions: [
        { q: "Why was my booking declined?", a: "Owners may decline for various reasons. Contact the owner through our messaging system to discuss." },
        { q: "My tool isn't working properly. What do I do?", a: "Contact the owner immediately and report the issue. You may be eligible for a refund or replacement." },
        { q: "How do I report a problem?", a: "Go to your dashboard, find the booking, and use the 'Report Issue' button or contact our support team." },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] text-white py-16">
        <div className="container-main max-w-4xl">
          <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Help Center
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          <div className="max-w-xl">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for help..."
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e85d04]"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-12 max-w-4xl">
        <div className="grid gap-8">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-medium text-[#1a1a1a]">{category.title}</h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((item, qidx) => (
                  <details key={qidx} className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none p-3 rounded-lg hover:bg-[#faf9f7] transition-colors">
                      <span className="font-medium text-[#222]">{item.q}</span>
                      <span className="text-[#6b6b6b] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-[#6b6b6b] px-3 pb-3">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0ede8] rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Still Need Help?
          </h2>
          <p className="text-[#6b6b6b] mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}