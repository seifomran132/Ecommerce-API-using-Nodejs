import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/ProductController";
import { product } from "../types/types";

const productRouter = Router();

productRouter.post("/add", async (req: Request, res: Response) => {
  const {
    name,
    description,
    richDescription,
    brand,
    image,
    images,
    category,
    numOfReviews,
    stock,
    price,
    rating,
    isFeatured,
  } = req.body;

  const myProduct: product = {
    name,
    description,
    richDescription,
    brand,
    image,
    images,
    category,
    numOfReviews,
    stock,
    price,
    rating,
    isFeatured,
  };

  const prod = new ProductController(myProduct);
  const createdProduct = await prod.createProduct();

  if (createdProduct.status == true) {
    res.status(200).json(createdProduct.payload);
  } else {
    res.status(400).json(createdProduct.text);
  }
});

export default productRouter;
