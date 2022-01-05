require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require("./src/routes/routes");

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/app', routes)

mongoose.connect(process.env.URL, {
  useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.get('/', (req, res) => {
  res.send("on root route")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port  ${PORT}`)
})