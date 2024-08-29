const sequelize = require('../sequelize');
const orderdetails = require('../models/orderdetails');
const getHistory = (req, res) => {

  sequelize.query(
    `SELECT 
        orderdetails.*, 
        Products.image, 
        Products.productName
     FROM 
        orderdetails
     INNER JOIN 
        Products 
     ON 
        orderdetails.productId = Products.productId
     WHERE 
        orderdetails.orderId IN (
          SELECT
            Orders.id
          FROM 
            Orders
          WHERE 
            Orders.userId = :userId )`,
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
