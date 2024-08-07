const express = require('express');
const app = express();
const port = 4006;

app.use(express.json());


app.get("/", (req,res)=>{
    res.send('{"response":"Payment Order success"}')
})

app.get("/test", (req,res)=>{
    res.send('{"response":"Payment Order test success"}')
})

const validationResult = (val) =>{
    const checkRes = val?.ammountPaid && val?.statusCode ===200;
    return checkRes;
}

app.post('/paymentConfirmation', (req, res) => {
// Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { transactionId, amount, currency, status } = req.body;

  // Process the payment confirmation (dummy processing in this case)
  if (status === 'success') {
    // Logic to update payment status in the database, etc.
    console.log(`Payment of ${amount} ${currency} with Transaction ID ${transactionId} was successful.`);
    
    // Send a success response
    res.status(200).json({ message: 'Payment confirmed successfully', transactionId, amount, currency, status });
  } else {
    // Logic to handle failed payment
    console.log(`Payment of ${amount} ${currency} with Transaction ID ${transactionId} failed.`);
    
    // Send a failure response
    res.status(400).json({ message: 'Payment confirmation failed', transactionId, amount, currency, status });
  }

});
  
app.listen(port, () => {
    console.log(`deliveryConfirmation service listening at http://localhost:${port}`);
});
module.exports = app;
