const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();
app.use(express.json());

// Dodajemo rute za kategorije
app.use('/categories', categoryRoutes);
app.use('/coffees', coffeeRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
