import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black pb-20 md:pb-0 md:pt-16">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}