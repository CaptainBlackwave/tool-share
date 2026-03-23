import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety - ToolShare",
  description: "Learn about safety practices and policies that protect the ToolShare community.",
};

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Safety Center
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-8">
          <p className="text-[#6b6b6b] text-lg">
            Your safety is our top priority. ToolShare is built with multiple layers of protection 
            to ensure secure transactions for both tool owners and renters.
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Identity Verification</h2>
            <p className="text-[#6b6b6b] mb-4">
              All users must complete identity verification before booking or listing tools. 
              This helps us maintain a trusted community and prevents fraudulent activity.
            </p>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>• Government-issued ID verification</li>
              <li>• Phone number verification</li>
              <li>• Email address confirmation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Secure Payments</h2>
            <p className="text-[#6b6b6b] mb-4">
              All payments are processed through Stripe, a PCI-compliant payment processor. 
              Your financial information is never stored on our servers.
            </p>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>• Secure payment processing</li>
              <li>• Encrypted transactions</li>
              <li>• Fraud detection & prevention</li>
              <li>• Secure deposit holds</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Rental Protection</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare provides protection coverage for rentals, helping to cover the cost of 
              repairs or replacement if tools are damaged or stolen during a rental period.
            </p>
            <div className="bg-[#faf9f7] p-4 rounded-lg">
              <h3 className="font-medium text-[#222] mb-2">Coverage Includes:</h3>
              <ul className="space-y-2 text-[#6b6b6b]">
                <li>✓ Accidental damage</li>
                <li>✓ Theft (with police report)</li>
                <li>✓ Third-party liability</li>
                <li>✓ Up to $1,000 per rental</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Safety Best Practices</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#e85d04] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#222]">Inspect Before Use</h3>
                  <p className="text-[#6b6b6b]">Check that tools are in good working condition before starting your project.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#e85d04] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#222]">Use Proper Safety Equipment</h3>
                  <p className="text-[#6b6b6b]">Always use appropriate protective gear like gloves, goggles, and hearing protection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#e85d04] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#222]">Follow Manufacturer Guidelines</h3>
                  <p className="text-[#6b6b6b]">Read and follow all safety instructions provided with the tool.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#e85d04] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#222]">Document Condition</h3>
                  <p className="text-[#6b6b6b]">Take photos of tools at pickup and return to document their condition.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Reporting Issues</h2>
            <p className="text-[#6b6b6b] mb-4">
              If you experience any safety concerns during a rental, report it immediately through 
              our platform. Our trust and safety team is available to help resolve issues.
            </p>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>• Use the in-app chat to communicate</li>
              <li>• Report issues through your dashboard</li>
              <li>• Contact emergency services if needed</li>
              <li>• File a police report for theft</li>
            </ul>
          </section>

          <section className="bg-[#f0ede8] rounded-lg p-6">
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Emergency Contacts</h2>
            <p className="text-[#6b6b6b] mb-2">For immediate emergencies, dial 911</p>
            <p className="text-[#6b6b6b]">ToolShare Support: support@toolshare.example.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}