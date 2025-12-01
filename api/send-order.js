import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customer, items, total, date } = req.body;

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Create items list for email
  const itemsList = items.map(item => 
    `${item.name}${item.variant ? ` - ${item.variant}` : ''} x${item.quantity} - LKR ${item.price * item.quantity}`
  ).join('\n');

  // ----- EMAIL 1: To Business Owner -----
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `🔔 New Order from ${customer.name}`,
    text: `
New Order Received!

Date: ${date}

Customer Details:
-----------------
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}

Order Items:
-----------------
${itemsList}

Total Amount: LKR ${total}

---
This is an automated order notification from Ceylon Sweets.
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FDF6E3;">
        <h2 style="color: #2A1B12; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">🔔 New Order Received!</h2>
        
        <p style="color: #5D4037;"><strong>Date:</strong> ${date}</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">Customer Details</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${customer.name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${customer.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> ${customer.address}</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-top: 0;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${items.map(item => `
              <tr style="border-bottom: 1px solid #E6DCC8;">
                <td style="padding: 10px 0;">${item.name}${item.variant ? ` - ${item.variant}` : ''}</td>
                <td style="padding: 10px 0; text-align: center;">x${item.quantity}</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold;">LKR ${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </table>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #D4AF37; text-align: right;">
            <span style="font-size: 20px; color: #2A1B12;"><strong>Total: LKR ${total}</strong></span>
          </div>
        </div>
        
        <p style="color: #8D6E63; font-size: 12px; text-align: center; margin-top: 30px;">
          This is an automated order notification from Ceylon Sweets.
        </p>
      </div>
    `
  };

  // ----- EMAIL 2: To Customer (Confirmation) -----
  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: customer.email,
    subject: `Order Confirmation - Ceylon Sweets`,
    text: `
Dear ${customer.name},

Thank you for your order at Ceylon Sweets!

Your Order Details:
-------------------
Order Date: ${date}

Items:
${itemsList}

Total: LKR ${total}

Delivery Address:
${customer.address}

We will contact you shortly at ${customer.phone} to confirm your order and arrange delivery.

If you have any questions, please reply to this email or call us at +94 77 123 4567.

Thank you for choosing Ceylon Sweets!

Best regards,
Ceylon Sweets Team
123 Temple Road, Ruwanwella, Sri Lanka
hello@ceylonsweets.lk
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FDF6E3;">
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #3D2817 0%, #5D4037 100%); border-radius: 8px 8px 0 0;">
          <h1 style="color: #E8B54D; margin: 0; font-size: 28px;">Ceylon Sweets</h1>
          <p style="color: #FDF6E3; margin: 10px 0 0 0;">Authentic Sri Lankan Sweetness</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #2A1B12; margin-top: 0;">Order Confirmed!</h2>
          
          <p style="color: #5D4037; font-size: 16px;">Dear ${customer.name},</p>
          
          <p style="color: #5D4037;">Thank you for your order! We're delighted to prepare your authentic Ceylon sweets.</p>
          
          <div style="background-color: #FDF6E3; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37;">
            <p style="margin: 5px 0; color: #5D4037;"><strong>Order Date:</strong> ${date}</p>
            <p style="margin: 5px 0; color: #5D4037;"><strong>Contact:</strong> ${customer.phone}</p>
          </div>
          
          <h3 style="color: #D4AF37; margin-top: 25px; margin-bottom: 15px;">Your Order</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${items.map(item => `
              <tr style="border-bottom: 1px solid #E6DCC8;">
                <td style="padding: 12px 5px; color: #2A1B12;">${item.name}${item.variant ? ` <span style="color: #8D6E63; font-size: 14px;">(${item.variant})</span>` : ''}</td>
                <td style="padding: 12px 5px; text-align: center; color: #5D4037;">×${item.quantity}</td>
                <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #2A1B12;">LKR ${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </table>
          
          <div style="margin-top: 20px; padding: 20px; background-color: #FDF6E3; border-radius: 8px; text-align: right;">
            <span style="font-size: 24px; color: #2A1B12; font-weight: bold;">Total: LKR ${total}</span>
          </div>
          
          <div style="background-color: #FFF9E6; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #E8B54D;">
            <h4 style="color: #D4AF37; margin-top: 0; margin-bottom: 10px;">📍 Delivery Address</h4>
            <p style="color: #5D4037; margin: 0;">${customer.address}</p>
          </div>
          
          <div style="background-color: #E8F5E9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p style="margin: 0; color: #2E7D32;"><strong>✓ What's Next?</strong></p>
            <p style="margin: 10px 0 0 0; color: #5D4037;">We'll contact you shortly at <strong>${customer.phone}</strong> to confirm your order and arrange delivery.</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E6DCC8; margin: 30px 0;">
          
          <p style="color: #8D6E63; font-size: 14px;">
            Questions? Reply to this email or call us at <strong style="color: #5D4037;">+94 77 123 4567</strong>
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #E6DCC8;">
            <p style="color: #2A1B12; font-weight: bold; margin: 5px 0;">Ceylon Sweets</p>
            <p style="color: #8D6E63; font-size: 13px; margin: 3px 0;">123 Temple Road, Ruwanwella, Sri Lanka</p>
            <p style="color: #8D6E63; font-size: 13px; margin: 3px 0;">📧 hello@ceylonsweets.lk | 📱 +94 77 123 4567</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);
    
    res.status(200).json({ 
      message: 'Order emails sent successfully',
      customerEmail: customer.email 
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send order emails' });
  }
}