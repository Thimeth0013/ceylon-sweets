import fetch from 'node-fetch';

const test = async () => {
  const res = await fetch('http://localhost:3000/api/send-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '0710000000',
        address: 'Test Address'
      },
      items: [
        { name: 'Chocolate Cake', variant: '1kg', quantity: 2, price: 2000 },
        { name: 'Watalappan', quantity: 1, price: 500 }
      ],
      total: 4500,
      date: new Date().toLocaleString()
    })
  });

  const data = await res.json();
  console.log(data);
};

test();
