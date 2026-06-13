import { Search, Settings, User, Home, Calendar, Check } from "lucide-react";
import type { ReactNode } from "react";

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: <Search className="h-6 w-6 text-saas-orange" />,
    title: "Analisis Inteligente",
    description: "Monitorea el consumo de combustible y la eficiencia de tus rutas en tiempo real.",
  },
  {
    icon: <Settings className="h-6 w-6 text-saas-orange" />,
    title: "Integracion GPS",
    description: "Conexion directa con dispositivos de rastreo sin configuraciones complejas.",
  },
  {
    icon: <User className="h-6 w-6 text-saas-orange" />,
    title: "Gestion de Personal",
    description: "Controla turnos, licencias y asignaciones desde una plataforma centralizada.",
  },
  {
    icon: <Home className="h-6 w-6 text-saas-orange" />,
    title: "Panel de Control",
    description: "Visualizacion del estado de la flota con metricas personalizadas.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-saas-orange" />,
    title: "Planificador de Rutas",
    description: "Automatizacion de trayectos para ahorro de tiempo y reduccion de costos.",
  },
  {
    icon: <Check className="h-6 w-6 text-saas-orange" />,
    title: "Reportes de Entrega",
    description: "Seguimiento detallado de despachos con confirmacion digital inmediata.",
  },
];
