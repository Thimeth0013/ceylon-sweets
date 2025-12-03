import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-[#2A1B12] min-h-screen text-[#FDF6E3]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-8">Terms of Service</h1>
        
        <div className="space-y-8 font-sans opacity-90 leading-relaxed text-justify">
          <p>Welcome to Ceylon Sweets. By accessing our website and placing an order, you agree to be bound by the following terms and conditions.</p>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">1. Orders and Acceptance</h2>
            <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">2. Pricing and Payment</h2>
            <p>Prices are listed in Sri Lankan Rupees (LKR). We reserve the right to change prices at any time without notice. Payment must be completed via bank transfer or cash on delivery as agreed upon confirmation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">3. Delivery</h2>
            <p>We aim to deliver within the estimated timeframes (2-3 days). However, delays may occur due to unforeseen circumstances. We are not liable for any loss or damage arising from delivery delays.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">4. Intellectual Property</h2>
            <p>All content on this website, including images, text, and logos, is the property of Ceylon Sweets and is protected by copyright laws.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;