require('./config/dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
const app = express();
const verifyToken = require('./middlewares/authMiddleware');


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/getHistory', require('./routes/historyRoutes'));
app.use(require('./routes/bsecureAuth'));
app.use(require('./routes/bsecureOrderRoutes'));


app.get('/authenticated', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Access granted' });
});

sequelize.sync()
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });
