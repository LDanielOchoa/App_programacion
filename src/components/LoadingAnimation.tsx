import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, CheckCircle, BarChart2 } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        className="mb-10 relative"
      >
        <div className="relative">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 flex items-center justify-center"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
              <FileSpreadsheet size={48} className="text-green-600" />
            </div>
          </div>
          
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <motion.div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              whileHover={{ scale: 1.2 }}
            >
              <div className="bg-emerald-500 p-2 rounded-full shadow-md">
                <CheckCircle size={16} className="text-white" />
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2"
              whileHover={{ scale: 1.2 }}
            >
              <div className="bg-green-600 p-2 rounded-full shadow-md">
                <BarChart2 size={16} className="text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
          className="text-3xl font-bold text-green-800 mb-3 tracking-tight"
        >
          Sistema de Gestión
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
          className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full mb-8 inline-block"
        >
          <p className="text-lg text-green-700 font-medium">
            Formato de Programación
          </p>
        </motion.div>
      </motion.div>
   
      <motion.div
        initial={{ width: "80%", opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-64 relative"
      >
        <div className="h-1.5 bg-green-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.9, duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
          />
        </div>
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 flex justify-center items-center"
        >
          <p className="text-green-700 text-sm font-medium mr-2">Cargando recursos</p>
          <LoadingDots />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-green-700 text-sm font-medium">
          Sistema Alimentador Oriental 6
        </p>
        <p className="text-green-600/70 text-xs mt-1">
          © 2025 Todos los derechos reservados
        </p>
      </motion.div>
    </div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ opacity: 1, y: -3 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: dot * 0.2,
          }}
          className="w-1.5 h-1.5 bg-green-600 rounded-full"
        />
      ))}
    </div>
  );
};

export default LoadingAnimation;