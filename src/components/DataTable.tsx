import React from 'react';
import { motion } from 'framer-motion';
import { ExcelData, AreaType } from '../types';
import { ArrowLeft } from 'lucide-react';

interface DataTableProps {
  data: ExcelData | null;
  selectedArea: AreaType;
  onBack: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, selectedArea, onBack }) => {
  if (!data || !data.headers.length) {
    return null;
  }

  const getAreaColor = () => {
    switch (selectedArea) {
      case 'Operaciones': return 'bg-blue-500';
      case 'Lavado': return 'bg-cyan-500';
      case 'Mantenimiento': return 'bg-amber-500';
      case 'Remanofactura': return 'bg-emerald-500';
      case 'ServiciosGenerales': return 'bg-purple-500';
      case 'Vigilantes': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  const getAreaLightColor = () => {
    switch (selectedArea) {
      case 'Operaciones': return 'bg-blue-50 text-blue-800';
      case 'Lavado': return 'bg-cyan-50 text-cyan-800';
      case 'Mantenimiento': return 'bg-amber-50 text-amber-800';
      case 'Remanofactura': return 'bg-emerald-50 text-emerald-800';
      case 'ServiciosGenerales': return 'bg-purple-50 text-purple-800';
      case 'Vigilantes': return 'bg-red-50 text-red-800';
      default: return 'bg-green-50 text-green-800';
    }
  };

  const getAreaHoverColor = () => {
    switch (selectedArea) {
      case 'Operaciones': return 'hover:bg-blue-100';
      case 'Lavado': return 'hover:bg-cyan-100';
      case 'Mantenimiento': return 'hover:bg-amber-100';
      case 'Remanofactura': return 'hover:bg-emerald-100';
      case 'ServiciosGenerales': return 'hover:bg-purple-100';
      case 'Vigilantes': return 'hover:bg-red-100';
      default: return 'hover:bg-green-100';
    }
  };

  const hasMetadata = data.rows[0] && data.rows[0][0] === 'Responsable:';
  const metadata = hasMetadata ? data.rows[0] : null;
  const displayRows = hasMetadata ? data.rows.slice(1) : data.rows;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mt-8"
    >
      <div className="mb-6 flex items-center">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver a cargar archivo</span>
        </button>
        <h3 className="ml-auto text-lg font-semibold text-gray-700">
          Datos del área de {selectedArea}
        </h3>
      </div>

      {metadata && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">{metadata[0]}</span>
              <span className="text-gray-800">{metadata[1]}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">{metadata[2]}</span>
              <span className="text-gray-800">{metadata[3]}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${getAreaColor()} text-white sticky top-0 z-10`}>
              <tr>
                {data.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayRows.slice(0, 100).map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: rowIndex * 0.02 }}
                  className={`${rowIndex % 2 === 0 ? 'bg-white' : getAreaLightColor()} ${getAreaHoverColor()} transition-colors`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {cell?.toString() || ''}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {displayRows.length > 100 && (
            <div className="bg-gray-50 px-6 py-3 text-center text-sm text-gray-500 border-t border-gray-200">
              Mostrando 100 de {displayRows.length} filas
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-center mt-10 text-green-700 font-medium"
      >
        <p>Sistema Alimentador Oriental 6</p>
      </motion.div>
    </motion.div>
  );
};

export default DataTable;