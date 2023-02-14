import Product from "../models/Product";
import { controllerResponse, product } from "../types/types";
import CategoryController from "./CategoryController";
import crypto from "crypto-js";

export class ProductController {
  private myProd: product;

  constructor(p: product) {
    this.myProd = p;
    this.myProd.id = this.productIDGenerator(this.myProd);
  }

  // Product ID Generator

  private productIDGenerator(p: product): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const productID: string =
      p.name + p.category + p.dateCreated + randomNumber;

    const encodedID = crypto.enc.Base64.parse(productID).toString();
    return encodedID;
  }

  // Create

  async createProduct(): Promise<controllerResponse> {
    try {
      const prodCategory = await CategoryController.getCategory(
        this.myProd.category
      );
      console.log(this.myProd.category);

      if (prodCategory.status == false) {
        const response: controllerResponse = {
          status: false,
          text: `Can not create this product, Invalid Category`,
        };
        return response;
      }

      const createdProduct = await Product.create({
        id: this.myProd.id,
        name: this.myProd.name,
        description: this.myProd.description,
        richDescription: this.myProd.richDescription,
        brand: this.myProd.brand,
        stock: this.myProd.stock,
        price: this.myProd.price,
        image: this.myProd.image,
        images: this.myProd.images,
        category: prodCategory.payload._id,
        rating: this.myProd.rating,
        numOfReviews: this.myProd.numOfReviews,
        isFeatured: this.myProd.isFeatured,
      });

      if (createdProduct) {
        const response: controllerResponse = {
          status: true,
          text: `Product Created Successfully`,
          payload: createdProduct,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not create this product`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not create this product, ${err}`,
      };
      return response;
    }
  }

  // Retrieve One

  static async getProduct(name: string): Promise<controllerResponse> {
    try {
      const product = await Product.find({ name: { $regex: name } });

      if (product) {
        const response: controllerResponse = {
          status: true,
          text: `Product Retrieved Successfully`,
          payload: product,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve this product,`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not retrieve this product, ${err}`,
      };
      return response;
    }
  }

  // Retrieve All

  static async getAllProducts(): Promise<controllerResponse> {
    try {
      const products = await Product.find();

      if (products) {
        const response: controllerResponse = {
          status: true,
          text: `Products Retrieved Successfully`,
          payload: products,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve products`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not retrieve products, ${err}`,
      };
      return response;
    }
  }

  // Retrieve By Category

  static async getProductsByCategory(
    catName: string
  ): Promise<controllerResponse> {
    try {
      const prodCategory = await CategoryController.getCategory(catName);

      if (!prodCategory) {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve products, Invalid Category`,
        };
        return response;
      }

      const products = await Product.find({
        category: { $regex: prodCategory.payload._id },
      });

      if (products) {
        const response: controllerResponse = {
          status: true,
          text: `Products Retrieved Successfully`,
          payload: products,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve products`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not retrieve products, ${err}`,
      };
      return response;
    }
  }

  // Update

  static async updateProduct(prodId: string) {}

  // Delete
}
