const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 4001;

app.use(express.json());

app.post('/orderConfirmation', (req, res) => {
  const { orderId, customerInfo, orderDetails } = req.body;

  if (!orderId || !customerInfo || !orderDetails) {
    return res.status(400).json({ message: 'Invalid order confirmation details' });
  }

  const { name, email } = customerInfo;
  const { items, totalAmount } = orderDetails;

  if (!name || !email || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'Invalid order confirmation details' });
  }

  const confirmationId = uuidv4();
  const confirmationDetails = {
    confirmationId,
    orderId,
    customerInfo,
    orderDetails,
    status: 'Order Confirmed',
    confirmedAt: new Date().toISOString()
  };

  res.json({ message: 'Order Confirmed', confirmationDetails });
});

app.listen(port, () => {
  console.log(`orderConfirmation service listening at http://localhost:${port}`);
});