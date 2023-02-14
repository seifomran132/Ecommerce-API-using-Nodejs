"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
