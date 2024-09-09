const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();



app.use(cors({
  origin: 'http://localhost:9000', // Dozvoli zahteve sa ove adrese (app_service)
  credentials: true,               // Dozvoli slanje kolačića (cookie) i zaglavlja sa identifikacijom
}));

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8001;


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false });
  console.log('Database synced');
});
