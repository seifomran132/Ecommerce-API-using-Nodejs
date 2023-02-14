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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const productRouter = (0, express_1.Router)();
productRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, richDescription, brand, image, images, category, numOfReviews, stock, price, rating, isFeatured, } = req.body;
    const myProduct = {
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
    const prod = new ProductController_1.ProductController(myProduct);
    const createdProduct = yield prod.createProduct();
    if (createdProduct.status == true) {
        res.status(200).json(createdProduct.payload);
    }
    else {
        res.status(400).json(createdProduct.text);
    }
}));
exports.default = productRouter;
