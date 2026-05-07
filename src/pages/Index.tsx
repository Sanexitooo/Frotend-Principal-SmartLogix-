import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection"; // Reintegrado
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar onOpenLogin={handleOpenLogin} /> 
      
      <main>
        <HeroSection onOpenLogin={handleOpenLogin} />
        
        <FeaturesSection />
        
        {/* Sección de Historia reintegrada */}
        <AboutSection />
        
        <TestimonialsSection />
        
        <PricingSection />
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;