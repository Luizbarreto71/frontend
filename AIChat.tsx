import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Heart, Star } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🌟 Oi amiguinho! Eu sou a Luna, sua assistente virtual especial! 🤖💜 Estou aqui para ajudar você e sua família com dúvidas sobre autismo, desenvolvimento infantil e como usar nossa plataforma. O que você gostaria de saber?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const autismFAQ = {
    'sinais': '🔍 Os primeiros sinais de autismo podem incluir: dificuldade na comunicação social, comportamentos repetitivos, sensibilidade sensorial, dificuldade com mudanças na rotina. 🚨 Lembre-se: apenas profissionais podem fazer diagnósticos! Se você tem dúvidas, converse com um pediatra. 👩‍⚕️',
    'desenvolvimento': '📈 O desenvolvimento infantil é como uma aventura única para cada criança! 🌱 Marcos importantes incluem: sorrir socialmente (2-3 meses), balbuciar (6 meses), primeiras palavras (12 meses), andar (12-18 meses). Cada criança tem seu próprio ritmo especial! ⭐',
    'jogos': '🎮 Nossos jogos são super especiais! Eles observam: memória visual 🧠, reconhecimento de padrões 🔄, coordenação 🎯, atenção 👀, e sequenciamento 📝. São como brincadeiras que ajudam a entender como a criança aprende e se desenvolve! 🌈',
    'relatórios': '📊 Os relatórios mostram como a criança se saiu nos jogos, mas 🚨 NÃO são diagnósticos médicos! São como um "diário de brincadeiras" que você pode mostrar para médicos e terapeutas. Eles ajudam os profissionais a entender melhor a criança! 👨‍⚕️',
    'ajuda': '🆘 Se você suspeita de autismo, procure ajuda de: pediatra 👩‍⚕️, neuropediatra 🧠, psicólogo infantil 🧸 ou psiquiatra infantil. O diagnóstico precoce é como encontrar a chave certa para ajudar a criança! 🗝️✨',
    'como_usar': '📱 Para usar nossa plataforma: 1️⃣ Crie um perfil para a criança, 2️⃣ Escolha um jogo divertido, 3️⃣ Deixe a criança brincar, 4️⃣ Veja os resultados nos relatórios! É fácil e divertido! 🎉',
    'idade': '👶 Nossos jogos são perfeitos para crianças de 2 a 8 anos! Cada jogo tem níveis diferentes de dificuldade. Se a criança é muito pequena, um adulto pode ajudar! 🤝',
    'tempo': '⏰ Recomendamos sessões de 10-15 minutos para não cansar a criança. O importante é que seja divertido, não uma obrigação! Se a criança não quiser jogar, tudo bem - tente outro dia! 😊'
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('sinais') || message.includes('sintomas') || message.includes('autismo')) {
      return autismFAQ.sinais;
    }
    if (message.includes('desenvolvimento') || message.includes('marcos') || message.includes('idade')) {
      return autismFAQ.desenvolvimento;
    }
    if (message.includes('jogos') || message.includes('atividades') || message.includes('como funciona')) {
      return autismFAQ.jogos;
    }
    if (message.includes('relatório') || message.includes('resultado') || message.includes('diagnóstico')) {
      return autismFAQ.relatórios;
    }
    if (message.includes('ajuda') || message.includes('médico') || message.includes('profissional')) {
      return autismFAQ.ajuda;
    }
    if (message.includes('como usar') || message.includes('tutorial') || message.includes('começar')) {
      return autismFAQ.como_usar;
    }
    if (message.includes('quantos anos') || message.includes('que idade') || message.includes('criança pequena')) {
      return autismFAQ.idade;
    }
    if (message.includes('tempo') || message.includes('quanto jogar') || message.includes('duração')) {
      return autismFAQ.tempo;
    }
    if (message.includes('olá') || message.includes('oi') || message.includes('hello') || message.includes('luna')) {
      return '👋 Oi! Que bom falar com você! 🌟 Sou a Luna e adoro ajudar famílias! O que você gostaria de saber sobre autismo, desenvolvimento infantil ou nossos jogos? 🤗';
    }
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('valeu')) {
      return '🥰 Fico muito feliz em ajudar! Estou sempre aqui quando precisar! 💜 Lembre-se: para questões médicas específicas, sempre consulte um profissional de saúde. Cuide-se! ✨';
    }
    if (message.includes('tchau') || message.includes('até logo') || message.includes('bye')) {
      return '👋 Tchau! Foi um prazer conversar com você! Volte sempre que quiser! Estarei aqui esperando! 🌈💜';
    }
    
    return `🤔 Entendi sua pergunta sobre "${userMessage}"! Posso ajudar com informações sobre: 
    
    🔍 Sinais de autismo
    📈 Desenvolvimento infantil  
    🎮 Como usar nossos jogos
    📊 Interpretação de relatórios
    🆘 Onde buscar ajuda profissional
    
    Sobre o que você gostaria de saber mais? 😊`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Luna Character */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 border-b-2 border-pink-600 rounded-full"></div>
                  <Star className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 text-yellow-300" />
                </div>
              </div>
              <Heart className="h-3 w-3 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white">Luna - Assistente IA</h3>
              <p className="text-xs text-blue-100">🤖 Especialista em Autismo Infantil</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                }`}>
                  {message.isBot ? (
                    <div className="w-6 h-4 bg-white rounded-md relative">
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-500 rounded-full"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-500 rounded-full"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 border-b border-pink-500 rounded-full"></div>
                    </div>
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-3 ${
                  message.isBot
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-gray-800 dark:text-gray-200 border border-purple-200 dark:border-purple-700'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="w-6 h-4 bg-white rounded-md relative">
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 border-b border-pink-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-3 border border-purple-200 dark:border-purple-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua dúvida para a Luna..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setInputText('Quais são os sinais de autismo?')}
              className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              🔍 Sinais de autismo
            </button>
            <button
              onClick={() => setInputText('Como usar os jogos?')}
              className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
            >
              🎮 Como usar jogos
            </button>
            <button
              onClick={() => setInputText('Onde buscar ajuda profissional?')}
              className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
            >
              🆘 Buscar ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}