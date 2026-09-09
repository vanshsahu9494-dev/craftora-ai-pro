import type { User, Product, Enquiry, Order } from "@/types/craftora";

const STORAGE_KEYS = {
  USER: "craftora_user",
  PRODUCTS: "craftora_products",
  ENQUIRIES: "craftora_enquiries",
  ORDERS: "craftora_orders",
} as const;

// --- Users ---
export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// --- Products ---
export function getProducts(): Product[] {
  const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (raw) return JSON.parse(raw);
  // Initialize with demo products
  const demo = getDemoProducts();
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(demo));
  return demo;
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

// --- Enquiries ---
export function getEnquiries(): Enquiry[] {
  const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
  if (raw) return JSON.parse(raw);
  const demo = getDemoEnquiries();
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(demo));
  return demo;
}

export function saveEnquiry(enquiry: Enquiry): void {
  const enquiries = getEnquiries();
  enquiries.push(enquiry);
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
}

// --- Orders ---
export function getOrders(): Order[] {
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (raw) return JSON.parse(raw);
  const demo = getDemoOrders();
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(demo));
  return demo;
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// --- Demo Data ---
function getDemoProducts(): Product[] {
  return [
    {
      id: "demo-1",
      name: "Handwoven Bamboo Basket",
      category: "Handicrafts",
      description:
        "Beautiful handcrafted bamboo basket made by skilled rural artisans. Perfect for home decor and storage. Durable, eco-friendly, and aesthetically pleasing.",
      materials: ["Bamboo", "Natural Fiber"],
      tags: ["Eco-Friendly", "Handmade", "Home Decor", "Storage"],
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1595158299241-06a7ca6e2e16?w=400&h=400&fit=crop",
      artisanId: "artisan-demo",
      artisanName: "Ramesh Kumar",
      rating: 4.8,
      reviewCount: 24,
      published: true,
      createdAt: "2026-09-01T10:00:00Z",
      updatedAt: "2026-09-01T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-2",
      name: "Terracotta Vase",
      category: "Pottery & Ceramics",
      description:
        "Elegant terracotta vase handcrafted using traditional pottery techniques. Features intricate hand-painted designs inspired by Indian folk art.",
      materials: ["Terracotta Clay", "Natural Pigments"],
      tags: ["Handmade", "Traditional", "Decorative", "Folk Art"],
      price: 850,
      image:
        "https://images.unsplash.com/photo-1612196808214-b7e239e5f6dc?w=400&h=400&fit=crop",
      artisanId: "artisan-demo",
      artisanName: "Sita Devi",
      rating: 4.6,
      reviewCount: 18,
      published: true,
      createdAt: "2026-08-28T10:00:00Z",
      updatedAt: "2026-08-28T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-3",
      name: "Wooden Elephant Figurine",
      category: "Woodwork",
      description:
        "Intricately carved wooden elephant made from sustainable Sheesham wood. A stunning piece of Indian craftsmanship that adds elegance to any space.",
      materials: ["Sheesham Wood", "Natural Polish"],
      tags: ["Handmade", "Sustainable", "Gift", "Decorative"],
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      artisanId: "artisan-demo",
      artisanName: "Vikram Singh",
      rating: 4.9,
      reviewCount: 32,
      published: true,
      createdAt: "2026-08-25T10:00:00Z",
      updatedAt: "2026-08-25T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-4",
      name: "Handloom Silk Dupatta",
      category: "Fashion & Textiles",
      description:
        "Exquisite handloom silk dupatta with intricate woven patterns. Each piece is unique, reflecting centuries-old weaving traditions of India.",
      materials: ["Pure Silk", "Natural Dyes"],
      tags: ["Handwoven", "Luxury", "Fashion", "Traditional"],
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      artisanId: "artisan-demo",
      artisanName: "Lakshmi weaving Co.",
      rating: 4.7,
      reviewCount: 15,
      published: true,
      createdAt: "2026-08-20T10:00:00Z",
      updatedAt: "2026-08-20T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-5",
      name: "Brass Diya Lamp",
      category: "Home Decor",
      description:
        "Traditional brass diya lamp crafted by skilled metalworkers. Perfect for pooja rooms, home decor, and festive celebrations.",
      materials: ["Brass", "Hand-forged"],
      tags: ["Traditional", "Religious", "Festive", "Handmade"],
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1590075865003-e4867dfa7665?w=400&h=400&fit=crop",
      artisanId: "artisan-demo-2",
      artisanName: "Arjun Metalworks",
      rating: 4.5,
      reviewCount: 20,
      published: true,
      createdAt: "2026-08-18T10:00:00Z",
      updatedAt: "2026-08-18T10:00:00Z",
      ecoFriendly: false,
      handmade: true,
    },
    {
      id: "demo-6",
      name: "Madhubani Painting",
      category: "Paintings & Art",
      description:
        "Authentic Madhubani painting created using natural dyes and traditional techniques. Depicts a vibrant village scene with intricate patterns.",
      materials: ["Handmade Paper", "Natural Dyes", "Plant-based Colors"],
      tags: ["Folk Art", "Traditional", "Wall Decor", "Authentic"],
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
      artisanId: "artisan-demo-3",
      artisanName: "Gond Art Collective",
      rating: 4.9,
      reviewCount: 28,
      published: true,
      createdAt: "2026-08-15T10:00:00Z",
      updatedAt: "2026-08-15T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-7",
      name: "Silver Jhumka Earrings",
      category: "Jewellery",
      description:
        "Sterling silver jhumka earrings with intricate filigree work. Handcrafted by tribal artisans using traditional jewellery-making techniques.",
      materials: ["Sterling Silver", "Glass Beads"],
      tags: ["Handmade", "Tribal", "Fashion", "Accessories"],
      price: 1600,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      artisanId: "artisan-demo-4",
      artisanName: "Tribal Silver Co.",
      rating: 4.8,
      reviewCount: 22,
      published: true,
      createdAt: "2026-08-12T10:00:00Z",
      updatedAt: "2026-08-12T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
    {
      id: "demo-8",
      name: "Block Print Cushion Cover",
      category: "Home Decor",
      description:
        "Hand block-printed cushion cover using traditional Rajasthani techniques. Each piece is unique with natural dyes and organic cotton.",
      materials: ["Organic Cotton", "Natural Dyes"],
      tags: ["Handblock", "Rajasthani", "Eco-Friendly", "Home Textile"],
      price: 750,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
      artisanId: "artisan-demo",
      artisanName: "Ramesh Kumar",
      rating: 4.4,
      reviewCount: 12,
      published: true,
      createdAt: "2026-08-10T10:00:00Z",
      updatedAt: "2026-08-10T10:00:00Z",
      ecoFriendly: true,
      handmade: true,
    },
  ];
}

function getDemoEnquiries(): Enquiry[] {
  return [
    {
      id: "enq-demo-1",
      productId: "demo-1",
      productName: "Handwoven Bamboo Basket",
      buyerName: "Priya Mehta",
      buyerEmail: "priya@example.com",
      message:
        "Hi, I am interested in buying this basket in bulk for my home decor store. Can you offer a wholesale price?",
      artisanId: "artisan-demo",
      createdAt: "2026-09-05T14:00:00Z",
      status: "new",
    },
    {
      id: "enq-demo-2",
      productId: "demo-3",
      productName: "Wooden Elephant Figurine",
      buyerName: "John Walker",
      buyerEmail: "john@example.com",
      message:
        "Beautiful craftsmanship! Do you ship internationally? I would like to order 3 pieces for my office decor.",
      artisanId: "artisan-demo",
      createdAt: "2026-09-04T09:00:00Z",
      status: "replied",
    },
  ];
}

function getDemoOrders(): Order[] {
  return [
    {
      id: "ord-demo-1",
      productId: "demo-2",
      productName: "Terracotta Vase",
      productImage:
        "https://images.unsplash.com/photo-1612196808214-b7e239e5f6dc?w=400&h=400&fit=crop",
      buyerId: "buyer-demo-1",
      buyerName: "Anita Sharma",
      artisanId: "artisan-demo",
      artisanName: "Sita Devi",
      quantity: 2,
      total: 1700,
      status: "shipped",
      createdAt: "2026-09-02T11:00:00Z",
    },
    {
      id: "ord-demo-2",
      productId: "demo-5",
      productName: "Brass Diya Lamp",
      productImage:
        "https://images.unsplash.com/photo-1590075865003-e4867dfa7665?w=400&h=400&fit=crop",
      buyerId: "buyer-demo-2",
      buyerName: "Raj Patel",
      artisanId: "artisan-demo-2",
      artisanName: "Arjun Metalworks",
      quantity: 5,
      total: 7500,
      status: "delivered",
      createdAt: "2026-08-30T10:00:00Z",
    },
  ];
}
