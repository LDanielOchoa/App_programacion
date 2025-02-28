import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

interface NoInternetConnectionProps {
  onRetry: () => void;
}

const NoInternetConnection: React.FC<NoInternetConnectionProps> = ({ onRetry }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-red-500"
      >
        <WifiOff size={80} />
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold text-red-800 mb-4 text-center"
      >
        Sin conexión a Internet
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg text-red-600 mb-8 text-center max-w-md px-4"
      >
        No se puede acceder al sistema porque no hay conexión a Internet. Por favor, verifica tu conexión e intenta nuevamente.
      </motion.p>
      
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg font-medium"
      >
        Reintentar
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-red-700 text-sm"
      >
        El sistema verificará automáticamente la conexión en 5 segundos...
      </motion.div>
    </div>
  );
};

export default NoInternetConnection;