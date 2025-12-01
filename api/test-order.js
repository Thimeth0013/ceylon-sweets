// Simple test file - can be deleted after testing
const test = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '0710000000',
          address: 'Test Address, Colombo'
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
    console.log('Response:', data);
  } catch (error) {
    console.error('Test failed:', error);
  }
};

test();