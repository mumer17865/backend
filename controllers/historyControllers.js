const sequelize = require('../sequelize');
const orderDetails = require('../models/orderDetails');
const getHistory = (req, res) => {

  sequelize.query(
    `SELECT 
        orderDetails.*, 
        products.image, 
        products.productName
     FROM 
        orderDetails
     INNER JOIN 
        products 
     ON 
        orderDetails.productId = products.productId
     WHERE 
        orderDetails.orderId IN (
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
