const Product = require("../models/Product");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};


const createProduct = async (productData) => {
  return Product.create(productData);
};

const getAllProducts = async () => {
  return Product.find().sort({ createdAt: -1 });
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw createError("Product not found", 404);
  }

  return product;
};

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw createError("Product not found", 404);
  }

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw createError("Product not found", 404);
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
