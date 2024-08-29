const products = require('../models/products');

exports.getAllProducts = (req, res) => {
  products.findAll()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while fetching products.' });
    });
};

exports.getProductById = (req, res) => {
  products.findAll({
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
