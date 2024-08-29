const product = require('../models/product');

exports.getAllProducts = (req, res) => {
  product.findAll()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while fetching products.' });
    });
};

exports.getProductById = (req, res) => {
  product.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while fetching the product.' });
    });
};
