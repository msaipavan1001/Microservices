const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

const approvedStores = ['StoreA', 'StoreB', 'StoreC'];

app.get('/',(req,res) =>{
    res.send("placeorder is ready")
    console.log("server ready")
})

app.post('/placeOrder', (req, res) => {
  const { store, items } = req.body;

  if (!store || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order details' });
  }

  if (!approvedStores.includes(store)) {
    return res.status(400).json({ message: 'Store not approved' });
  }

  const orderId = uuidv4();
  const orderConfirmation = {
    orderId,
    store,
    items,
    status: 'Order Placed'
  };

  res.json({ message: 'Order Placed', orderConfirmation });
});

app.listen(port, () => {
  console.log(`placeOrder service listening at http://localhost:${port}`);
});