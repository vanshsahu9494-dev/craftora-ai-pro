export type UserRole = "artisan" | "buyer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  joinDate: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  materials: string[];
  tags: string[];
  price: number;
  image: string;
  artisanId: string;
  artisanName: string;
  rating: number;
  reviewCount: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  ecoFriendly: boolean;
  handmade: boolean;
}

export interface Enquiry {
  id: string;
  productId: string;
  productName: string;
  buyerName: string;
  buyerEmail: string;
  message: string;
  artisanId: string;
  createdAt: string;
  status: "new" | "replied" | "closed";
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  artisanId: string;
  artisanName: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

export interface AIAnalysisResult {
  name: string;
  category: string;
  description: string;
  materials: string[];
  tags: string[];
  price: number;
  ecoFriendly: boolean;
  handmade: boolean;
}

export const CATEGORIES = [
  "Home Decor",
  "Handicrafts",
  "Fashion & Textiles",
  "Jewellery",
  "Woodwork",
  "Pottery & Ceramics",
  "Paintings & Art",
  "Others",
] as const;

export type Category = (typeof CATEGORIES)[number];
