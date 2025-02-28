import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, ShieldCheck, AlertTriangle, Key } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  areaName: string;
  correctPassword: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ 
  isOpen, 
  areaName, 
  correctPassword, 
  onClose, 
  onSuccess 
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const blockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setIsAuthenticating(false);
      setPasswordStrength(0);
      setCapsLockOn(false);
      setShowHint(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      blockTimerRef.current = window.setTimeout(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (blockTimerRef.current) {
        clearTimeout(blockTimerRef.current);
      }
    };
  }, [isBlocked, blockTimeRemaining]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
    
    if (e.key === 'Enter' && password) {
      handleSubmit(e as any);
    }
  };

  const checkPasswordStrength = (value: string) => {
    if (!value) return 0;
    
    let strength = 0;
    
    if (value.length >= 8) strength += 1;
    
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    
    return Math.min(strength, 4);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked || !password || isAuthenticating) return;
    
    setIsAuthenticating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (password === correctPassword) {
      setError('');
      setIsAuthenticating(false);
      onSuccess();
    } else {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      if (newAttemptCount >= 3) {
        setIsBlocked(true);
        setBlockTimeRemaining(30); 
        setError('Demasiados intentos fallidos. Acceso bloqueado por 30 segundos.');
      } else {
        setError(`Contraseña incorrecta. Intento ${newAttemptCount} de 3.`);
      }
      
      setPassword('');
      setIsAuthenticating(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return '';
      case 1: return 'Débil';
      case 2: return 'Regular';
      case 3: return 'Buena';
      case 4: return 'Fuerte';
      default: return '';
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative flex justify-between items-center">
                <div className="flex items-center text-white">
                  <motion.div
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="bg-white/20 p-3 rounded-lg mr-4"
                  >
                    <Lock className="text-white" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-xl">Control de Acceso</h3>
                    <p className="text-xs text-white/90 mt-1">Verificación de Seguridad</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="mt-6 inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">Área: {areaName}</span>
              </div>
            </div>
            
            <div className="p-6">
              {isBlocked ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-5 mb-6"
                >
                  <div className="flex items-start">
                    <AlertTriangle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={22} />
                    <div>
                      <h5 className="font-semibold text-red-700 text-lg">Acceso Bloqueado</h5>
                      <p className="text-sm text-red-600 mt-2">
                        Por motivos de seguridad, el acceso ha sido temporalmente restringido debido a múltiples intentos fallidos.
                      </p>
                      <div className="mt-4 bg-red-200 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: `${(blockTimeRemaining / 30) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-red-500"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-red-600">Bloqueado</p>
                        <p className="text-xs text-red-600 font-medium">
                          {blockTimeRemaining} segundos restantes
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña de Seguridad
                      </label>
                    </div>
                    
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={handleKeyDown}
                        disabled={isAuthenticating}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all shadow-sm"
                        placeholder="Ingresa la contraseña de acceso"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {password && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Nivel de seguridad:</span>
                          <span className="text-xs font-medium" style={{ color: passwordStrength >= 3 ? '#16a34a' : passwordStrength === 2 ? '#f59e0b' : '#ef4444' }}>
                            {getStrengthText()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                          {[...Array(4)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-full w-1/4 ${i < passwordStrength ? getStrengthColor() : 'bg-gray-200'} ${i > 0 ? 'ml-0.5' : ''}`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {capsLockOn && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-amber-600 text-xs mt-2 flex items-center"
                      >
                        <AlertTriangle size={14} className="mr-1" /> Bloq Mayús está activado
                      </motion.p>
                    )}
                    
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md"
                      >
                        <p className="text-red-700 text-sm flex items-center">
                          <AlertTriangle size={16} className="mr-1.5 flex-shrink-0" /> 
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isAuthenticating || !password}
                      className={`w-full px-4 py-3.5 rounded-lg font-medium transition-all flex items-center justify-center ${
                        isAuthenticating || !password
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-green-700 to-emerald-700 text-white hover:shadow-lg'
                      }`}
                    >
                      {isAuthenticating ? (
                        <>
                          <div className="mr-3 relative">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                          </div>
                          Verificando credenciales...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="mr-2" size={18} />
                          Verificar Acceso
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancelar y volver al menú principal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;