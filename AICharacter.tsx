import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Heart, Star } from 'lucide-react';

interface AICharacterProps {
  onStartChat: () => void;
}

export default function AICharacter({ onStartChat }: AICharacterProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const introMessages = [
    "👋 Oi amiguinho! Eu sou a Luna!",
    "🤖 Sou sua assistente virtual especial!",
    "💜 Estou aqui para ajudar você e sua família!",
    "🧠 Posso responder dúvidas sobre autismo e desenvolvimento!",
    "🎮 Também explico como usar nossos jogos!",
    "💬 Clique em mim quando quiser conversar!"
  ];

  useEffect(() => {
    if (showIntro) {
      const timer = setInterval(() => {
        setCurrentMessage(prev => {
          if (prev >= introMessages.length - 1) {
            clearInterval(timer);
            setTimeout(() => setShowIntro(false), 3000);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [showIntro, introMessages.length]);

  const handleClick = () => {
    if (!showIntro) {
      setShowIntro(true);
      setCurrentMessage(0);
    } else {
      onStartChat();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Character */}
      <div className="relative">
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce"
          title="Conversar com Luna - IA do MindKids"
        >
          {/* Robot Body */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Robot Head */}
            <div className="w-10 h-8 bg-white rounded-lg relative">
              {/* Eyes */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              {/* Smile */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b-2 border-pink-500 rounded-full"></div>
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-400 rounded-full">
                <Star className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 text-yellow-300" />
              </div>
            </div>
          </div>

          {/* Floating hearts */}
          <Heart className="absolute -top-2 -left-2 w-4 h-4 text-pink-300 animate-pulse" />
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-ping" />
        </button>

        {/* Speech Bubble */}
        {showIntro && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-w-xs border-4 border-purple-200 dark:border-purple-600 relative animate-bounce">
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 right-4 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
              </div>
              
              {/* Character avatar in bubble */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-5 bg-white rounded-md relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 border-b border-pink-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                      {introMessages[currentMessage]}
                    </p>
                  </div>
                  
                  {currentMessage === introMessages.length - 1 && (
                    <button
                      onClick={onStartChat}
                      className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      💬 Vamos Conversar!
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress dots */}
              <div className="flex justify-center space-x-1 mt-3">
                {introMessages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= currentMessage 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating notification */}
        {!showIntro && (
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            💬
          </div>
        )}
      </div>
    </div>
  );
}