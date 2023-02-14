"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const CategoryController_1 = __importDefault(require("./CategoryController"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class ProductController {
    constructor(p) {
        this.myProd = p;
        this.myProd.id = this.productIDGenerator(this.myProd);
    }
    // Product ID Generator
    productIDGenerator(p) {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const productID = p.name + p.category + p.dateCreated + randomNumber;
        const encodedID = crypto_js_1.default.enc.Base64.parse(productID).toString();
        return encodedID;
    }
    // Create
    createProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodCategory = yield CategoryController_1.default.getCategory(this.myProd.category);
                console.log(this.myProd.category);
                if (prodCategory.status == false) {
                    const response = {
                        status: false,
                        text: `Can not create this product, Invalid Category`,
                    };
                    return response;
                }
                const createdProduct = yield Product_1.default.create({
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
                    const response = {
                        status: true,
                        text: `Product Created Successfully`,
                        payload: createdProduct,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not create this product`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not create this product, ${err}`,
                };
                return response;
            }
        });
    }
    // Retrieve One
    static getProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find({ name: { $regex: name } });
                if (product) {
                    const response = {
                        status: true,
                        text: `Product Retrieved Successfully`,
                        payload: product,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not retrieve this product,`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not retrieve this product, ${err}`,
                };
                return response;
            }
        });
    }
    // Retrieve All
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Product_1.default.find();
                if (products) {
                    const response = {
                        status: true,
                        text: `Products Retrieved Successfully`,
                        payload: products,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not retrieve products`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not retrieve products, ${err}`,
                };
                return response;
            }
        });
    }
    // Retrieve By Category
    static getProductsByCategory(catName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodCategory = yield CategoryController_1.default.getCategory(catName);
                if (!prodCategory) {
                    const response = {
                        status: false,
                        text: `Can not retrieve products, Invalid Category`,
                    };
                    return response;
                }
                const products = yield Product_1.default.find({
                    category: { $regex: prodCategory.payload._id },
                });
                if (products) {
                    const response = {
                        status: true,
                        text: `Products Retrieved Successfully`,
                        payload: products,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not retrieve products`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not retrieve products, ${err}`,
                };
                return response;
            }
        });
    }
    // Update
    static updateProduct(prodId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ProductController = ProductController;
