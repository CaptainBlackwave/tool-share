import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Pressure Wash Your Driveway in Cape Breton - ToolShare Guide",
  description: "Learn the best techniques for pressure washing driveways, decks, and siding in Cape Breton's unique climate. Save money by renting tools locally.",
};

export default function PressureWashingGuide() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#e85d04]">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#e85d04]">Blog</Link>
          <span>/</span>
          <span className="text-[#222]">Pressure Washing Cape Breton</span>
        </nav>

        <article className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8">
          <header className="mb-8">
            <span className="text-xs font-medium text-[#e85d04] bg-[#faf9f7] px-2 py-1 rounded">Guides</span>
            <h1 className="text-3xl text-[#1a1a1a] mt-4 mb-2" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              How to Pressure Wash Your Driveway in Cape Breton
            </h1>
            <p className="text-[#6b6b6b]">By ToolShare Team · March 2024</p>
          </header>

          <div className="prose prose-lg text-[#6b6b6b]">
            <p className="text-lg mb-6">
              Spring in Cape Breton means melting snow, muddy driveways, and the perfect time to give your outdoor spaces a thorough cleaning. Whether you're dealing with the aftermath of a long winter or preparing for summer, pressure washing is the most effective way to restore your driveway, deck, and siding.
            </p>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Why Pressure Washing Matters in Cape Breton</h2>
            <p className="mb-4">
              Our unique climate—with its freeze-thaw cycles, coastal salt air, and heavy snowfall—takes a toll on outdoor surfaces. Moss, algae, and dirt accumulate quickly, especially on north-facing surfaces that stay damp. Regular pressure washing not only improves curb appeal but also extends the life of your concrete, wood, and siding.
            </p>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">What You'll Need</h2>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Pressure Washer:</strong> 3000+ PSI for concrete, 1500-2000 PSI for decks and siding</li>
              <li>• <strong>Surface Cleaner Attachment:</strong> For large flat areas like driveways</li>
              <li>• <strong>Extension Wand:</strong> For reaching high areas</li>
              <li>• <strong>Safety Gear:</strong> Glasses, closed-toe shoes, long pants</li>
              <li>• <strong>Cleaning Solution:</strong> Specifically designed for pressure washers</li>
            </ul>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Step-by-Step Guide</h2>
            
            <h3 className="text-lg font-medium text-[#222] mb-2">1. Prepare the Area</h3>
            <p className="mb-4">
              Clear the driveway of vehicles, furniture, and debris. Wet down nearby plants to protect them from cleaning solution. Cover any delicate landscaping.
            </p>

            <h3 className="text-lg font-medium text-[#222] mb-2">2. Start with Low Pressure</h3>
            <p className="mb-4">
              Begin with a wide-angle nozzle (25-40 degrees) at a low pressure. Test on a small, inconspicuous area first. For concrete, you can increase pressure; for wood and siding, stay gentle.
            </p>

            <h3 className="text-lg font-medium text-[#222] mb-2">3. Work in Sections</h3>
            <p className="mb-4">
              Divide your driveway into 4x4 foot sections. Work from top to bottom, overlapping each pass by about 20% to ensure even coverage. Keep the wand moving—holding it in one spot can damage surfaces.
            </p>

            <h3 className="text-lg font-medium text-[#222] mb-2">4. Use the Right Technique</h3>
            <p className="mb-4">
              Hold the nozzle 12-18 inches from the surface. For stubborn stains, use a rotating surface cleaner or a scrub brush attachment. For oil stains, apply a degreaser before pressure washing.
            </p>

            <h3 className="text-lg font-medium text-[#222] mb-2">5. Rinse Thoroughly</h3>
            <p className="mb-4">
              After applying cleaning solution, rinse thoroughly from top to bottom. Ensure all soap residue is removed to prevent slippery surfaces.
            </p>

            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Renting vs. Buying</h2>
            <p className="mb-4">
              A quality pressure washer costs $300-800 to buy, but if you only use it once or twice a year, renting makes more sense. A 3000 PSI gas pressure washer rents for about $45-65 per day in the Cape Breton area—perfect for that annual spring cleaning.
            </p>
            <p className="mb-6">
              <strong>Pro Tip:</strong> Plan your pressure washing for a dry, sunny day. Wait at least 24 hours after rain, and check the forecast to ensure your cleaned surfaces have time to dry before the next rain.
            </p>

            <div className="bg-[#f0ede8] rounded-lg p-6 mt-8">
              <h3 className="font-medium text-[#222] mb-2">Need a Pressure Washer?</h3>
              <p className="text-[#6b6b6b] mb-4">
                Find available pressure washers for rent in Sydney, New Waterford, and surrounding areas on ToolShare.
              </p>
              <Link href="/browse?category=cleaning" className="btn btn-primary">
                Browse Pressure Washers
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}