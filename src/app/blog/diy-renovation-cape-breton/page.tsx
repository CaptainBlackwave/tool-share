import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DIY Renovation Tips for Cape Breton Homeowners - ToolShare Guide",
  description: "Get expert tips for tackling home renovation projects in Cape Breton. From tool selection to project planning, learn how to save money on your next project.",
};

export default function DIYRenovationGuide() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#e85d04]">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#e85d04]">Blog</Link>
          <span>/</span>
          <span className="text-[#222]">DIY Renovation Tips</span>
        </nav>

        <article className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8">
          <header className="mb-8">
            <span className="text-xs font-medium text-[#e85d04] bg-[#faf9f7] px-2 py-1 rounded">Inspiration</span>
            <h1 className="text-3xl text-[#1a1a1a] mt-4 mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              DIY Renovation Tips for Cape Breton Homeowners
            </h1>
            <p className="text-[#6b6b6b]">By ToolShare Team · March 2024</p>
          </header>

          <div className="prose prose-lg text-[#6b6b6b]">
            <p className="text-lg mb-6">
              Whether you're updating a historic Cape Breton home or modernizing a newer build, tackling renovation projects yourself can save thousands. Here's how to approach your next DIY project like a pro.
            </p>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Planning Your Project</h2>
            <p className="mb-4">
              Success in DIY renovation starts with proper planning. Before purchasing materials or renting tools, take time to:
            </p>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Define your scope:</strong> What exactly needs to be done?</li>
              <li>• <strong>Set a realistic budget:</strong> Include 20% for unexpected costs</li>
              <li>• <strong>Create a timeline:</strong> Factor in delivery times and weather</li>
              <li>• <strong>Research codes:</strong> Some projects require permits</li>
              <li>• <strong>Find help if needed:</strong> Some jobs require more than one person</li>
            </ul>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Essential Tools for Home Renovation</h2>
            <p className="mb-4">
              Having the right tools makes every project easier. Here are the essentials every Cape Breton homeowner should have access to:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Power Tools</h3>
                <ul className="text-sm text-[#6b6b6b] space-y-1">
                  <li>• Cordless drill/driver</li>
                  <li>• Circular saw</li>
                  <li>• Jigsaw</li>
                  <li>• Orbital sander</li>
                </ul>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Measuring & Layout</h3>
                <ul className="text-sm text-[#6b6b6b] space-y-1">
                  <li>• Laser level</li>
                  <li>• Speed square</li>
                  <li>• Tape measure (25ft)</li>
                  <li>• Chalk line</li>
                </ul>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Cutting Tools</h3>
                <ul className="text-sm text-[#6b6b6b] space-y-1">
                  <li>• Miter saw</li>
                  <li>• Oscillating tool</li>
                  <li>• Reciprocating saw</li>
                  <li>• Hand saw</li>
                </ul>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Finishing</h3>
                <ul className="text-sm text-[#6b6b6b] space-y-1">
                  <li>• Paint sprayer</li>
                  <li>• Palm sander</li>
                  <li>• Caulk gun</li>
                  <li>• Putty knife set</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">The Tool Rental Strategy</h2>
            <p className="mb-4">
              Instead of buying expensive tools you'll use once, consider renting:
            </p>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Specialty tools:</strong> Tile saw, drywall lift, compact excavator</li>
              <li>• <strong>High-end equipment:</strong> Professional-grade saws, sprayers</li>
              <li>• <strong>One-time use items:</strong> Concrete mixer, scaffold, power washer</li>
            </ul>
            <p className="mb-6">
              For a typical $500 tool you'd use once, renting for $50 saves $450. That's money in your pocket for materials.
            </p>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Cape Breton-Specific Considerations</h2>
            <p className="mb-4">
              Our unique climate presents some specific challenges for home renovation:
            </p>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Humidity:</strong> Allow extra drying time for paint and stain</li>
              <li>• <strong>Temperature swings:</strong> Some materials need specific temperature ranges</li>
              <li>• <strong>Coastal weather:</strong> Exterior projects need weather-resistant materials</li>
              <li>• <strong>Short building season:</strong> Plan exterior work for late spring through fall</li>
            </ul>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Project Ideas for This Season</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-[#d4d0c8] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Deck Refresh</h3>
                <p className="text-sm text-[#6b6b6b]">Power wash, stain, and seal your deck for summer.</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Bathroom Update</h3>
                <p className="text-sm text-[#6b6b6b]">Retile, re-grout, or update fixtures without a full remodel.</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Kitchen Facelift</h3>
                <p className="text-sm text-[#6b6b6b]">Paint cabinets, update hardware, add backsplash.</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Outdoor Living</h3>
                <p className="text-sm text-[#6b6b6b]">Build a patio, fire pit, or seating area.</p>
              </div>
            </div>

            <div className="bg-[#f0ede8] rounded-lg p-6 mt-8">
              <h3 className="font-medium text-[#222] mb-2">Need Tools for Your Project?</h3>
              <p className="text-[#6b6b6b] mb-4">
                Browse available tools for rent from neighbors throughout the Cape Breton area.
              </p>
              <div className="flex gap-3">
                <Link href="/browse" className="btn btn-primary">
                  Browse All Tools
                </Link>
                <Link href="/list" className="btn btn-outline">
                  List Your Tools
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}