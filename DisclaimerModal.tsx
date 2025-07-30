import React from 'react';
import { X, AlertTriangle, Puzzle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              <AlertTriangle className="h-8 w-8 text-amber-500 mr-3" />
              <Puzzle className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">
              🧩 Aviso Importante
            </h2>
          </div>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
                📚 Plataforma Educativa - Não é Diagnóstico Médico
              </h3>
              <p className="text-amber-700 dark:text-amber-200 leading-relaxed">
                O <strong>MindKids</strong> é uma plataforma educativa premium que utiliza jogos interativos 
                para auxiliar pais e educadores na <strong>observação do desenvolvimento infantil</strong>.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-semibold">
                ⚠️ Esta plataforma NÃO fornece diagnósticos médicos de autismo ou qualquer outra condição.
              </p>
              <p className="text-red-600 dark:text-red-400 mt-2">
                Os relatórios gerados servem apenas como observações educativas sobre padrões de comportamento 
                e desenvolvimento cognitivo durante as atividades lúdicas.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-semibold">
                🩺 Para diagnósticos profissionais, sempre consulte pediatras, psicólogos ou 
                especialistas em desenvolvimento infantil.
              </p>
            </div>
            
            <div className="text-center pt-4">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ✅ Entendi, Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}