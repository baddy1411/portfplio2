
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { TechIcons } from './TechIcons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const SkillGrid = () => {
  // Group skills by category
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div className="space-y-12 mt-8 font-sans">
      {categories.map((category, idx) => (
        <div key={category} className="relative group/section">
          
          {/* Terminal Style Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xs font-mono text-teal-600/80 dark:text-teal-500/80 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded border border-teal-200 dark:border-teal-500/20">
              0{idx + 1}
            </div>
            <h4 className="text-sm font-bold uppercase text-neutral-500 dark:text-neutral-300 tracking-widest">
              <span className="text-teal-600 dark:text-teal-500 mr-2">~/</span>
              {category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
            </h4>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800 group-hover/section:bg-neutral-300 dark:group-hover/section:bg-neutral-700 transition-colors"></div>
          </div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {SKILLS.filter(s => s.category === category).map((skill) => {
              const IconComponent = TechIcons[skill.icon] || TechIcons.default;

              return (
                <motion.div 
                  key={skill.name} 
                  variants={itemVariants}
                  className="group relative flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 hover:border-teal-500/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 p-2 rounded bg-neutral-100 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 group-hover:text-teal-600 dark:group-hover:text-teal-300 group-hover:bg-teal-500/10 transition-colors duration-300">
                    <IconComponent size={20} />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col">
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                      {skill.description}
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-neutral-900/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
