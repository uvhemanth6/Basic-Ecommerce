const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const populateOrder = (query) => {
  return query.populate("user", "name email").populate("products.product", "name description price stock");
};


const createOrder = async ({ user, products, status }) => {
  const existingUser = await User.findById(user);
  if (!existingUser) {
    throw createError("User not found", 404);
  }

  let totalAmount = 0;
  const orderProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw createError("Product not found", 404);
    }

    if (product.stock < item.quantity) {
      throw createError("Insufficient stock", 400);
    }

    totalAmount += product.price * item.quantity;
    orderProducts.push({
      product: product._id,
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    user,
    products: orderProducts,
    totalAmount,
    status,
  });

  for (const item of orderProducts) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  return populateOrder(Order.findById(order._id));
};

const getAllOrders = async () => {
  return populateOrder(Order.find().sort({ createdAt: -1 }));
};

const getOrderById = async (id) => {
  const order = await populateOrder(Order.findById(id));

  if (!order) {
    throw createError("Order not found", 404);
  }

  return order;
};

const updateOrderStatus = async (id, status) => {
  if (!status) {
    throw createError("Status is required", 400);
  }

  const order = await populateOrder(
    Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
  );

  if (!order) {
    throw createError("Order not found", 404);
  }

  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw createError("Order not found", 404);
  }

  return order;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
