const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const orders = require('./orders');
const products = require('./products');

const orderdetails = sequelize.define('orderdetails', {
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
orders.hasMany(orderdetails, { foreignKey: 'orderId' });
orderdetails.belongsTo(orders, { foreignKey: 'orderId' });

products.hasMany(orderdetails, { foreignKey: 'productId' });
orderdetails.belongsTo(products, { foreignKey: 'productId' });

module.exports = orderdetails;
