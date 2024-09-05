const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8001;


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false });
  console.log('Database synced');
});
