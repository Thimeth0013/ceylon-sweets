import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="bg-[#2A1B12] min-h-screen text-[#FDF6E3]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-8">Return & Refund Policy</h1>
        
        <div className="space-y-8 font-sans opacity-90 leading-relaxed text-justify">
          <p>We take great pride in the quality of our traditional sweets. If you are not completely satisfied with your purchase, here is how we can help.</p>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">1. Perishable Goods</h2>
            <p>Due to the perishable nature of our products (food items), we generally do not accept returns. However, if your order arrives damaged or incorrect, please contact us within 24 hours of delivery.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">2. Refunds and Replacements</h2>
            <p>If you receive a damaged or spoiled item, please send us photographic evidence via WhatsApp or Email. We will assess the issue and offer a replacement or a full refund for the affected items.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#E8B54D] mb-4">3. Cancellations</h2>
            <p>Orders can be cancelled within 2 hours of placement. Since our sweets are prepared fresh to order, cancellations made after preparation has begun may not be eligible for a full refund.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;