const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3001;

app.use(express.json());

const approvedStores = ['StoreA', 'StoreB', 'StoreC'];

app.get('/',(req,res) =>{
    res.send("weborder is ready")
    console.log("server ready")
})


app.post('/webOrder', (req, res) => {
  const { store, customerInfo, items } = req.body;

  if (!store || !customerInfo || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order details' });
  }

  if (!approvedStores.includes(store)) {
    return res.status(400).json({ message: 'Store not approved' });
  }

  const { name, email } = customerInfo;
  if (!name || !email) {
    return res.status(400).json({ message: 'Invalid customer details' });
  }

  const orderId = uuidv4();
  const orderConfirmation = {
    orderId,
    store,
    customerInfo,
    items,
    status: 'Order Placed',
    placedAt: new Date().toISOString()
  };

  res.json({ message: 'Order Placed', orderConfirmation });
});

app.listen(port, () => {
  console.log(`webOrder service listening at http://localhost:${port}`);
});