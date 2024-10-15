export interface ProductType {
  id: number;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
  author: string;
}

export interface ErrorType{
error: string
}

export interface ProductState {
  products: ProductType[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  products: ProductState;
}

export interface FormType{
  email: string;
  username: string;
  password: string;
}