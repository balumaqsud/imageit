import Product from "../models/prodoct.model.js";
import mongoose from "mongoose";

///////////////////////////////////////////
export const getProducts = async (req, res) => {
  const products = await Product.find({});

  try {
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
///////////////////////////////////////////
export const postProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res.status(400).json({ message: "plase fill in all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(200)
      .json({ message: "product is created successfully", data: newProduct });
  } catch (error) {
    console.log(error);
  }
};
///////////////////////////////////////////
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Checking if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product is not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "product is deleted succesfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong, or product not found",
    });
  }
};
///////////////////////////////////////////
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  console.log("Received ID:", id);

  // Checking if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Checking if the product data is provided (PATCH allows partial updates,
  //so no need to check for all fields)
  if (!product || Object.keys(product).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide data to update" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    // Handle case where product is not found
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error" });
  }
};
