import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//razorpay.orders.all().then(console.log).catch(console.error);

export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  let options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt ${Date.now}`,
  };
  const order = await razorpay.orders.create(options);
  res.json({
    orderId: order.id,
    amount: amount,
    cartItems: cartItems,
    userShipping: userShipping,
    userId: userId,
    payStatus: "Created",
  });
};

//verify payment and save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;
  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });
  res.json({ message: "Payment Successfull...", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
  res.json(orders);
};

//User Specific order
export const AllOrders = async (req, res) => {
  let orders = await Payment.find().sort();
  res.json(orders);
};
