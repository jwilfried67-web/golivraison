import { motion } from 'framer-motion';
import { Package, Clock, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

export default function History() {
  const { orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Historique</h1>
          <p className="text-gray-400 mt-2">Retrouvez toutes vos livraisons passées.</p>
        </div>
        <Badge className="bg-zinc-800 text-gray-400 px-4 py-1.5 rounded-full border-white/5">
          {orders.length} Commandes
        </Badge>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-16 text-center space-y-4">
            <Package className="w-20 h-20 text-zinc-800 mx-auto" />
            <h3 className="text-xl font-bold text-gray-500">Aucune commande trouvée</h3>
            <p className="text-gray-600">Commencez par passer votre première commande !</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-yellow-400/30 rounded-[2rem] p-6 transition-all flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0">
                {order.status === 'delivered' ? (
                  <CheckCircle2 className="text-green-500 w-8 h-8" />
                ) : (
                  <Clock className="text-yellow-400 w-8 h-8" />
                )}
              </div>

              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                  <span className="text-gray-500 text-xs font-mono">#{order.id.toUpperCase()}</span>
                  <Badge className={`uppercase font-black text-[10px] px-2.5 py-0.5 border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                  <span className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <p className="text-white font-bold truncate max-w-[200px] md:max-w-md">
                    {order.pickupAddress} <span className="text-yellow-400 px-2">→</span> {order.deliveryAddress}
                  </p>
                </div>
              </div>

              <button className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}