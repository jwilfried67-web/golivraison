import { motion } from 'framer-motion';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Home, Package, MapPin, History, User, ShieldCheck, Truck, LogOut } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/order', icon: Package, label: 'Commander' },
    { to: '/tracking', icon: MapPin, label: 'Suivi' },
    { to: '/history', icon: History, label: 'Historique' },
    { to: '/profile', icon: User, label: 'Profil' },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ to: '/admin', icon: ShieldCheck, label: 'Admin' });
  }
  if (currentUser?.role === 'driver') {
    navItems.push({ to: '/driver', icon: Truck, label: 'Livreur' });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-yellow-500/20 pb-safe md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around items-center h-16 md:justify-between">
          <Link to="/" className="hidden md:flex items-center gap-2 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Truck className="text-black w-6 h-6" />
            </div>
            <span className="text-yellow-400 font-black text-xl tracking-tighter uppercase">Go Livraison</span>
          </Link>

          <div className="flex justify-around flex-1 md:flex-initial md:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 transition-all ${
                    isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-200'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Salut, <span className="text-yellow-400 font-bold">{currentUser.name}</span></span>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-400 hover:text-yellow-400">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/profile')} className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-xl px-6">
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}