// Local-first database adapter — mimics Firestore CRUD API using localStorage
// This means all existing page code works unchanged.

import { Customer, Product, Order } from "@/lib/types/schema";

function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getCollection<T>(name: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`synocre_${name}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCollection<T>(name: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`synocre_${name}`, JSON.stringify(data));
}

// --- Users (Auth session) ---
export const getSession = (): { uid: string; email: string } | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("synocre_session");
  return raw ? JSON.parse(raw) : null;
};

export const setSession = (user: { uid: string; email: string }) => {
  localStorage.setItem("synocre_session", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("synocre_session");
};

// --- Customers ---
export const getCustomers = async (): Promise<Customer[]> => {
  return getCollection<Customer>("customers");
};

export const createCustomer = async (customerData: Omit<Customer, "id">): Promise<string> => {
  const customers = getCollection<Customer>("customers");
  const newCustomer: Customer = { ...customerData as any, id: generateId(), createdAt: Date.now() };
  customers.push(newCustomer);
  saveCollection("customers", customers);
  return newCustomer.id;
};

// --- Products ---
export const getProducts = async (): Promise<Product[]> => {
  return getCollection<Product>("products");
};

export const createProduct = async (productData: Omit<Product, "id">): Promise<string> => {
  const products = getCollection<Product>("products");
  const newProduct: Product = { ...productData as any, id: generateId() };
  products.push(newProduct);
  saveCollection("products", products);
  return newProduct.id;
};

export const updateProductStock = async (productId: string, newStock: number): Promise<void> => {
  const products = getCollection<Product>("products");
  const idx = products.findIndex(p => p.id === productId);
  if (idx !== -1) {
    products[idx].currentStock = newStock;
    saveCollection("products", products);
  }
};

// --- Orders ---
export const getOrders = async (): Promise<Order[]> => {
  return getCollection<Order>("orders");
};

export const createOrder = async (orderData: Omit<Order, "id">): Promise<string> => {
  const orders = getCollection<Order>("orders");
  const newOrder: Order = { ...orderData as any, id: generateId() };
  orders.push(newOrder);
  saveCollection("orders", orders);
  return newOrder.id;
};

export const receivePurchaseOrder = async (orderId: string): Promise<void> => {
  const orders = getCollection<Order>("orders");
  const order = orders.find(o => o.id === orderId);

  if (!order) throw new Error("Order not found");
  if (order.type !== "purchase_order") throw new Error("Not a purchase order");
  if (order.status === "fulfilled") throw new Error("Already received");

  // Update stock for each line item
  const products = getCollection<Product>("products");
  for (const item of order.items) {
    const idx = products.findIndex(p => p.id === item.productId);
    if (idx !== -1) {
      products[idx].currentStock = (products[idx].currentStock || 0) + item.quantity;
    }
  }
  saveCollection("products", products);

  // Mark order as fulfilled
  const orderIdx = orders.findIndex(o => o.id === orderId);
  orders[orderIdx].status = "fulfilled";
  orders[orderIdx].updatedAt = Date.now();
  saveCollection("orders", orders);
};
