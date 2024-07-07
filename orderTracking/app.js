
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 4000;

app.use(express.json());

const orders = [
  {
    orderId: '12345',
    status: 'Shipped',
    items: [
      { itemName: 'Apple', quantity: 2 },
      { itemName: 'Banana', quantity: 3 }
    ],
    totalAmount: 15.00,
    deliveryDate: '2024-07-10'
  },
  {
    orderId: '67890',
    status: 'Delivered',
    items: [
      { itemName: 'Orange', quantity: 1 },
      { itemName: 'Grapes', quantity: 2 }
    ],
    totalAmount: 12.00,
    deliveryDate: '2024-07-05'
  }
];

app.get('/orderTracking/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({ message: 'Order Found', order });
});

app.post('/orderTracking', (req, res) => {
  const data = req.body;
  res.json({ message: 'Order Tracking', data: data });
})

app.listen(port, () => {
  console.log(`orderTracking service listening at http://localhost:${port}`);
});