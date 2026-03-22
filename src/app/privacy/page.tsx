import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ToolShare",
  description: "ToolShare Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Privacy Policy
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-6">
          <p className="text-[#6b6b6b]">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">1. Introduction</h2>
            <p className="text-[#6b6b6b] mb-4">
              ToolShare (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the ToolShare platform and website. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform to rent or list tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">2. Information We Collect</h2>
            <h3 className="font-medium text-[#222] mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Profile information and profile picture</li>
              <li>Location data for tool search functionality</li>
              <li>Communication history and messages</li>
            </ul>
            <h3 className="font-medium text-[#222] mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Provide and improve our platform services</li>
              <li>Process transactions and payments</li>
              <li>Verify user identity and account security</li>
              <li>Communicate with you about bookings, messages, and updates</li>
              <li>Personalize your experience and provide recommendations</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">4. Information Sharing</h2>
            <p className="text-[#6b6b6b] mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li><strong>Other Users:</strong> When you book or list a tool, we share relevant information with the other party (e.g., name, contact info for booking coordination)</li>
              <li><strong>Service Providers:</strong> Stripe for payments, Clerk for authentication, and other vendors who help operate our platform</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">5. Data Security</h2>
            <p className="text-[#6b6b6b] mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, 
              including encryption of sensitive data, secure storage, and regular security assessments. 
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">6. Your Rights</h2>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li>Object to processing of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">7. Cookies & Tracking</h2>
            <p className="text-[#6b6b6b] mb-4">
              We use cookies and similar technologies to enhance your experience, analyze site traffic, 
              and for security purposes. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">8. Third-Party Services</h2>
            <p className="text-[#6b6b6b] mb-4">
              Our platform uses third-party services including:
            </p>
            <ul className="list-disc list-inside text-[#6b6b6b] mb-4 space-y-1">
              <li><strong>Clerk:</strong> Authentication and user management</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Supabase:</strong> Database and storage</li>
              <li><strong>UploadThing:</strong> Image upload handling</li>
            </ul>
            <p className="text-[#6b6b6b] mb-4">
              Each third party has their own privacy policy governing their use of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-[#6b6b6b] mb-4">
              Our platform is not intended for children under 18. We do not knowingly collect 
              personal information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">10. Changes to This Policy</h2>
            <p className="text-[#6b6b6b] mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the &quot;last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">11. Contact Us</h2>
            <p className="text-[#6b6b6b] mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#6b6b6b]">
              Email: privacy@toolshare.example.com<br />
              Address: 123 ToolShare Way, San Francisco, CA 94102
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
