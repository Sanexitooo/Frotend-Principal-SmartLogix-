import React from "react";
import { motion } from "framer-motion";
import { features } from "@/data/features";
import { useFadeInView } from "@/hooks/use-fade-in-view";
import type { Feature } from "@/types";

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const anim = useFadeInView({ delay: index * 0.1, y: 30, duration: 0.5 });
  return (
    <motion.div {...anim} className="bg-slate-50 dark:bg-saas-lightBg p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:border-saas-orange/40 hover:bg-white dark:hover:bg-saas-darkGray hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 transition-all duration-300 group">
      <div className="bg-white dark:bg-saas-darkGray w-14 h-14 flex items-center justify-center rounded-2xl mb-6 shadow-sm group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
        <div className="group-hover:text-white transition-colors">
          {feature.icon}
        </div>
      </div>
      <h3 className="text-xl font-black mb-3 text-saas-teal">{feature.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const titleAnim = useFadeInView();
  return (
    <section className="bg-white dark:bg-saas-darkGray py-16 md:py-24 overflow-hidden">
      <div className="section-container">
        <motion.div {...titleAnim} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-saas-teal tracking-tighter">
            Funciones <span className="text-saas-orange">Potentes</span> para logística
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Optimiza operaciones y alcanza metas de transporte de manera eficiente con SmartLogix.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {features.map((feature: Feature, index: number) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;