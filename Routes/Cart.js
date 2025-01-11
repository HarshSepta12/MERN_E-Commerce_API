import express from "express";
import { addToCart, ClearCart, decreaseProudctQty, removeProductFromCart, userCart } from "../Controllers/Cart.js";
import { Authenticated } from "../Middlewares/auth.js";
const router = express.Router();

// add to cart
router.post('/add',Authenticated, addToCart);
// get User cart
router.get("/user",Authenticated, userCart);
// product remove from cart 
router.delete('/remove/:productId',Authenticated, removeProductFromCart);
//clear cart
router.delete('/clear',Authenticated, ClearCart);
// descrease item qty
router.post("/--qty",Authenticated, decreaseProudctQty);

export default router;