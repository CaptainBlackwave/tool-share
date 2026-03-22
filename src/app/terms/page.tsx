import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ToolShare",
  description: "ToolShare Terms of Service - Read our terms and conditions for using the platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Terms of Service
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-6">
          <p className="text-[#6b6b6b]">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#6b6b6b] mb-4">
              By accessing or using the ToolShare platform (&quot;Service&quot;), you agree to be bound by these 
              Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not 
              use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">2. Description of Service</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare is a peer-to-peer platform that enables users to rent tools from other users 
              (&quot;Borrowers&quot;) and list their own tools for rent (&quot;Lenders&quot;). We provide a marketplace 
              for tool rentals but are not a party to the rental agreement between users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">3. User Accounts</h2>
            <h3 className="font-medium text-[#222] mb-2">Eligibility</h3>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>You must be at least 18 years old</li>
              <li>You must provide accurate and complete information</li>
              <li>You must maintain the security of your account</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
            <h3 className="font-medium text-[#222] mb-2">Account Termination</h3>
            <p className="text-[#6b6b6b] mb-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or for any 
              reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">4. Tool Listings & Rentals</h2>
            <h3 className="font-medium text-[#222] mb-2">For Lenders</h3>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>You must accurately describe your tools and their condition</li>
              <li>You are responsible for maintaining your tools in safe, working condition</li>
              <li>You must respond to booking requests in a timely manner</li>
              <li>You agree to honor confirmed bookings</li>
              <li>You are responsible for setting appropriate rental prices</li>
            </ul>
            <h3 className="font-medium text-[#222] mb-2">For Borrowers</h3>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>You agree to use tools responsibly and as intended</li>
              <li>You are responsible for returning tools in the same condition</li>
              <li>You agree to pay all rental fees and deposits</li>
              <li>You must return tools on time as agreed</li>
              <li>You are liable for any damage caused during your rental period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">5. Payments & Fees</h2>
            <p className="text-[#6b6b6b] mb-4">
              Payments are processed through Stripe. By using our Service, you agree to Stripe&apos;s 
              terms of service. We may charge service fees for facilitating rentals, which are clearly 
              disclosed before completing a booking.
            </p>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Rental fees are paid by Borrowers</li>
              <li>Security deposits may be required and will be refunded after return</li>
              <li>Cancellation policies apply as outlined in each booking</li>
              <li>Refunds are processed according to our refund policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">6. User Conduct</h2>
            <p className="text-[#6b6b6b] mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Harass, threaten, or abuse other users</li>
              <li>Attempt to circumvent our security measures</li>
              <li>Use the platform for any illegal purpose</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">7. Disputes & Resolution</h2>
            <p className="text-[#6b6b6b] mb-4">
              In case of disputes between users, we may mediate and attempt to resolve the issue. 
              However, users are primarily responsible for resolving disputes between themselves. 
              We reserve the right to make final decisions on disputes at our sole discretion.
            </p>
            <p className="text-[#6b6b6b] mb-4">
              For disputes, users should first attempt to resolve issues directly through communication. 
              If resolution cannot be reached, users may contact our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">8. Insurance & Liability</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare may provide basic protection for rentals, but this does not replace 
              personal liability insurance. Users are encouraged to maintain appropriate insurance coverage.
            </p>
            <p className="text-[#6b6b6b] mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOOLSHARE IS NOT LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF 
              THE PLATFORM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">9. Intellectual Property</h2>
            <p className="text-[#6b6b6b] mb-4">
              The ToolShare platform, including its design, code, logos, and content, is owned by 
              ToolShare and protected by intellectual property laws. You may not copy, modify, or 
              distribute our intellectual property without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-[#6b6b6b] mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TOOLSHARE MAKES NO WARRANTIES, 
              EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
              PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">11. Indemnification</h2>
            <p className="text-[#6b6b6b] mb-4">
              You agree to indemnify, defend, and hold harmless ToolShare and its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, costs, or expenses 
              arising from your use of the platform or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">12. Governing Law</h2>
            <p className="text-[#6b6b6b] mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the 
              State of California, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">13. Changes to Terms</h2>
            <p className="text-[#6b6b6b] mb-4">
              We may modify these Terms at any time. We will provide notice of material changes. 
              Your continued use of the platform after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">14. Contact Information</h2>
            <p className="text-[#6b6b6b] mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-[#6b6b6b]">
              Email: legal@toolshare.example.com<br />
              Address: 123 ToolShare Way, San Francisco, CA 94102
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
