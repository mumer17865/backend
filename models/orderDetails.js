const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const orders = require('./orders');
const products = require('./products');

const orderDetails = sequelize.define('orderDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: orders,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: products,
      key: 'productId',  
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  unitPrice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
orders.hasMany(orderDetails, { foreignKey: 'orderId' });
orderDetails.belongsTo(orders, { foreignKey: 'orderId' });

products.hasMany(orderDetails, { foreignKey: 'productId' });
orderDetails.belongsTo(products, { foreignKey: 'productId' });

module.exports = orderDetails;
