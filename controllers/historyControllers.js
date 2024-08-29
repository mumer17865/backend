const sequelize = require('../sequelize');
const orderdetails = require('../models/orderdetails');
const getHistory = (req, res) => {

  sequelize.query(
    `SELECT 
        orderdetails.*, 
        products.image, 
        products.productName
     FROM 
        orderdetails
     INNER JOIN 
        products 
     ON 
        orderdetails.productId = products.productId
     WHERE 
        orderdetails.orderId IN (
          SELECT
            orders.id
          FROM 
            orders
          WHERE 
            orders.userId = :userId )`,
    {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT
    }
  )
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the order details.' });
  });
};

module.exports = { getHistory};
