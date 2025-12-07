import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
}));

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  total: 0,

  addItem: (product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(
      (item) => item.product_id === product.product_id
    );

    let updatedItems;
    if (existingItem) {
      updatedItems = currentItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...currentItems, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
    get().calculateTotal();
  },

  removeItem: (productId) => {
    const updatedItems = get().items.filter(
      (item) => item.product_id !== productId
    );
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
    get().calculateTotal();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const updatedItems = get().items.map((item) =>
      item.product_id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
    get().calculateTotal();
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [], total: 0 });
  },

  calculateTotal: () => {
    const total = get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ total });
  },
}));
