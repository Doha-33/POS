import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Alcohol',
  'Sides'
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Wagyu Burger',
    price: 18.50,
    category: 'Main Course',
    image: 'https://picsum.photos/seed/burger/400/400',
    stock: 45,
    description: 'Premium wagyu beef with truffle aioli and caramelized onions.'
  },
  {
    id: '2',
    name: 'Truffle Parmesan Fries',
    price: 8.00,
    category: 'Sides',
    image: 'https://picsum.photos/seed/fries/400/400',
    stock: 100,
    description: 'Hand-cut fries tossed in truffle oil and aged parmesan.'
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    price: 16.00,
    category: 'Main Course',
    image: 'https://picsum.photos/seed/pizza/400/400',
    stock: 30,
    description: 'Fresh buffalo mozzarella, basil, and San Marzano tomatoes.'
  },
  {
    id: '4',
    name: 'Caesar Salad',
    price: 12.50,
    category: 'Appetizers',
    image: 'https://picsum.photos/seed/salad/400/400',
    stock: 25,
    description: 'Crispy romaine, garlic croutons, and house-made dressing.'
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    price: 9.50,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/cake/400/400',
    stock: 15,
    description: 'Warm dark chocolate cake with a molten center.'
  },
  {
    id: '6',
    name: 'Iced Caramel Macchiato',
    price: 5.50,
    category: 'Beverages',
    image: 'https://picsum.photos/seed/coffee/400/400',
    stock: 200,
    description: 'Espresso with steamed milk and vanilla syrup.'
  },
  {
    id: '7',
    name: 'Old Fashioned',
    price: 14.00,
    category: 'Alcohol',
    image: 'https://picsum.photos/seed/cocktail/400/400',
    stock: 50,
    description: 'Bourbon, bitters, and orange peel.'
  },
  {
    id: '8',
    name: 'Grilled Salmon',
    price: 24.00,
    category: 'Main Course',
    image: 'https://picsum.photos/seed/salmon/400/400',
    stock: 12,
    description: 'Atlantic salmon with asparagus and lemon butter.'
  },
  {
    id: '9',
    name: 'Crispy Calamari',
    price: 13.50,
    category: 'Appetizers',
    image: 'https://picsum.photos/seed/calamari/400/400',
    stock: 20,
    description: 'Lightly battered squid with spicy marinara.'
  },
  {
    id: '10',
    name: 'New York Cheesecake',
    price: 8.50,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/cheesecake/400/400',
    stock: 8,
    description: 'Classic creamy cheesecake with berry compote.'
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    total: 45.50,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    paymentMethod: 'card'
  },
  {
    id: 'ORD-002',
    total: 12.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    paymentMethod: 'cash'
  },
  {
    id: 'ORD-003',
    total: 88.20,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    paymentMethod: 'card'
  }
];
