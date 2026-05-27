import { useApp, Order } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Package, Truck, TrendingUp, Search, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { orders, updateOrderStatus, currentUser } = useApp();

  if (currentUser?.role !== 'admin') {
    return (
      <div className="py-20 text-center space-y-6">
        <h2 className="text-3xl font-black text-red-500 uppercase">Accès Refusé</h2>
        <p className="text-gray-400">Cette page est réservée aux administrateurs.</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Commandes', value: orders.length, icon: Package, color: 'text-yellow-400' },
    { label: 'Livreurs Actifs', value: 12, icon: Truck, color: 'text-blue-400' },
    { label: 'Utilisateurs', value: 145, icon: Users, color: 'text-purple-400' },
    { label: 'Revenus', value: '450k FCFA', icon: TrendingUp, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Tableau de Bord</h1>
          <p className="text-gray-400">Gestion globale des activités Go Livraison.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className="w-full bg-zinc-900 border border-white/5 rounded-xl h-12 pl-12 text-sm focus:outline-none focus:border-yellow-400/50"
            />
          </div>
          <Button className="bg-yellow-400 text-black font-bold h-12 rounded-xl">Exporter</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-zinc-900/50 border-white/5 rounded-[2rem] p-6 hover:border-yellow-400/20 transition-all group">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Commandes Récentes</h2>
        <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Trajet</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-yellow-400">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-300 truncate max-w-[200px]">{order.pickupAddress} → {order.deliveryAddress}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-zinc-800 text-yellow-400 uppercase text-[9px] font-black">{order.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}