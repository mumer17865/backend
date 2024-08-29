const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const order = require('./order');
const product = require('./product');

const orderdetails = sequelize.define('orderdetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: order,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: product,
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
order.hasMany(orderdetails, { foreignKey: 'orderId' });
orderdetails.belongsTo(order, { foreignKey: 'orderId' });

product.hasMany(orderdetails, { foreignKey: 'productId' });
orderdetails.belongsTo(product, { foreignKey: 'productId' });

module.exports = orderdetails;
