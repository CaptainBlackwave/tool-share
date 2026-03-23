import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance - ToolShare",
  description: "Learn about ToolShare's insurance coverage and protection for rentals.",
};

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Insurance & Protection
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-8">
          <p className="text-[#6b6b6b] text-lg">
            ToolShare provides automatic protection coverage for all rentals, helping to protect 
            both tool owners and renters from unexpected incidents.
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">ToolShare Protection</h2>
            <p className="text-[#6b6b6b] mb-4">
              Every rental on ToolShare is automatically covered under our protection program. 
              This coverage helps protect against:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Accidental Damage</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Coverage for tools damaged during normal use, up to $1,000 per rental.
                </p>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Theft Protection</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Coverage if rented tools are stolen, with a valid police report required.
                </p>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Third-Party Liability</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Protection against liability claims arising from tool use during rentals.
                </p>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Rental Interruption</h3>
                <p className="text-[#6b6b6b] text-sm">
                  Coverage if a rental must be cancelled due to covered circumstances.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Coverage Limits</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#d4d0c8]">
                    <th className="py-3 text-[#222] font-medium">Type of Coverage</th>
                    <th className="py-3 text-[#222] font-medium">Coverage Limit</th>
                  </tr>
                </thead>
                <tbody className="text-[#6b6b6b]">
                  <tr className="border-b border-[#d4d0c8]">
                    <td className="py-3">Tool Damage</td>
                    <td className="py-3">Up to $1,000 per rental</td>
                  </tr>
                  <tr className="border-b border-[#d4d0c8]">
                    <td className="py-3">Theft</td>
                    <td className="py-3">Up to $1,000 (with police report)</td>
                  </tr>
                  <tr className="border-b border-[#d4d0c8]">
                    <td className="py-3">Third-Party Liability</td>
                    <td className="py-3">Up to $100,000 per incident</td>
                  </tr>
                  <tr>
                    <td className="py-3">Security Deposit</td>
                    <td className="py-3">Refunded within 5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">What&apos;s Covered</h2>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>✓ Tools damaged during normal rental use</li>
              <li>✓ Tools stolen during a rental period (with police report)</li>
              <li>✓ Damage to third-party property caused by rented tools</li>
              <li>✓ Legal fees related to covered incidents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">What&apos;s NOT Covered</h2>
            <ul className="space-y-2 text-[#6b6b6b]">
              <li>✗ Damage from misuse or negligence</li>
              <li>✗ Normal wear and tear</li>
              <li>✗ Lost tools without documentation</li>
              <li>✗ Damage from modifications or repairs</li>
              <li>✗ Tools rented outside the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Making a Claim</h2>
            <div className="bg-[#faf9f7] p-6 rounded-lg space-y-4">
              <h3 className="font-medium text-[#222]">To file a claim:</h3>
              <ol className="space-y-2 text-[#6b6b6b]">
                <li className="flex gap-3">
                  <span className="font-medium text-[#e85d04]">1.</span>
                  <span>Report the incident through your dashboard within 24 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-[#e85d04]">2.</span>
                  <span>Provide photos documenting the damage or theft</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-[#e85d04]">3.</span>
                  <span>For theft, include a police report number</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-[#e85d04]">4.</span>
                  <span>Our team will review and respond within 5 business days</span>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Security Deposits</h2>
            <p className="text-[#6b6b6b] mb-4">
              Tool owners may require a security deposit on their tools. This is a temporary hold 
              on your card, not a charge. The deposit is released within 5 business days after 
              the tool is returned in good condition.
            </p>
            <div className="bg-[#faf9f7] p-4 rounded-lg">
              <p className="text-[#6b6b6b] text-sm">
                <strong>Note:</strong> Security deposits are held by Stripe and released automatically 
                once the tool owner confirms the return. If there&apos;s a dispute, our team will 
                investigate and make a determination within 5 business days.
              </p>
            </div>
          </section>

          <section className="bg-[#2d6a4f] text-white rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Additional Coverage</h2>
            <p className="mb-4">
              For high-value tools or frequent renters, we recommend checking with your personal 
              insurance provider about additional coverage options.
            </p>
            <p>
              Questions? Contact our support team at support@toolshare.example.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}