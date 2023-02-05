const express = require('express');
const data = require('./data');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to db.'))
  .catch(() => console.log('Error in connecting to db.'));

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String
  })
);

app.get('/api/products/seed', async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.get('/api/categories', (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
