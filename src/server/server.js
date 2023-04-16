const express = require('express')
const app = express()
const cors = require('cors')

app.use((req, res, next) => {
  res.header("Access-control-Allow-Origin", "*");
  res.header("Access-control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-control-Allow-Headers", "x-PINGOTHER,Content-Type,Authorization");
  app.use(cors());
  next();
});



app.post("/api", async (req, res) => {
    res.json({message: "Hello, you can post now!"})
});

app.get("/api", async (req, res) => {
  res.json({message: 'Hello, you can get now!'})
});

app.listen(3002, () => {
  console.log("Server is running on PORT 3002")
})