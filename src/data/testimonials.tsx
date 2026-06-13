export interface Testimonial {
  text: string;
  author: string;
  position: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "Implementar SmartLogix cambió las reglas del juego para nuestro equipo. La interfaz es intuitiva y el monitoreo en tiempo real mejoró nuestra productividad significativamente.",
    author: "Krystian Reymond",
    position: "Gerente de Logística",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9U1CvvldfhYbQ1oWOFEosFwh8xpG3ft4ZJw&s",
  },
  {
    text: "El equipo de soporte de SmartLogix es excepcional. Han sido increíblemente receptivos y nos ayudaron a optimizar nuestro flujo de trabajo para sacar el máximo provecho.",
    author: "Fabian Cuevas",
    position: "Director de Operaciones",
    image: "https://img.lahora.cl/upload/2026/02/17161D524C43466D15100F55504940791F121D18534146731514-1200x800.webp",
  },
  {
    text: "Hemos probado varias plataformas antes, pero SmartLogix ofrece el equilibrio perfecto entre funcionalidad y facilidad de uso. Es esencial para nuestra operación diaria.",
    author: "Tomas Martinez",
    position: "Jefe de Flota",
    image: "https://media-front.elmostrador.cl/2022/05/124820758_pug1-210x210.jpg",
  },
];
