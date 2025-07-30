import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';
import { Square, Circle, Triangle, Star, Heart, Diamond } from 'lucide-react';

const shapes = [
  { component: Square, name: 'Quadrado', color: 'bg-red-500' },
  { component: Circle, name: 'Círculo', color: 'bg-blue-500' },
  { component: Triangle, name: 'Triângulo', color: 'bg-green-500' },
  { component: Star, name: 'Estrela', color: 'bg-yellow-500' },
  { component: Heart, name: 'Coração', color: 'bg-pink-500' },
  { component: Diamond, name: 'Losango', color: 'bg-purple-500' }
];

export default function ShapeGame({ onGameComplete, childName }: GameProps) {
  const [currentShape, setCurrentShape] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<string>('');
  const [availableShapes, setAvailableShapes] = useState<number[]>([]);

  const nextRound = () => {
    if (round >= 12) {
      endGame();
      return;
    }
    
    // Generate random shapes for selection
    const newAvailable = [];
    const correctShape = Math.floor(Math.random() * shapes.length);
    newAvailable.push(correctShape);
    
    while (newAvailable.length < 4) {
      const randomShape = Math.floor(Math.random() * shapes.length);
      if (!newAvailable.includes(randomShape)) {
        newAvailable.push(randomShape);
      }
    }
    
    // Shuffle the array
    for (let i = newAvailable.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newAvailable[i], newAvailable[j]] = [newAvailable[j], newAvailable[i]];
    }
    
    setCurrentShape(correctShape);
    setAvailableShapes(newAvailable);
    setRound(prev => prev + 1);
    setFeedback('');
  };

  const handleShapeClick = (selectedIndex: number) => {
    if (selectedIndex === currentShape) {
      setScore(prev => prev + 10);
      setFeedback('Perfeito! 🌟');
      setTimeout(nextRound, 1500);
    } else {
      setErrors(prev => prev + 1);
      setFeedback('Ops! Tente novamente. 🤔');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    
    const result: GameResult = {
      id: Date.now().toString(),
      gameType: 'Jogo das Formas',
      score,
      errors,
      timeSpent,
      date: new Date(),
      details: {
        correctAnswers: score / 10,
        incorrectAnswers: errors,
        patterns: ['Reconhecimento de formas', 'Coordenação visual-motora'],
        reactions: errors < 3 ? ['Excelente reconhecimento de formas'] : ['Pode praticar mais o reconhecimento']
      }
    };
    
    onGameComplete(result);
  };

  const startGame = () => {
    setGameStarted(true);
    nextRound();
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Jogo das Formas</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Olá {childName}! Vou mostrar o nome de uma forma. Clique na forma correta!
        </p>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
        >
          Começar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Jogo das Formas</h2>
        <p className="text-gray-600 dark:text-gray-300">Rodada {round}/12</p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 mt-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            <span className="text-blue-800 dark:text-blue-300 font-semibold">Pontos: {score}</span>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
            <span className="text-red-800 dark:text-red-300 font-semibold">Erros: {errors}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg inline-block">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Clique na forma:</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
            {shapes[currentShape].name}
          </h3>
        </div>
      </div>

      {feedback && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">{feedback}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {availableShapes.map((shapeIndex, index) => {
          const ShapeComponent = shapes[shapeIndex].component;
          const colorClass = shapes[shapeIndex].color;
          
          return (
            <button
              key={index}
              onClick={() => handleShapeClick(shapeIndex)}
              className={`
                ${colorClass} aspect-square rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300
                hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                flex items-center justify-center
              `}
              aria-label={shapes[shapeIndex].name}
            >
              <ShapeComponent className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </button>
          );
        })}
      </div>
    </div>
  );
}