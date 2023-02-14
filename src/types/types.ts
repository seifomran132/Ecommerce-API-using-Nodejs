type category = {
  name: string;
  color?: string;
  icon?: string;
  image: string;
};
type product = {
  id?: string;
  name: string;
  description: string;
  richDescription?: string;
  brand: string;
  image: string;
  images?: string[];
  category: string;
  numOfReviews: number;
  stock: number;
  price: number;
  rating?: number;
  isFeatured?: boolean;
  dateCreated?: Date;
};

type user = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
};

type controllerResponse = {
  status: boolean;
  text: string;
  payload?: any;
};

export { category, product, user, controllerResponse };
