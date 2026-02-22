export type Category = 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages' | 'Alcohol' | 'Sides';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'split';
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
  tableNumber?: string;
  waiterName?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'cashier' | 'waiter';
  avatar: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  lowStockItems: number;
}
