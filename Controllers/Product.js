import { Products } from "../Models/Product.js";

//Add Product
export const AddProduct = async (req, res) => {
  const { title, require, description, price, category, qty, imgSrc } =
    req.body;

  try {
    let Product = await Products.create({
      title,
      require,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.json({
      message: "Product Added Successfully..",
      Product,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const getProducts = async (req, res) => {
  let product = await Products.find().sort({ createdAt: -1 });
  res.json({ message: "All Products", product, success: true });
};

//get Product by id
export const getProductsById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) return res.json({ message: "Invalid id", success: false });
  res.json({ message: "Specific Products", product, success: true });
};

// update product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id, req.body, {new:true});
  if (!product)
    return res.json({
      message: "Product not exist for update...",
      success: false,
    });
    res.json({message: "Product Has Been Updated", product , success: true});
};


export const DeleteProductById = async (req, res) => {
     const id = req.params.id;
     let product = await Products.findByIdAndDelete(id, req.body);
     if(!product) return res.json({message: "Product Not Exist...", success: false});
     res.json({message: "Product has been deleted...", product, success: true});
}