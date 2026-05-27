import { useApp, Order } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, CheckCircle, Navigation, Package, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';

export default function DriverDashboard() {
  const { orders, updateOrderStatus, currentUser } = useApp();

  if (currentUser?.role !== 'driver') {
    return (
      <div className="py-20 text-center space-y-6">
        <h2 className="text-3xl font-black text-red-500 uppercase">Accès Refusé</h2>
        <p className="text-gray-400">Cette page est réservée aux livreurs.</p>
      </div>
    );
  }

  const availableOrders = orders.filter(o => o.status === 'pending');
  const myOrders = orders.filter(o => o.driverId === currentUser.id && o.status !== 'delivered');

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'assigned', currentUser.id, currentUser.name);
    toast.success('Commande acceptée !');
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast.info(`Statut mis à jour: ${status}`);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Espace Livreur</h1>
        <p className="text-gray-400">Gérez vos livraisons en cours et trouvez de nouvelles missions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Active Tasks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-tighter flex items-center gap-2">
            <Truck className="w-6 h-6" /> Mes Missions ({myOrders.length})
          </h2>
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                <p className="text-gray-500">Aucune mission en cours</p>
              </div>
            ) : (
              myOrders.map(order => (
                <Card key={order.id} className="bg-zinc-900 border-yellow-400/30 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-yellow-400 text-black font-black uppercase tracking-widest text-[10px]">
                      #{order.id.slice(0, 5)} - {order.status}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => window.location.href = `tel:${order.phoneNumber}`}>
                      <Phone className="w-5 h-5 text-yellow-400" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ramassage</p>
                        <p className="text-white font-bold">{order.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                        <Navigation className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Livraison</p>
                        <p className="text-white font-bold">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    {order.status === 'assigned' && (
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'picked_up')}
                        className="flex-1 bg-white text-black hover:bg-gray-200 font-black rounded-xl h-12"
                      >
                        Colis Récupéré
                      </Button>
                    )}
                    {order.status === 'picked_up' && (
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'in_transit')}
                        className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 font-black rounded-xl h-12"
                      >
                        En Route
                      </Button>
                    )}
                    {order.status === 'in_transit' && (
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="flex-1 bg-green-500 text-white hover:bg-green-600 font-black rounded-xl h-12"
                      >
                        Marquer Livré
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Marketplace */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
            <Package className="w-6 h-6" /> Disponibles ({availableOrders.length})
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {availableOrders.map(order => (
              <Card key={order.id} className="bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all rounded-[2rem] p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Posté à {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <span className="text-yellow-400 font-black text-sm">2,500 FCFA</span>
                </div>
                <div className="mb-6">
                   <p className="text-sm text-gray-400">De: <span className="text-white font-bold">{order.pickupAddress}</span></p>
                   <p className="text-sm text-gray-400">À: <span className="text-white font-bold">{order.deliveryAddress}</span></p>
                </div>
                <Button 
                  onClick={() => handleAcceptOrder(order.id)}
                  className="w-full bg-zinc-800 text-white hover:bg-yellow-400 hover:text-black font-black rounded-xl transition-all"
                >
                  Accepter la course
                </Button>
              </Card>
            ))}
            {availableOrders.length === 0 && (
              <p className="text-gray-500 text-center py-12">Aucune nouvelle course disponible pour le moment.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}