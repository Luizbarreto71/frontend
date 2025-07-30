import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';

export default function NumberGame({ onGameComplete, childName }: GameProps) {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<string>('');
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  const nextRound = () => {
    if (round >= 10) {
      endGame();
      return;
    }
    
    const correctNumber = Math.floor(Math.random() * 10) + 1;
    const newAvailable = [correctNumber];
    
    while (newAvailable.length < 4) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      if (!newAvailable.includes(randomNumber)) {
        newAvailable.push(randomNumber);
      }
    }
    
    // Shuffle
    for (let i = newAvailable.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newAvailable[i], newAvailable[j]] = [newAvailable[j], newAvailable[i]];
    }
    
    setCurrentNumber(correctNumber);
    setAvailableNumbers(newAvailable);
    setRound(prev => prev + 1);
    setFeedback('');
  };

  const handleNumberClick = (selectedNumber: number) => {
    if (selectedNumber === currentNumber) {
      setScore(prev => prev + 10);
      setFeedback('Muito bem! 🎉');
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
      gameType: 'Jogo dos Números',
      score,
      errors,
      timeSpent,
      date: new Date(),
      details: {
        correctAnswers: score / 10,
        incorrectAnswers: errors,
        patterns: ['Reconhecimento numérico', 'Coordenação visual'],
        reactions: errors < 3 ? ['Excelente reconhecimento numérico'] : ['Pode praticar mais os números']
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Jogo dos Números</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Olá {childName}! Vou mostrar um número. Clique no número correto!
        </p>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
        >
          Começar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Jogo dos Números</h2>
        <p className="text-gray-600 dark:text-gray-300">Rodada {round}/10</p>
        
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
          <p className="text-gray-600 dark:text-gray-300 mb-4">Clique no número:</p>
          <h3 className="text-6xl sm:text-8xl font-bold text-green-600 dark:text-green-400">
            {currentNumber}
          </h3>
        </div>
      </div>

      {feedback && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">{feedback}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {availableNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            className="bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-3xl sm:text-4xl aspect-square rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}