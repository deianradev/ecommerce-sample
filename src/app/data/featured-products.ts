import { Product } from '../models/product.model';

export const featuredIndoorPlants: Product[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    description: "Known for its dramatic split leaves, the Monstera is a classic beauty that adds tropical flair to any space.",
    price: 45.99,
    imageUrl: "assets/images/products/monstera-deliciosa.jpg",
    category: "indoor",
    careLevel: "easy",
    lightRequirement: "medium",
    inStock: true
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    description: "Trendy indoor tree with large, violin-shaped leaves.",
    price: 89.99,
    imageUrl: "assets/images/products/fiddle-leaf-fig.jpg",
    category: "indoor",
    careLevel: "medium",
    lightRequirement: "high",
    inStock: true
  },
  {
    id: 5,
    name: "Peace Lily",
    description: "Elegant white flowers and glossy leaves that purify the air.",
    price: 34.99,
    imageUrl: "assets/images/products/peace-lily.jpg",
    category: "indoor",
    careLevel: "easy",
    lightRequirement: "low",
    inStock: true
  }
];

export const featuredOutdoorPlants: Product[] = [
  {
    id: 7,
    name: "Hydrangea",
    description: "Beautiful flowering shrub with large, showy blooms.",
    price: 39.99,
    imageUrl: "assets/images/products/hydrangea.jpg",
    category: "outdoor",
    careLevel: "medium",
    lightRequirement: "medium",
    inStock: true
  },
  {
    id: 8,
    name: "Japanese Maple",
    description: "Elegant tree with delicate, colorful foliage.",
    price: 129.99,
    imageUrl: "assets/images/products/japanese-maple.jpg",
    category: "outdoor",
    careLevel: "medium",
    lightRequirement: "medium",
    inStock: true
  },
  {
    id: 9,
    name: "Lavender",
    description: "Fragrant herb with beautiful purple blooms.",
    price: 24.99,
    imageUrl: "assets/images/products/lavender.jpg",
    category: "outdoor",
    careLevel: "easy",
    lightRequirement: "high",
    inStock: true
  }
];

export const featuredSucculents: Product[] = [
  {
    id: 3,
    name: "Echeveria Succulent",
    description: "Beautiful rosette-forming succulent with blue-green leaves.",
    price: 12.99,
    imageUrl: "assets/images/products/echeveria-succulent.jpg",
    category: "succulent",
    careLevel: "easy",
    lightRequirement: "high",
    inStock: true
  },
  {
    id: 10,
    name: "String of Pearls",
    description: "Trailing succulent with delicate bead-like leaves.",
    price: 19.99,
    imageUrl: "assets/images/products/string-of-pearls.jpg",
    category: "succulent",
    careLevel: "easy",
    lightRequirement: "medium",
    inStock: true
  },
  {
    id: 11,
    name: "Jade Plant",
    description: "Classic succulent known for its thick, woody stems and oval leaves.",
    price: 24.99,
    imageUrl: "assets/images/products/jade-plant.jpg",
    category: "succulent",
    careLevel: "easy",
    lightRequirement: "high",
    inStock: true
  }
];