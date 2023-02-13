import Category from "../models/Category";
import { category, controllerResponse } from "../types/types";

export default class CategoryController {
  private myCategory: category;

  constructor(myCat: category) {
    this.myCategory = myCat;
  }

  // Create

  async createCategory(): Promise<controllerResponse> {
    try {
      const createdCategory = await Category.create({
        name: this.myCategory.name,
        color: this.myCategory.color,
        icon: this.myCategory.icon,
        image: this.myCategory.image,
      });
      if (createdCategory.name == this.myCategory.name) {
        const response: controllerResponse = {
          status: true,
          text: "Category Created Successfully",
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: "Can not create this category",
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not create this category, ${err}`,
      };
      return response;
    }
  }

  // Update

  static async updateCategory(
    catname: string,
    cat: category
  ): Promise<controllerResponse> {
    try {
      const updatedCategory = await Category.updateOne(
        { name: catname },
        {
          name: cat.name,
          color: cat.color,
          icon: cat.icon,
          image: cat.image,
        }
      );

      if (updatedCategory.modifiedCount == 1) {
        const response: controllerResponse = {
          status: true,
          text: "Category Updated Successfully",
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: true,
          text: "Can not update this category",
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not update this category, ${err}`,
      };
      return response;
    }
  }

  // Retrieve One

  static async getCategory(name: string): Promise<controllerResponse> {
    try {
      const category = await Category.findOne({ name: name });

      if (category?.name == name) {
        const response: controllerResponse = {
          status: true,
          text: "Category Retrieved Successfully",
          payload: category,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve this category`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not retrieve this category, ${err}`,
      };
      return response;
    }
  }

  // Retrieve All

  static async getAllCategories(): Promise<controllerResponse> {
    try {
      const categories: category[] = await Category.find(
        {},
        { _id: 0, __v: 0 }
      );

      if (categories) {
        const response: controllerResponse = {
          status: true,
          text: "Categories Retrieved Successfully",
          payload: categories,
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: false,
          text: `Can not retrieve this category`,
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not retrieve this category, ${err}`,
      };
      return response;
    }
  }

  // Delete

  static async deleteCategory(catname: string): Promise<controllerResponse> {
    try {
      const updatedCategory = await Category.deleteOne({ name: catname });

      if (updatedCategory.deletedCount == 1) {
        const response: controllerResponse = {
          status: true,
          text: "Category Deleted Successfully",
        };
        return response;
      } else {
        const response: controllerResponse = {
          status: true,
          text: "Can not delete this category",
        };
        return response;
      }
    } catch (err) {
      const response: controllerResponse = {
        status: false,
        text: `Can not delete this category, ${err}`,
      };
      return response;
    }
  }
}
