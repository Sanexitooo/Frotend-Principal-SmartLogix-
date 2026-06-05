export interface SiiCode {
  codigo: string;
  nombre: string;
}

export const codigosSII: SiiCode[] = [
  { codigo: "011101", nombre: "CULTIVO DE TRIGO" },
  { codigo: "011102", nombre: "CULTIVO DE MAÍZ" },
  { codigo: "011103", nombre: "CULTIVO DE AVENA" },
  { codigo: "011104", nombre: "CULTIVO DE CEBADA" },
  { codigo: "011105", nombre: "CULTIVO DE OTROS CEREALES" },
  { codigo: "011306", nombre: "CULTIVO DE HORTALIZAS Y MELONES" },
  { codigo: "016100", nombre: "ACTIVIDADES DE APOYO A LA AGRICULTURA" },
];
