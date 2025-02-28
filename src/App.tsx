import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import LoadingAnimation from './components/LoadingAnimation';
import PasswordModal from './components/PasswordModal';
import { FileUploader, DataTable, Header, StatsCard } from './components';
import { parseExcelFile } from './utils/excelParser';
import { ExcelData, AreaType } from './types';
import { Loader2, AlertTriangle } from 'lucide-react';

const areaPasswords: Record<string, string> = {
  'Operaciones': 'Operaciones123!',
  'Lavado': 'Lavado456@',
  'Mantenimiento': 'Mantenimiento789#',
  'Remanofactura': 'Remanofactura234$',
  'ServiciosGenerales': 'ServiciosGenerales567%',
  'Vigilantes': 'Vigilantes890&'
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<'welcome' | 'upload' | 'results'>('welcome');
  const [selectedArea, setSelectedArea] = useState<AreaType | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  const handleSelectArea = (area: string) => {
    setSelectedArea(area as AreaType);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setStep('upload');
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setExcelData(null);
    setFileName(file.name);
    
    try {
      const data = await parseExcelFile(file);
      setExcelData(data);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWelcome = () => {
    setStep('welcome');
    setSelectedArea(null);
    setExcelData(null);
    setFileName(null);
    setError(null);
  };

  const handleBackToUpload = () => {
    setStep('upload');
    setExcelData(null);
    setFileName(null);
    setError(null);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WelcomeScreen onSelectArea={handleSelectArea} />
            </motion.div>
          )}

          {step === 'upload' && selectedArea && (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FileUploader onFileUpload={handleFileUpload} selectedArea={selectedArea} onBack={handleBackToWelcome} />
              {loading && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-3 text-green-600 bg-green-50 px-6 py-4 rounded-lg shadow-md">
                    <Loader2 className="animate-spin" size={28} />
                    <span className="text-lg">Procesando archivo...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-8 p-5 bg-red-50 border border-red-200 rounded-lg shadow-md">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="text-red-500 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-red-700">Error en el procesamiento</h3>
                  </div>
                  <p className="text-red-600">{error}</p>
                  <div className="mt-4 pt-3 border-t border-red-100 flex justify-end">
                    <button 
                      onClick={() => setError(null)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 'results' && excelData && selectedArea && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StatsCard data={excelData} fileName={fileName} selectedArea={selectedArea} />
              <DataTable data={excelData} selectedArea={selectedArea} onBack={handleBackToUpload} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {showPasswordModal && selectedArea && (
        <PasswordModal
          isOpen={showPasswordModal}
          areaName={selectedArea}
          correctPassword={areaPasswords[selectedArea]}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
    </div>
  );
}

export default App;
