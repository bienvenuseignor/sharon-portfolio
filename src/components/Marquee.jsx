import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ items, direction = 'left', speed = 20, className = "" }) => {
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <motion.div
        className="flex items-center"
        animate={{ 
          x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] 
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-6xl md:text-8xl font-serif italic text-chocolat/10 dark:text-ivoire/10 uppercase tracking-tighter">
              {item}
            </span>
            <span className="ml-8 w-3 h-3 bg-chocolat/10 dark:bg-ivoire/10 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
