export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'indoor' | 'outdoor' | 'succulent';
  careLevel: 'easy' | 'medium' | 'advanced';
  lightRequirement: 'low' | 'medium' | 'high';
  inStock: boolean;
}