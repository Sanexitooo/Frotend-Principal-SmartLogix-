import React from 'react';
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
    description: 'Conéctate con tus dispositivos de rastreo actuales sin configuraciones complejas.'
  },
  {
    icon: <User className="h-6 w-6 text-saas-orange" />,
    title: 'Gestión de Choferes',
    description: 'Controla turnos, licencias y asignaciones de todo tu personal desde un solo lugar.'
  },
  {
    icon: <Home className="h-6 w-6 text-saas-orange" />,
    title: 'Panel de Control',
    description: 'Visualiza el estado de tu flota con gráficos personalizados según tus necesidades.'
  },
  {
    icon: <Calendar className="h-6 w-6 text-saas-orange" />,
    title: 'Planificador de Rutas',
    description: 'Automatiza y optimiza los trayectos para ahorrar tiempo y reducir costos operativos.'
  },
  {
    icon: <Check className="h-6 w-6 text-saas-orange" />,
    title: 'Reportes de Entrega',
    description: 'Seguimiento detallado de cada despacho con confirmaciones digitales inmediatas.'
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-saas-black py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Funciones <span className="gradient-text">Potentes</span> para tu logística 
          </h2>
          <p className="text-gray-400">
            Optimiza tus operaciones y alcanza tus metas de transporte de manera más eficiente con SmartLogix.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-saas-darkGray p-6 rounded-xl border border-gray-800 hover:border-saas-orange/50 transition-all duration-300 card-shadow"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="bg-saas-orange/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;