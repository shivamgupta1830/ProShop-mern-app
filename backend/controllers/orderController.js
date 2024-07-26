import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//Private ----Create new order
//  POST/api/order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    console.log("22222222222222");

    const createdOrder = await order.save();
    console.log(createdOrder);
    console.log("1111111");
    res.status(201).json(createdOrder);
  }
});

//Private ---- logged in user's order by id
//  Get /api/order/mine

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user_id });
  res.status(200).json(orders);
});

//Private ---- logged in user's order by id
//  Get /api/order/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Private ----Update order to paid
//  Get/api/order/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.json("Update order to paid");
});

//Private  ---ADMIN----Update order to Delivered
//  Get/api/order/:id/pay
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("Update order to delivered");
});

//Private ---ADMIN ----get all order
//  Get/api/order/:id/pay
const getOrders = asyncHandler(async (req, res) => {
  res.json("Get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
