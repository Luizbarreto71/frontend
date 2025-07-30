import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';
import { Volume2, Play, Pause } from 'lucide-react';

const sounds = [
  { name: 'Cachorro', emoji: '🐕', sound: 'Au au!' },
  { name: 'Gato', emoji: '🐱', sound: 'Miau!' },
  { name: 'Vaca', emoji: '🐄', sound: 'Muuu!' },
  { name: 'Pássaro', emoji: '🐦', sound: 'Piu piu!' },
  { name: 'Leão', emoji: '🦁', sound: 'Roar!' },
  { name: 'Porco', emoji: '🐷', sound: 'Oinc oinc!' }
];

export default function SoundGame({ onGameComplete, childName }: GameProps) {
  const [currentSound, setCurrentSound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<string>('');
  const [availableOptions, setAvailableOptions] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextRound = () => {
    if (round >= 10) {
      endGame();
      return;
    }
    
    const correctSound = Math.floor(Math.random() * sounds.length);
    const newAvailable = [correctSound];
    
    while (newAvailable.length < 3) {
      const randomSound = Math.floor(Math.random() * sounds.length);
      if (!newAvailable.includes(randomSound)) {
        newAvailable.push(randomSound);
      }
    }
    
    // Shuffle
    for (let i = newAvailable.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newAvailable[i], newAvailable[j]] = [newAvailable[j], newAvailable[i]];
    }
    
    setCurrentSound(correctSound);
    setAvailableOptions(newAvailable);
    setRound(prev => prev + 1);
    setFeedback('');
    
    // Auto-play sound
    setTimeout(() => playSound(), 500);
  };

  const playSound = () => {
    setIsPlaying(true);
    // Simulate sound playing
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const handleSoundClick = (selectedIndex: number) => {
    if (selectedIndex === currentSound) {
      setScore(prev => prev + 10);
      setFeedback('Correto! 🎵');
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
      gameType: 'Jogo dos Sons',
      score,
      errors,
      timeSpent,
      date: new Date(),
      details: {
        correctAnswers: score / 10,
        incorrectAnswers: errors,
        patterns: ['Reconhecimento auditivo', 'Associação som-imagem'],
        reactions: errors < 3 ? ['Excelente reconhecimento auditivo'] : ['Pode praticar mais a associação de sons']
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Jogo dos Sons</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Olá {childName}! Vou tocar um som de animal. Clique no animal correto!
        </p>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 hover:from-orange-500 hover:via-red-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
        >
          Começar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Jogo dos Sons</h2>
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
          <p className="text-gray-600 dark:text-gray-300 mb-4">Ouça o som e clique no animal:</p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={playSound}
              className={`p-4 rounded-full transition-all duration-300 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white shadow-lg transform hover:scale-105`}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </button>
            <div className="text-4xl sm:text-6xl">
              {sounds[currentSound].emoji}
            </div>
            <Volume2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mt-4">
            "{sounds[currentSound].sound}"
          </p>
        </div>
      </div>

      {feedback && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">{feedback}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {availableOptions.map((soundIndex, index) => (
          <button
            key={index}
            onClick={() => handleSoundClick(soundIndex)}
            className="bg-gradient-to-br from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <div className="text-4xl sm:text-6xl mb-2">{sounds[soundIndex].emoji}</div>
            <div className="text-lg font-semibold">{sounds[soundIndex].name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}