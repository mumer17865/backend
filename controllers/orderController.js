const order = require('../models/order');
const orderdetails = require('../models/orderdetails');
const sequelize = require('../sequelize');

exports.checkout = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { cartItems, customerInfo, subTotal, grandTotal} = req.body;

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty.');
    }
    console.log(req.body);
    const orderData = {
      userId: customerInfo[0].id,
      name: customerInfo[0].name,
      email: customerInfo[0].email,
      contact: customerInfo[0].contact,
      total: subTotal,
      shippingAddress: customerInfo[0].address,
    };
    
    const createdOrder = await order.create(orderData, { transaction });

    const createdOrderId = createdOrder.dataValues?.id;

    const orderdetailsArray = cartItems.map(item => ({
      orderId: createdOrderId,
      productId: item.productId,
      unitPrice: item.price,
      quantity: item.quantity,
      subTotal: item.total
    }));

    const createdEntries = await orderdetails.bulkCreate(orderdetailsArray, { transaction });

    await transaction.commit();

    res.send({
      success: true,
      data: {
        orderdetails: createdEntries,
        order: createdOrder
      },
      message: 'Order placed successfully!'
    });
  } catch (error) {
    await transaction.rollback();
    res.send({
      success: false,
      message: error.message
    });
    console.log(error);
  }
};
