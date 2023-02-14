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
const Category_1 = __importDefault(require("../models/Category"));
class CategoryController {
    constructor(myCat) {
        this.myCategory = myCat;
    }
    // Create
    createCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdCategory = yield Category_1.default.create({
                    name: this.myCategory.name,
                    color: this.myCategory.color,
                    icon: this.myCategory.icon,
                    image: this.myCategory.image,
                });
                if (createdCategory.name == this.myCategory.name) {
                    const response = {
                        status: true,
                        text: "Category Created Successfully",
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: "Can not create this category",
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not create this category, ${err}`,
                };
                return response;
            }
        });
    }
    // Update
    static updateCategory(catname, cat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield Category_1.default.updateOne({ name: catname }, {
                    name: cat.name,
                    color: cat.color,
                    icon: cat.icon,
                    image: cat.image,
                });
                if (updatedCategory.modifiedCount == 1) {
                    const response = {
                        status: true,
                        text: "Category Updated Successfully",
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: "Can not update this category",
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not update this category, ${err}`,
                };
                return response;
            }
        });
    }
    // Retrieve One
    static getCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield Category_1.default.findOne({ name: name });
                console.log(category);
                if (category) {
                    const response = {
                        status: true,
                        text: "Category Retrieved Successfully",
                        payload: category,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not retrieve this category`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not retrieve this category, ${err}`,
                };
                return response;
            }
        });
    }
    // Retrieve All
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category_1.default.find({}, { _id: 0, __v: 0 });
                if (categories) {
                    const response = {
                        status: true,
                        text: "Categories Retrieved Successfully",
                        payload: categories,
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: `Can not retrieve this category`,
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not retrieve this category, ${err}`,
                };
                return response;
            }
        });
    }
    // Delete
    static deleteCategory(catname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield Category_1.default.deleteOne({ name: catname });
                if (updatedCategory.deletedCount == 1) {
                    const response = {
                        status: true,
                        text: "Category Deleted Successfully",
                    };
                    return response;
                }
                else {
                    const response = {
                        status: false,
                        text: "Can not delete this category",
                    };
                    return response;
                }
            }
            catch (err) {
                const response = {
                    status: false,
                    text: `Can not delete this category, ${err}`,
                };
                return response;
            }
        });
    }
}
exports.default = CategoryController;
