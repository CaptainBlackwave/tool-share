import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - ToolShare",
  description: "Get in touch with the ToolShare team for support, inquiries, or feedback.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-16 max-w-4xl">
        <h1 className="text-4xl text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Contact Us
        </h1>
        
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 space-y-8">
          <p className="text-[#6b6b6b] text-lg">
            We&apos;d love to hear from you! Whether you have a question about our platform, need help, 
            or want to provide feedback, our team is here to help.
          </p>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">General Inquiries</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Email</h3>
                <p className="text-[#6b6b6b]">hello@toolshare.example.com</p>
                <p className="text-[#6b6b6b] text-sm">We typically respond within 24 hours</p>
              </div>
              <div className="bg-[#faf9f7] p-4 rounded-lg">
                <h3 className="font-medium text-[#222] mb-2">Phone</h3>
                <p className="text-[#6b6b6b]">1-800-TOOL-SHARE</p>
                <p className="text-[#6b6b6b] text-sm">Mon-Fri, 9am-6pm PT</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Support Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-[#d4d0c8] p-4 rounded-lg hover:border-[#e85d04] transition-colors">
                <h3 className="font-medium text-[#222]">Account & Billing</h3>
                <p className="text-[#6b6b6b] text-sm mt-2">
                  Questions about your account, payment methods, or billing issues.
                </p>
                <p className="text-[#e85d04] text-sm mt-2">billing@toolshare.example.com</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg hover:border-[#e85d04] transition-colors">
                <h3 className="font-medium text-[#222]">Technical Support</h3>
                <p className="text-[#6b6b6b] text-sm mt-2">
                  Issues with the website, app, or technical problems.
                </p>
                <p className="text-[#e85d04] text-sm mt-2">support@toolshare.example.com</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg hover:border-[#e85d04] transition-colors">
                <h3 className="font-medium text-[#222]">Partnerships</h3>
                <p className="text-[#6b6b6b] text-sm mt-2">
                  Business inquiries, partnerships, or vendor opportunities.
                </p>
                <p className="text-[#e85d04] text-sm mt-2">partners@toolshare.example.com</p>
              </div>
              <div className="border border-[#d4d0c8] p-4 rounded-lg hover:border-[#e85d04] transition-colors">
                <h3 className="font-medium text-[#222]">Press & Media</h3>
                <p className="text-[#6b6b6b] text-sm mt-2">
                  Media inquiries, press releases, and interview requests.
                </p>
                <p className="text-[#e85d04] text-sm mt-2">press@toolshare.example.com</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#222] mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222] mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">Category</label>
                <select className="w-full px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] bg-white">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Account Issue</option>
                  <option>Report a Problem</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Our Headquarters</h2>
            <div className="bg-[#faf9f7] p-4 rounded-lg">
              <p className="text-[#222] font-medium">ToolShare Inc.</p>
              <p className="text-[#6b6b6b]">123 ToolShare Way</p>
              <p className="text-[#6b6b6b]">San Francisco, CA 94102</p>
            </div>
          </section>

          <section className="bg-[#f0ede8] rounded-lg p-6">
            <h2 className="text-xl font-medium text-[#1a1a1a] mb-4">Need Immediate Help?</h2>
            <p className="text-[#6b6b6b] mb-4">
              For urgent issues or emergencies, please note that for immediate emergencies, 
              you should always contact local emergency services (911) first.
            </p>
            <p className="text-[#6b6b6b]">
              Our support team is available Mon-Fri, 9am-6pm Pacific Time.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}