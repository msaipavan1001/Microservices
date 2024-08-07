const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 4002;

app.use(express.json());

const orders = [
  {
    orderId: '12345',
    deliveryStatus: 'Delivered',
    deliveryDate: '2024-07-05',
    items: [
      { itemName: 'Apple', quantity: 2 },
      { itemName: 'Banana', quantity: 3 }
    ],
    totalAmount: 15.00,
    customerInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  },
  {
    orderId: '67890',
    deliveryStatus: 'In Transit',
    deliveryDate: '2024-07-10',
    items: [
      { itemName: 'Orange', quantity: 1 },
      { itemName: 'Grapes', quantity: 2 }
    ],
    totalAmount: 12.00,
    customerInfo: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    }
  }
];

app.get("/", (req,res)=>{
  res.send('{"response":"deliveryconfirmation success"}')
})

app.post('/deliveryConfirmation', (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const deliveryConfirmation = {
    orderId: order.orderId,
    deliveryStatus: order.deliveryStatus,
    deliveryDate: order.deliveryDate,
    items: order.items,
    totalAmount: order.totalAmount,
    customerInfo: order.customerInfo,
    confirmationId: uuidv4(),
    confirmedAt: new Date().toISOString()
  };

  res.json({ message: 'Delivery Confirmed', deliveryConfirmation });
});

app.listen(port, () => {
  console.log(`deliveryConfirmation service listening at http://localhost:${port}`);
});