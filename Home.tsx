import React, { useState, useEffect } from 'react';
import { Brain, Palette, Zap, Users, Lock, Star, CheckCircle, Puzzle, Shapes, Hash, Volume2 } from 'lucide-react';
import DisclaimerModal from '../components/DisclaimerModal';
import GameCard from '../components/GameCard';
import MemoryGame from '../games/MemoryGame';
import PatternGame from '../games/PatternGame';
import ColorGame from '../games/ColorGame';
import ShapeGame from '../games/ShapeGame';
import NumberGame from '../games/NumberGame';
import SoundGame from '../games/SoundGame';
import GameResults from '../components/GameResults';
import AIChat from '../components/AIChat';
import AICharacter from '../components/AICharacter';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import { ChildProfile, GameResult } from '../types';

type GameType = 'memory' | 'pattern' | 'color' | 'shape' | 'number' | 'sound' | null;

export default function Home() {
  const [currentGame, setCurrentGame] = useState<GameType>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [profiles, setProfiles] = useLocalStorage<ChildProfile[]>('childProfiles', []);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [childName, setChildName] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const { user, hasPremiumAccess } = useAuth();

  useEffect(() => {
    // Show disclaimer on first visit
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('hasSeenDisclaimer', 'true');
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    
    if (selectedProfile) {
      const updatedProfiles = profiles.map(profile =>
        profile.id === selectedProfile.id
          ? { ...profile, gameResults: [...profile.gameResults, result] }
          : profile
      );
      setProfiles(updatedProfiles);
    }
    
    setCurrentGame(null);
  };

  const handlePlayAgain = () => {
    setGameResult(null);
  };

  const handleBackToMenu = () => {
    setGameResult(null);
    setCurrentGame(null);
  };

  const handleStartGame = (gameType: GameType) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (!hasPremiumAccess()) {
      window.location.href = '/pricing';
      return;
    }

    if (!selectedProfile) {
      setShowNameInput(true);
      return;
    }
    setCurrentGame(gameType);
  };

  const handleCreateProfile = () => {
    if (!childName.trim()) return;
    
    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name: childName,
      age: 0,
      createdAt: new Date(),
      gameResults: []
    };
    
    setProfiles([...profiles, newProfile]);
    setSelectedProfile(newProfile);
    setShowNameInput(false);
    setChildName('');
  };

  if (gameResult) {
    return (
      <GameResults
        result={gameResult}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (currentGame === 'memory') {
    return (
      <MemoryGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'pattern') {
    return (
      <PatternGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'color') {
    return (
      <ColorGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'shape') {
    return (
      <ShapeGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'number') {
    return (
      <NumberGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'sound') {
    return (
      <SoundGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  return (
    <div className="space-y-8">
      <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />
      <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
      <AICharacter onStartChat={() => setShowAIChat(true)} />
      
      {/* Hero Section */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-800/20 dark:to-purple-800/20 rounded-3xl"></div>
        <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-8">
          <div className="flex justify-center items-center mb-6">
            <Puzzle className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500 mr-4 animate-bounce" />
            <div className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MindKids
            </div>
            <Puzzle className="h-12 w-12 sm:h-16 sm:w-16 text-purple-500 ml-4 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🧠 Plataforma Educativa Premium para Desenvolvimento Infantil
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Uma ferramenta inovadora que utiliza <strong>jogos interativos especializados</strong> para 
            auxiliar pais e educadores na <strong>observação de padrões de desenvolvimento</strong> e 
            possíveis sinais relacionados ao <strong>Transtorno do Espectro Autista (TEA)</strong>.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">6 Jogos Especializados</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">Relatórios Detalhados</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">IA Luna Especializada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          🌟 Por que escolher o MindKids?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <Brain className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Jogos Científicos</h3>
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              Desenvolvidos com base em pesquisas sobre desenvolvimento infantil e padrões comportamentais do TEA.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <div className="relative mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-6 bg-white rounded-lg relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 border-b-2 border-pink-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">Luna - IA Especializada</h3>
            <p className="text-purple-700 dark:text-purple-200 text-sm">
              Assistente virtual amigável com conhecimento sobre autismo para tirar dúvidas e orientar famílias.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Relatórios Completos</h3>
            <p className="text-green-700 dark:text-green-200 text-sm">
              Análises detalhadas do desempenho para compartilhar com profissionais de saúde.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Access Required */}
      {!user || !hasPremiumAccess() ? (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-2xl">
          <Lock className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-6 opacity-90" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">🔒 Acesso Premium Necessário</h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Para acessar os jogos especializados e relatórios detalhados, você precisa de uma assinatura premium.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="text-3xl sm:text-4xl font-bold mb-2">R$ 19,90</div>
            <div className="text-lg opacity-90">Pagamento único • Acesso vitalício</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">6 Jogos Especializados</div>
                <div className="text-sm opacity-80">Atividades desenvolvidas para observar padrões comportamentais</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Luna - Assistente IA</div>
                <div className="text-sm opacity-80">Chat especializado em autismo e desenvolvimento infantil</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Relatórios Detalhados</div>
                <div className="text-sm opacity-80">Análises completas do desempenho e padrões observados</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Modo Escuro</div>
                <div className="text-sm opacity-80">Interface adaptável para maior conforto visual</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!user ? (
              <>
                <a
                  href="/pricing"
                  className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Assinar Agora por R$ 19,90
                </a>
                <div className="text-sm opacity-80">
                  Já tem uma conta? <a href="/login" className="underline hover:text-yellow-300">Faça login aqui</a>
                </div>
              </>
            ) : (
              <a
                href="/pricing"
                className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Ativar Acesso Premium
              </a>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Profile Selection */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              Selecionar Perfil da Criança
            </h2>
            
            {profiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Nenhum Perfil Criado</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Crie o primeiro perfil para começar a usar a plataforma</p>
                <button
                  onClick={() => setShowNameInput(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ➕ Criar Primeiro Perfil
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {profiles.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedProfile?.id === profile.id
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 bg-white dark:bg-gray-700 hover:shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        selectedProfile?.id === profile.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-gradient-to-r from-blue-400 to-purple-400'
                      }`}>
                        <span className="text-white font-bold text-xl">
                          {profile.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">{profile.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        🎮 {profile.gameResults.length} jogos realizados
                      </p>
                    </div>
                  </button>
                ))}
                
                <button
                  onClick={() => setShowNameInput(true)}
                  className="p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-600 dark:text-gray-300 text-3xl">+</span>
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Novo Perfil</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Adicionar criança</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Name Input Modal */}
          {showNameInput && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                  👶 Criar Novo Perfil
                </h3>
                <input
                  type="text"
                  placeholder="Nome da criança"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleCreateProfile}
                    disabled={!childName.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    ✅ Criar Perfil
                  </button>
                  <button
                    onClick={() => {
                      setShowNameInput(false);
                      setChildName('');
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <GameCard
              title="🧠 Jogo da Memória"
              description="Desenvolve memória visual e concentração através de pares de formas coloridas. Observa padrões de atenção e capacidade de retenção."
              icon={Brain}
              color="bg-gradient-to-br from-purple-500 via-pink-500 to-red-400"
              onClick={() => handleStartGame('memory')}
              difficulty="Fácil"
            />
            
            <GameCard
              title="⚡ Jogo de Sequências"
              description="Treina memória sequencial e reconhecimento de padrões. Avalia capacidade de seguir instruções e processar informações ordenadas."
              icon={Zap}
              color="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400"
              onClick={() => handleStartGame('pattern')}
              difficulty="Médio"
            />
            
            <GameCard
              title="🎨 Jogo das Cores"
              description="Aprimora reconhecimento visual e coordenação. Observa velocidade de processamento e precisão na identificação de estímulos."
              icon={Palette}
              color="bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400"
              onClick={() => handleStartGame('color')}
              difficulty="Fácil"
            />

            <GameCard
              title="🔷 Jogo das Formas"
              description="Desenvolve reconhecimento de formas geométricas e coordenação visual-motora. Avalia capacidade de diferenciação visual."
              icon={Shapes}
              color="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400"
              onClick={() => handleStartGame('shape')}
              difficulty="Fácil"
            />

            <GameCard
              title="🔢 Jogo dos Números"
              description="Estimula reconhecimento numérico e habilidades matemáticas básicas. Observa capacidade de associação e memória numérica."
              icon={Hash}
              color="bg-gradient-to-br from-orange-500 via-red-500 to-pink-400"
              onClick={() => handleStartGame('number')}
              difficulty="Médio"
            />

            <GameCard
              title="🔊 Jogo dos Sons"
              description="Desenvolve reconhecimento auditivo e associação som-imagem. Avalia processamento auditivo e capacidade de correlação."
              icon={Volume2}
              color="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-400"
              onClick={() => handleStartGame('sound')}
              difficulty="Médio"
            />
          </div>

          {!selectedProfile && (
            <div className="text-center p-8 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-yellow-300 dark:border-yellow-600">
              <Puzzle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <p className="text-yellow-800 dark:text-yellow-300 font-bold text-lg">
                👆 Selecione ou crie um perfil para começar a usar os jogos especializados!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}