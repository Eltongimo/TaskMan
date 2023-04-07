const express = require('express');
const cors = require('cors');

const app = express();

// Define your API endpoint
app.get('/data', (req, res) => {
  const data = { foo: 'bar', baz: 'qux' };
  res.json(data);
});

app.post('/data', (req,res) => {
  console.log(req)
 res.json('form submitted')
})

// Start the server
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
