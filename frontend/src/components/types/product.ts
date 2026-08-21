export interface Product {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
}