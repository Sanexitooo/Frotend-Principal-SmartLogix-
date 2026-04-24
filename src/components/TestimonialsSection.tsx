import React from 'react';

const testimonials = [
  {
    text: "Implementar SmartLogix cambió las reglas del juego para nuestro equipo. La interfaz es intuitiva y el monitoreo en tiempo real mejoró nuestra productividad significativamente.",
    author: "Krystian Reymond",
    position: "Gerente de Logística, Transportes Sur",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9U1CvvldfhYbQ1oWOFEosFwh8xpG3ft4ZJw&s"
  },
  {
    text: "El equipo de soporte de SmartLogix es excepcional. Han sido increíblemente receptivos y nos ayudaron a optimizar nuestro flujo de trabajo para sacar el máximo provecho.",
    author: "Fabian Cuevas",
    position: "Director de Operaciones, Logística Central",
    image: "https://img.lahora.cl/upload/2026/02/17161D524C43466D15100F55504940791F121D18534146731514-1200x800.webp"
  },
  {
    text: "Hemos probado varias plataformas antes, pero SmartLogix ofrece el equilibrio perfecto entre funcionalidad y facilidad de uso. Es esencial para nuestra operación diaria.",
    author: "Tomas Martinez",
    position: "Jefe de Flota, Manager",
    image: "https://media-front.elmostrador.cl/2022/05/124820758_pug1-210x210.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="bg-saas-black py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empresas que <span className="gradient-text">Confían</span> en Nosotros
          </h2>
          <p className="text-gray-400">
            No solo lo decimos nosotros. Esto es lo que nuestros clientes opinan sobre SmartLogix.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-saas-darkGray to-saas-black border border-gray-800 rounded-xl p-6 card-shadow"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-saas-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;