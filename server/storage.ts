import {
  users, products, categories, orders, orderItems, cartItems, testimonials,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Category, type InsertCategory,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type CartItem, type InsertCartItem,
  type Testimonial, type InsertTestimonial,
  type ProductWithCategory, type CartItemWithProduct
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductsWithCategory(): Promise<ProductWithCategory[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getNewArrivals(limit?: number): Promise<Product[]>;
  getBestSellers(limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart methods
  getCartItems(userId?: number, sessionId?: string): Promise<CartItemWithProduct[]>;
  getCartItemById(id: number): Promise<CartItem | undefined>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(userId?: number, sessionId?: string): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  addOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private cartItems: Map<number, CartItem>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentCartItemId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.cartItems = new Map();
    this.testimonials = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentCartItemId = 1;
    this.currentTestimonialId = 1;
    
    this.seedData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getProductsWithCategory(): Promise<ProductWithCategory[]> {
    return Array.from(this.products.values()).map(product => {
      const category = product.categoryId ? this.categories.get(product.categoryId) || null : null;
      return { ...product, category };
    });
  }
  
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const featured = Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
    
    return limit ? featured.slice(0, limit) : featured;
  }
  
  async getNewArrivals(limit?: number): Promise<Product[]> {
    const newArrivals = Array.from(this.products.values()).filter(
      (product) => product.isNewProduct,
    );
    
    return limit ? newArrivals.slice(0, limit) : newArrivals;
  }
  
  async getBestSellers(limit?: number): Promise<Product[]> {
    const bestSellers = Array.from(this.products.values()).filter(
      (product) => product.isBestSeller,
    );
    
    return limit ? bestSellers.slice(0, limit) : bestSellers;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        (product.description && product.description.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  // Cart methods
  async getCartItems(userId?: number, sessionId?: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => (userId && item.userId === userId) || (sessionId && item.sessionId === sessionId),
    );
    
    return items.map(item => {
      const product = this.products.get(item.productId)!;
      return { ...item, product };
    });
  }
  
  async getCartItemById(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in cart
    const existingItems = Array.from(this.cartItems.values()).filter(
      (item) => 
        item.productId === insertCartItem.productId && 
        ((insertCartItem.userId && item.userId === insertCartItem.userId) || 
         (insertCartItem.sessionId && item.sessionId === insertCartItem.sessionId))
    );
    
    if (existingItems.length > 0) {
      const existingItem = existingItems[0];
      const updatedQuantity = existingItem.quantity + (insertCartItem.quantity || 1);
      return this.updateCartItemQuantity(existingItem.id, updatedQuantity) as Promise<CartItem>;
    }
    
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(userId?: number, sessionId?: string): Promise<boolean> {
    const items = Array.from(this.cartItems.values());
    
    for (const item of items) {
      if ((userId && item.userId === userId) || (sessionId && item.sessionId === sessionId)) {
        this.cartItems.delete(item.id);
      }
    }
    
    return true;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    
    this.orders.set(id, order);
    return order;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async addOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Seed initial data
  private seedData() {
    // Seed Categories
    const categories: InsertCategory[] = [
      {
        name: "Black Pepper",
        description: "The king of spices from Coorg's finest estates",
        slug: "black-pepper",
        imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9921cf"
      },
      {
        name: "Cardamom",
        description: "Fragrant green pods with intense flavor",
        slug: "cardamom",
        imageUrl: "https://images.unsplash.com/photo-1599421498111-ad70bebb5a6c"
      },
      {
        name: "Cinnamon",
        description: "Premium Ceylon cinnamon sticks",
        slug: "cinnamon",
        imageUrl: "https://images.unsplash.com/photo-1583865149747-67fb7a122dd1"
      },
      {
        name: "Cloves",
        description: "Aromatic whole cloves for intense flavor",
        slug: "cloves",
        imageUrl: "https://images.unsplash.com/photo-1599817093940-20cbde27a196"
      },
      {
        name: "Gift Collections",
        description: "Curated spice sets in elegant packaging",
        slug: "gift-collections",
        imageUrl: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d"
      }
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Seed Products
    const products: InsertProduct[] = [
      {
        name: "Premium Black Pepper",
        description: "Hand-picked from Coorg's finest estates",
        price: 350,
        discountPrice: 420,
        imageUrl: "https://images.unsplash.com/photo-1612100538881-e667468b570d",
        categoryId: 1,
        featured: true,
        inStock: true,
        weight: "100g",
        rating: 4.5,
        reviewCount: 142,
        slug: "premium-black-pepper",
        isNewProduct: false,
        isBestSeller: true
      },
      {
        name: "Green Cardamom Pods",
        description: "Aromatic pods with intense flavor notes",
        price: 480,
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1605197153361-1a187c396357",
        categoryId: 2,
        featured: true,
        inStock: true,
        weight: "50g",
        rating: 5.0,
        reviewCount: 98,
        slug: "green-cardamom-pods",
        isNewProduct: false,
        isBestSeller: false
      },
      {
        name: "Ceylon Cinnamon",
        description: "Premium Ceylon cinnamon sticks",
        price: 390,
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1583865149747-67fb7a122dd1",
        categoryId: 3,
        featured: true,
        inStock: true,
        weight: "75g",
        rating: 4.0,
        reviewCount: 65,
        slug: "ceylon-cinnamon",
        isNewProduct: true,
        isBestSeller: false
      },
      {
        name: "Whole Cloves",
        description: "Aromatic whole cloves for intense flavor",
        price: 320,
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1599817093940-20cbde27a196",
        categoryId: 4,
        featured: true,
        inStock: true,
        weight: "50g",
        rating: 4.5,
        reviewCount: 87,
        slug: "whole-cloves",
        isNewProduct: false,
        isBestSeller: false
      },
      {
        name: "Coorg Signature Collection",
        description: "A handcrafted wooden box containing our six signature spices, perfect for the discerning home chef.",
        price: 1499,
        discountPrice: 1899,
        imageUrl: "https://images.unsplash.com/photo-1608613527770-cb08bb7a67a9",
        categoryId: 5,
        featured: true,
        inStock: true,
        weight: "350g",
        rating: 4.8,
        reviewCount: 56,
        slug: "coorg-signature-collection",
        isNewProduct: false,
        isBestSeller: true
      },
      {
        name: "Chef's Essential Box",
        description: "A carefully curated selection of everyday spices for the passionate home cook.",
        price: 999,
        discountPrice: 1299,
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
        categoryId: 5,
        featured: true,
        inStock: true,
        weight: "250g",
        rating: 4.6,
        reviewCount: 42,
        slug: "chefs-essential-box",
        isNewProduct: false,
        isBestSeller: false
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
    
    // Seed Testimonials
    const testimonials: InsertTestimonial[] = [
      {
        customerName: "Priya Sharma",
        location: "Home Chef, Bangalore",
        rating: 5,
        comment: "The black pepper from WhitPepper Shop has completely transformed my cooking. The aroma and flavor are incomparable to anything I've used before!",
        profileImageUrl: "https://randomuser.me/api/portraits/women/62.jpg"
      },
      {
        customerName: "Rajiv Mehta",
        location: "Software Engineer, Mumbai",
        rating: 5,
        comment: "I gifted the Coorg Signature Collection to my mother, and she hasn't stopped raving about it. The packaging is beautiful, and the spices are incredibly fresh!",
        profileImageUrl: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      {
        customerName: "Meera Patel",
        location: "Tea Enthusiast, Delhi",
        rating: 4,
        comment: "The cardamom pods are simply outstanding! They've elevated my chai to a whole new level. I appreciate the sustainable packaging and quick delivery as well.",
        profileImageUrl: "https://randomuser.me/api/portraits/women/24.jpg"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
