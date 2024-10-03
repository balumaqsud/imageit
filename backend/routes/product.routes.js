import express from "express";
import {
  getProducts,
  postProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", postProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

////
router.get("/", (req, res) => {
  res.send("app is ready");
});

export default router;
