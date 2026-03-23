import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - ToolShare",
  description: "Tips, guides, and stories from the ToolShare community.",
};

export default function BlogPage() {
  const posts = [
    {
      title: "10 Essential Tools Every Homeowner Should Have",
      excerpt: "From hammers to drills, these are the tools that will help you handle most home repairs and projects.",
      category: "Guides",
      date: "January 15, 2024",
      slug: "10-essential-tools",
    },
    {
      title: "How to Prepare Your Tools for Rental",
      excerpt: "A complete checklist to ensure your tools are ready for renters and protected during rentals.",
      category: "For Owners",
      date: "January 10, 2024",
      slug: "prepare-tools-for-rental",
    },
    {
      title: "DIY Project Ideas for Beginners",
      excerpt: "Start small with these beginner-friendly projects that require basic tools and skills.",
      category: "Inspiration",
      date: "January 5, 2024",
      slug: "diy-projects-beginners",
    },
    {
      title: "Tool Safety: A Complete Guide",
      excerpt: "Everything you need to know about using power tools safely and preventing accidents.",
      category: "Safety",
      date: "December 28, 2023",
      slug: "tool-safety-guide",
    },
    {
      title: "Maximizing Your Tool Rental Experience",
      excerpt: "Get the most out of your tool rentals with these tips from experienced renters.",
      category: "Tips",
      date: "December 20, 2023",
      slug: "maximize-rental-experience",
    },
    {
      title: "The Economics of Tool Sharing",
      excerpt: "How much can you save by renting tools instead of buying? We break down the numbers.",
      category: "Money",
      date: "December 15, 2023",
      slug: "economics-tool-sharing",
    },
  ];

  const categories = ["All", "Guides", "For Owners", "Inspiration", "Safety", "Tips", "Money"];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16">
        <h1 className="text-4xl text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          ToolShare Blog
        </h1>
        <p className="text-[#6b6b6b] text-lg mb-8 max-w-2xl">
          Tips, guides, and stories to help you get the most out of tool sharing.
        </p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                cat === "All"
                  ? "bg-[#e85d04] text-white"
                  : "bg-[#f0ede8] text-[#6b6b6b] hover:bg-[#e85d04] hover:text-white transition-colors"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <article key={idx} className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden hover:border-[#e85d04] transition-colors">
              <div className="h-48 bg-[#f0ede8] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#d4d0c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[#e85d04] bg-[#faf9f7] px-2 py-1 rounded">{post.category}</span>
                  <span className="text-xs text-[#6b6b6b]">{post.date}</span>
                </div>
                <h2 className="text-lg font-medium text-[#222] mb-2">{post.title}</h2>
                <p className="text-[#6b6b6b] text-sm mb-4">{post.excerpt}</p>
                <Link href="#" className="text-[#e85d04] text-sm font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#6b6b6b] mb-4">Want to contribute to our blog?</p>
          <Link href="/contact" className="btn btn-outline">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}