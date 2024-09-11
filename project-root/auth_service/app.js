const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();



const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:9000'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8001;


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false });
  console.log('Database synced');
});
