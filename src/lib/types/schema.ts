export type UserRole = 'admin' | 'manager' | 'staff';

export interface UserProfile {
  id: string; // Firebase Auth UID
  email: string;
  role: UserRole;
  createdAt: number; // Unix timestamp
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  status: 'active' | 'inactive' | 'lead';
  orders: number;
  lifetimeValue: string; // Stored as formatted string or number
  createdAt: number;
}

export interface Product {
  id: string; // Document ID
  name: string;
  sku: string;
  categoryId?: string;
  uomId?: string; // Unit of Measure
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  lowStockThreshold: number;
  createdAt: number;
  updatedAt: number;
}

export type OrderType = 'purchase_order' | 'sales_order';
export type OrderStatus = 'draft' | 'confirmed' | 'fulfilled' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; // quantity * unitPrice
}

export interface Order {
  id: string; // Document ID
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string; // User ID
}
