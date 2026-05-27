import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, Shield, Settings, LogOut, Truck, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { currentUser, login, logout } = useApp();

  const handleLoginAs = (role: 'user' | 'admin' | 'driver') => {
    login(role);
    toast.success(`Connecté en tant que ${role}`);
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-yellow-400 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Bienvenue</h1>
          <p className="text-gray-400">Veuillez choisir un profil pour continuer (Mode Démo)</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { role: 'user', label: 'Client', icon: UserCircle, color: 'hover:border-yellow-400' },
            { role: 'driver', label: 'Livreur', icon: Truck, color: 'hover:border-green-400' },
            { role: 'admin', label: 'Administrateur', icon: Shield, color: 'hover:border-blue-400' }
          ].map((type) => (
            <Button
              key={type.role}
              onClick={() => handleLoginAs(type.role as any)}
              variant="outline"
              className={`h-20 rounded-2xl border-white/5 bg-zinc-900/50 flex items-center justify-start gap-4 px-6 text-lg font-bold group transition-all ${type.color}`}
            >
              <type.icon className="w-8 h-8 text-gray-500 group-hover:text-white" />
              <div className="text-left">
                <p className="text-white">{type.label}</p>
                <p className="text-xs text-gray-500 font-normal uppercase tracking-widest">Accès démo</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900/50 p-8 rounded-[3rem] border border-white/5">
        <div className="w-32 h-32 bg-yellow-400 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-2xl shadow-yellow-400/20">
          <User className="w-16 h-16 text-black" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{currentUser.name}</h1>
            <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-black px-2 py-1 rounded-full border border-yellow-400/20 uppercase">
              {currentUser.role}
            </span>
          </div>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" /> {currentUser.email}
          </p>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4" /> {currentUser.phone}
          </p>
        </div>
        <Button onClick={logout} variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-2xl px-6">
          <LogOut className="mr-2 w-4 h-4" /> Déconnexion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-yellow-400 w-5 h-5" /> Paramètres Compte
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-2xl bg-black/30 hover:bg-black/50 transition-colors border border-white/5">
              Modifier le profil
            </button>
            <button className="w-full text-left p-4 rounded-2xl bg-black/30 hover:bg-black/50 transition-colors border border-white/5">
              Changer le mot de passe
            </button>
            <button className="w-full text-left p-4 rounded-2xl bg-black/30 hover:bg-black/50 transition-colors border border-white/5">
              Notifications
            </button>
          </div>
        </Card>

        <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Shield className="text-yellow-400 w-5 h-5" /> Sécurité
          </h3>
          <div className="space-y-4">
             <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <p className="text-sm text-green-500 font-medium">Authentification double facteur active</p>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed">
               Votre compte est protégé. Pour toute activité suspecte, veuillez contacter le support immédiatement.
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
}