const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const order = require('./order');
const product = require('./product');

const orderDetails = sequelize.define('orderDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
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
order.hasMany(orderDetails, { foreignKey: 'orderId' });
orderDetails.belongsTo(order, { foreignKey: 'orderId' });

product.hasMany(orderDetails, { foreignKey: 'productId' });
orderDetails.belongsTo(product, { foreignKey: 'productId' });

module.exports = orderDetails;
