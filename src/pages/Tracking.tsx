import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Truck, Phone, Package, Clock, ShieldCheck } from 'lucide-react';
import { useApp, Order } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  const { orders } = useApp();
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(activeOrders[0] || null);
  const [position, setPosition] = useState({ lat: 5.3096, lng: -4.0127 });

  useEffect(() => {
    if (selectedOrder && selectedOrder.status !== 'pending') {
      const interval = setInterval(() => {
        setPosition(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedOrder]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'assigned': return 'Livreur assigné';
      case 'picked_up': return 'Colis récupéré';
      case 'in_transit': return 'En cours de livraison';
      case 'delivered': return 'Livré';
      default: return status;
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 relative overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter sticky top-0 bg-black py-2">
          Suivi en direct
        </h1>
        {activeOrders.length === 0 ? (
          <div className="bg-zinc-900 rounded-3xl p-8 text-center space-y-4">
            <Package className="w-12 h-12 text-gray-600 mx-auto" />
            <p className="text-gray-400">Aucune livraison en cours</p>
          </div>
        ) : (
          activeOrders.map(order => (
            <Card
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`p-4 rounded-[1.5rem] border-2 cursor-pointer transition-all ${
                selectedOrder?.id === order.id ? 'border-yellow-400 bg-yellow-400/5' : 'border-white/5 bg-zinc-900/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold uppercase text-[10px]">
                  #{order.id.slice(0, 5)}
                </Badge>
                <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-sm font-bold text-white truncate">{order.deliveryAddress}</p>
              <p className="text-xs text-gray-500 mt-1">{getStatusLabel(order.status)}</p>
            </Card>
          ))
        )}
      </div>

      {/* Map View Area */}
      <div className="flex-1 relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#0b0d10] opacity-50">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff0a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {selectedOrder ? (
          <>
            {/* Delivery Info Card overlay */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto md:w-[400px] z-20"
            >
              <Card className="bg-black/90 backdrop-blur-xl border border-yellow-500/30 rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                    <Truck className="text-black w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase">{getStatusLabel(selectedOrder.status)}</h3>
                    <p className="text-gray-400 text-sm">Arrivée estimée: 15-20 min</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-0.5 h-10 bg-zinc-800" />
                      <MapPin className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1 -mt-1">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Provenance</p>
                      <p className="text-sm text-white truncate">{selectedOrder.pickupAddress}</p>
                      <div className="h-4" />
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Destination</p>
                      <p className="text-sm text-white truncate">{selectedOrder.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-xl h-12"
                    onClick={() => window.location.href = `tel:${selectedOrder.phoneNumber}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white hover:text-black rounded-xl h-12">
                    Détails
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Mock Driver Marker */}
            <motion.div
              animate={{
                x: position.lng * 1000 % 100, // Just some mock movement logic
                y: position.lat * 1000 % 100
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20 scale-150" />
                <div className="relative w-12 h-12 bg-yellow-400 rounded-2xl shadow-lg border-2 border-black flex items-center justify-center transform -rotate-45">
                  <Truck className="text-black w-6 h-6 rotate-45" />
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
             <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center animate-pulse">
               <MapPin className="w-10 h-10 text-gray-600" />
             </div>
             <p className="text-gray-500 font-medium">Sélectionnez une commande pour voir le trajet</p>
          </div>
        )}
      </div>
    </div>
  );
}