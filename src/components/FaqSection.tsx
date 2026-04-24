import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo funciona la prueba gratuita?",
    answer: "Nuestra prueba gratuita te da acceso total a todas las funciones de SmartLogix durante 14 días. No requiere tarjeta de crédito. Al finalizar, puedes elegir el plan que mejor se adapte a tu flota o cancelar sin cargos."
  },
  {
    question: "¿Puedo cambiar mi plan más adelante?",
    answer: "¡Absolutamente! Puedes subir, bajar o cambiar tu plan en cualquier momento. Los cambios se verán reflejados automáticamente en tu próximo ciclo de facturación."
  },
  {
    question: "¿Hay algún costo de instalación?",
    answer: "No, no hay costos de configuración ni cargos ocultos en ninguno de nuestros planes. Solo pagas el precio de suscripción publicado según el tamaño de tu operación."
  },
  {
    question: "¿Ofrecen soluciones personalizadas para empresas corporativas?",
    answer: "Sí, ofrecemos soluciones a medida adaptadas a necesidades logísticas complejas. Contacta a nuestro equipo de ventas para discutir tus requerimientos técnicos y obtener una cotización personalizada."
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer: "Ofrecemos soporte vía email para todos los planes. El plan Profesional incluye soporte prioritario, mientras que los clientes Corporativos disfrutan de soporte 24/7 y un gerente de cuenta dedicado."
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer: "Sí, puedes cancelar tu suscripción cuando quieras desde tu panel de control. Si cancelas, seguirás teniendo acceso a la plataforma hasta que termine tu periodo de facturación actual."
  }
];

const FaqSection = () => {
  return (
    <div className="bg-saas-black py-16 md:py-24 border-t border-gray-800">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-gray-400">
            Encuentra respuestas a las dudas comunes sobre SmartLogix. Si no encuentras lo que buscas, no dudes en contactar a nuestro equipo de soporte técnico.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-saas-darkGray rounded-xl p-6 md:p-8 border border-gray-800 card-shadow">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800 last:border-0">
                <AccordionTrigger className="text-left text-white hover:text-saas-orange py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;