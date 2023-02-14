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
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield CategoryController_1.default.getAllCategories();
    if (categories.status == true) {
        res.status(200).json(categories.payload);
    }
    else {
        res.status(400).json(categories.text);
    }
}));
categoryRouter.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catName = req.params.name;
    const category = yield CategoryController_1.default.getCategory(catName);
    if (category.status == true) {
        res.status(200).json(category.payload);
    }
    else {
        res.status(400).json(category.text);
    }
}));
categoryRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = {
        name: req.body.name,
        color: req.body.color,
        image: req.body.image,
        icon: req.body.icon,
    };
    const myCategory = new CategoryController_1.default(cat);
    const category = yield myCategory.createCategory();
    if (category.status == true) {
        res.status(200).json(category.text);
    }
    else {
        res.status(400).json(category.text);
    }
}));
categoryRouter.delete("/delete/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catName = req.params.name;
    const category = yield CategoryController_1.default.deleteCategory(catName);
    if (category.status == true) {
        res.status(200).json(category.text);
    }
    else {
        res.status(400).json(category.text);
    }
}));
categoryRouter.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = {
        name: req.body.name,
        color: req.body.color,
        image: req.body.image,
        icon: req.body.icon,
    };
    const category = yield CategoryController_1.default.updateCategory(cat.name, cat);
    if (category.status == true) {
        res.status(200).json(category.text);
    }
    else {
        res.status(400).json(category.text);
    }
}));
exports.default = categoryRouter;
