import { Request, Response, Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { category } from "../types/types";

const categoryRouter = Router();

categoryRouter.get("/all", async (req: Request, res: Response) => {
  const categories = await CategoryController.getAllCategories();
  if (categories.status == true) {
    res.status(200).json(categories.payload);
  } else {
    res.status(400).json(categories.text);
  }
});

categoryRouter.get("/:name", async (req: Request, res: Response) => {
  const catName = req.params.name;

  const category = await CategoryController.getCategory(catName);
  if (category.status == true) {
    res.status(200).json(category.payload);
  } else {
    res.status(400).json(category.text);
  }
});

categoryRouter.post("/add", async (req: Request, res: Response) => {
  const cat: category = {
    name: req.body.name,
    color: req.body.color,
    image: req.body.image,
    icon: req.body.icon,
  };

  const myCategory = new CategoryController(cat);
  const category = await myCategory.createCategory();

  if (category.status == true) {
    res.status(200).json(category.text);
  } else {
    res.status(400).json(category.text);
  }
});

categoryRouter.delete("/delete/:name", async (req: Request, res: Response) => {
  const catName = req.params.name;

  const category = await CategoryController.deleteCategory(catName);
  if (category.status == true) {
    res.status(200).json(category.text);
  } else {
    res.status(400).json(category.text);
  }
});

categoryRouter.patch("/update", async (req: Request, res: Response) => {
  const cat: category = {
    name: req.body.name,
    color: req.body.color,
    image: req.body.image,
    icon: req.body.icon,
  };

  const category = await CategoryController.updateCategory(cat.name, cat);

  if (category.status == true) {
    res.status(200).json(category.text);
  } else {
    res.status(400).json(category.text);
  }
});

export default categoryRouter;
