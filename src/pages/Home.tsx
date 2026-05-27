import { motion } from 'framer-motion';
import { Truck, Shield, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden group">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9aca730c-6fcd-488d-971e-639a5ed40cac/hero-delivery-scooter-912a8728-1779790584539.webp"
          alt="Delivery Hero"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
              Rapide & Fiable
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter">
              Livraison <br />
              <span className="text-yellow-400">Express</span>
            </h1>
            <p className="text-gray-300 max-w-lg text-lg leading-relaxed">
              Vos colis livrés en un clin d'œil partout à Abidjan. Simple, rapide et sécurisé.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => navigate('/order')}
              size="lg"
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-black text-lg h-16 px-8 rounded-2xl group"
            >
              COMMANDER MAINTENANT
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white hover:text-black font-black text-lg h-16 px-8 rounded-2xl backdrop-blur-sm"
              onClick={() => window.location.href = 'tel:+2250161593190'}
            >
              <Phone className="mr-2" />
              APPELER
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Truck, title: 'Livraison Rapide', desc: 'Moins de 45 minutes pour vos livraisons urbaines.' },
          { icon: Shield, title: 'Sécurité Maximale', desc: 'Vos colis sont manipulés avec le plus grand soin.' },
          { icon: Clock, title: '24/7 Service', desc: 'Nous sommes à votre service à toute heure du jour.' }
        ].map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 hover:border-yellow-400/30 transition-all group"
          >
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12">
              <service.icon className="text-black w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3 text-white uppercase">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Tracking Callout */}
      <section className="bg-yellow-400 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase leading-[0.9]">
              Suivez votre colis <br /> en temps réel
            </h2>
            <p className="text-black/70 text-lg font-medium max-w-md">
              Grâce à notre technologie GPS avancée, sachez exactement où se trouve votre livreur à chaque instant.
            </p>
            <Button
              onClick={() => navigate('/tracking')}
              className="bg-black text-white hover:bg-zinc-800 font-bold px-8 h-14 rounded-2xl"
            >
              Ouvrir le tracking
            </Button>
          </div>
          <div className="flex-1 relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="relative z-10"
            >
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9aca730c-6fcd-488d-971e-639a5ed40cac/tracking-concept-102687eb-1779790580987.webp"
                alt="Tracking UI"
                className="w-full rounded-[2rem] shadow-2xl border-4 border-black/5"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}