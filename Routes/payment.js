import express from "express";
import { AllOrders, checkout, userOrder, verify } from "../Controllers/payment.js";
import {Authenticated} from "../Middlewares/auth.js"
const router = express.Router();

//checkout payment
router.post("/checkout", checkout);

//verify payment and save to db
router.post("/verify-payment", verify);

//User Order
router.get("/userorder",Authenticated, userOrder);


//All Order
router.get("/orders", AllOrders);
export default router;
