import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  packageType: string;
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';
  createdAt: string;
  driverId?: string;
  driverName?: string;
  coordinates?: { lat: number; lng: number };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'driver';
  phone: string;
}

interface AppContextType {
  orders: Order[];
  currentUser: User | null;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], driverId?: string, driverName?: string) => void;
  login: (role: User['role']) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_USERS: Record<User['role'], User> = {
  user: { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'user', phone: '+22501010101' },
  admin: { id: 'a1', name: 'Admin Go', email: 'admin@golivraison.com', role: 'admin', phone: '+22502020202' },
  driver: { id: 'd1', name: 'Moussa Driver', email: 'moussa@golivraison.com', role: 'driver', phone: '+22503030303' },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('go_livraison_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    const savedUser = localStorage.getItem('go_livraison_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('go_livraison_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('go_livraison_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const addOrder = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
      coordinates: { lat: 5.3096, lng: -4.0127 } // Abidjan default
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], driverId?: string, driverName?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, driverId: driverId || order.driverId, driverName: driverName || order.driverName } 
        : order
    ));
  };

  const login = (role: User['role']) => {
    setCurrentUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{ orders, currentUser, addOrder, updateOrderStatus, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}