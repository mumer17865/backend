const express = require("express");
const router = express.Router();
const bsecure = require("bsecure")(require("../config/config"));

router.post("/create-order", async (req, res) => {
  try {
    const token = await bsecure.authorize();
    let order = bsecure.Order;

    const { cartItems, info, subTotal, grandTotal } = req.body;

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty.");
    }
    // Map cartItems to the correct format expected by bSecure
    const products = cartItems.map((item) => ({
        id: item.productId.toString(),  // Ensure productId is correct and exists
        name: item.productName,  // Ensure productName is correct and exists
      sku: (item.productId + 1000).toString(),
      quantity: item.quantity,
        price: item.price/item.quantity,  // Ensure price is correct and greater than 0
        sale_price: item.price,  // Ensure sale_price is correct and greater than 0
      image: item.image,
      description: item.desc,
      short_description: item.desc,
    }));
    const customer = {
        name: info[0].name,
        email: info[0].email,
        country_code: "92",
        phone_number: info[0].contact,
        customer_address:
      {
        country: "Pakistan",
        province: "Sindh",
        city: "Karachi",
        area: "North Nazimabad Town",
        address: "House # C-3 Block T",
        zip_code: "75600",
      },
    };
      order.setOrderId(Math.random()*10000);
    order.setCharges({
      sub_total: grandTotal,
      discount: 0,
      total: grandTotal,
    });
    order.setCustomer(customer);
    order.setCartItems(products);

    order.setShipmentDetails({
      charges: 100,
      method_name: "Standard Shipping",
    });

    const result = await order.createOrder();
    const result1 = result.body.checkout_url;
    res.json({ result1 });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).send("Order creation failed");
  }
});



router.post('/order-status', async (req, res) => {
  try {
    const { orderRef } = req.body;

    if (!orderRef) {
      return res.status(400).json({ error: 'Missing order reference' });
    }

    let order = bsecure.OrderStatus;
    order.setOrderRef(orderRef);
    let result = await order.getStatus();

    res.json(result);
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({ error: 'Failed to fetch order status' });
  }
});


module.exports = router;