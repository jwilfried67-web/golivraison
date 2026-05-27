import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, User, Phone, Send, Info } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Order() {
  const { addOrder, currentUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    phoneNumber: currentUser?.phone || '',
    pickupAddress: '',
    deliveryAddress: '',
    packageType: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phoneNumber || !formData.pickupAddress || !formData.deliveryAddress) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    addOrder(formData);
    toast.success('Commande passée avec succès !');
    navigate('/history');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-yellow-400 uppercase tracking-tighter">Passer une commande</h1>
        <p className="text-gray-400">Remplissez les détails ci-dessous pour une livraison rapide.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Nom Complet</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 h-14 rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20"
                placeholder="Votre nom"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 h-14 rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20"
                placeholder="+225 ..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Adresse de ramassage</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <Input
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 h-14 rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20"
                placeholder="Où récupérer le colis ?"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Adresse de destination</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              <Input
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 h-14 rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20"
                placeholder="Où livrer le colis ?"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Type de colis</Label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                value={formData.packageType}
                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 h-14 rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20"
                placeholder="Ex: Documents, Vêtements, Nourriture"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Notes Additionnelles (Optionnel)</Label>
            <div className="relative">
              <Info className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="pl-12 bg-black/50 border-white/10 min-h-[120px] rounded-2xl focus:border-yellow-400 focus:ring-yellow-400/20 pt-4"
                placeholder="Indications pour le livreur..."
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-16 rounded-2xl font-black text-xl uppercase tracking-tighter"
        >
          Valider la commande
          <Send className="ml-2 w-6 h-6" />
        </Button>
      </motion.form>
      
      <div className="text-center">
        <p className="text-gray-500 mb-4">Besoin d'aide ?</p>
        <Button
          variant="ghost"
          onClick={() => window.location.href = 'tel:+2250161593190'}
          className="text-yellow-400 hover:text-yellow-300 font-bold text-lg"
        >
          <Phone className="mr-2" />
          Appeler le +225 01 61 59 31 90
        </Button>
      </div>
    </div>
  );
}