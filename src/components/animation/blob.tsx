import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBlob() {
  return (
    <motion.div
      className="absolute top-1/2 right-20 transform -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50 rounded-full blur-3xl"
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    />
  );
}
