const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Order from ${customer.name}`,
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
        <h2 style="color: #2A1B12; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Order Received!</h2>
        
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
}