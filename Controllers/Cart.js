import { Cart } from "../Models/Cart.js";

// AddToCart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() == productId
  );
  // console.log(itemIndex);

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ messsage: "Item added to cart", cart, success: true });
};

export const userCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    res.json({ message: "Cart not find...", success: false });
  }
  res.json({ message: "User Cart", cart, success: true });
};

export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    res.json({ message: "Cart not find...", success: false });
  }
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  res.json({ message: "Product Remove From Cart", cart, success: true });
  cart.save();
};

export const ClearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.json({ message: "cart cleared...", success: true });
};

// decrease qty from Cart
export const decreaseProudctQty = async (req, res) => {
     const { productId, qty} = req.body;
   
     const userId = req.user;
   
     let cart = await Cart.findOne({ userId });
    
     if (!cart) {
       cart = new Cart({ userId, items: [] });
       // return res.json({messge:'Cart not find'})
     }
   
     const itemIndex = cart.items.findIndex(
       (item) => item.productId.toString() === productId
     );
   
     if (itemIndex > -1) {
       const item = cart.items[itemIndex]
   
       if(item.qty > qty){
           const pricePerUnit = item.price/item.qty
           item.qty -= qty
           item.price -= pricePerUnit*qty
       }else{
           cart.items.splice(itemIndex,1)
       }
   
     } else {
       return res.json({messge:'invalid product Id'})
     } 
   
     await cart.save();
     res.json({ message: "Items qty decreased", cart });
   };



