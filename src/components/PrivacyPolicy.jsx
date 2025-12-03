import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#2A1B12] min-h-screen text-[#FDF6E3]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 font-sans opacity-90 leading-relaxed text-justify">
          <p>At Ceylon Sweets, we value your trust and are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you place an order, including your name, delivery address, phone number, and email address. We do not store payment card details on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">2. How We Use Your Information</h2>
            <p>We use your information solely for processing orders, delivery updates, and improving our service. We may send occasional promotional emails if you have opted in, which you can unsubscribe from at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">3. Data Security</h2>
            <p>We implement strict security measures to protect your personal data. We do not sell, trade, or rent your personal identification information to others.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at hello@ceylonsweets.lk.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;