import express from "express";
import { AddProduct, DeleteProductById, getProducts, getProductsById, updateProduct } from "../Controllers/Product.js";
const router = express.Router(); 

// Add product
router.post('/add', AddProduct);
//get all product
router.get('/all', getProducts);
//get specific product by id
router.get('/:id', getProductsById)
// update product
router.put("/:id", updateProduct);
// delete product
router.delete("/:id", DeleteProductById);
export default router