import React from 'react';
import { motion } from 'framer-motion';
import { Check, Search, Settings, User, Home, Calendar } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-6 w-6 text-saas-orange" />,
    title: 'Análisis Inteligente',
    description: 'Monitorea el consumo de combustible y la eficiencia de tus rutas en tiempo real.'
  },
  {
    icon: <Settings className="h-6 w-6 text-saas-orange" />,
    title: 'Integración GPS',
    description: 'Conexión directa con dispositivos de rastreo sin configuraciones complejas.'
  },
  {
    icon: <User className="h-6 w-6 text-saas-orange" />,
    title: 'Gestión de Personal',
    description: 'Controla turnos, licencias y asignaciones desde una plataforma centralizada.'
  },
  {
    icon: <Home className="h-6 w-6 text-saas-orange" />,
    title: 'Panel de Control',
    description: 'Visualización del estado de la flota con métricas personalizadas.'
  },
  {
    icon: <Calendar className="h-6 w-6 text-saas-orange" />,
    title: 'Planificador de Rutas',
    description: 'Automatización de trayectos para ahorro de tiempo y reducción de costos.'
  },
  {
    icon: <Check className="h-6 w-6 text-saas-orange" />,
    title: 'Reportes de Entrega',
    description: 'Seguimiento detallado de despachos con confirmación digital inmediata.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-saas-black py-16 md:py-24 overflow-hidden">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Funciones <span className="text-saas-orange">Potentes</span> para logística 
          </h2>
          <p className="text-gray-400">
            Optimiza operaciones y alcanza metas de transporte de manera eficiente con SmartLogix.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-saas-darkGray p-8 rounded-2xl border border-gray-800 hover:border-saas-orange/40 transition-all duration-300 group shadow-lg"
            >
              <div className="bg-saas-orange/10 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;