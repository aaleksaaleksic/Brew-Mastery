const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const addonRoutes = require('./routes/addonRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:9000', credentials: true }));

require('dotenv').config();
app.use(express.json());

// Dodajemo rute za kategorije
app.use('/categories', categoryRoutes);
app.use('/coffees', coffeeRoutes);
app.use('/orders', orderRoutes);
app.use('/addons', addonRoutes);
app.use('/promotions', promotionRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
