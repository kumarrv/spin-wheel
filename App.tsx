import React, { useState } from 'react';

// Data for the wheel segments, including symbols, blessings, and colors
const symbols = [
  { name: '🕉️', blessing: 'Peace and strength fill your day.', color: 'from-red-500 to-orange-500' },
  { name: '🐘', blessing: 'Obstacles are cleared. Success is yours.', color: 'from-yellow-400 to-amber-500' },
  { name: '🌺', blessing: 'Prosperity and abundance come your way.', color: 'from-pink-400 to-rose-500' },
  { name: '🔱', blessing: 'Your mind is calm like a sacred river.', color: 'from-cyan-400 to-sky-500' },
  { name: '🪔', blessing: 'Light guides you through every challenge.', color: 'from-amber-300 to-orange-400' },
  { name: '🪷', blessing: 'Purity and beauty blossom within you.', color: 'from-violet-400 to-purple-500' },
  { name: '🐚', blessing: 'Positive vibrations surround you.', color: 'from-slate-200 to-slate-400' },
  { name: '🦚', blessing: 'Grace and beauty follow your every step.', color: 'from-emerald-400 to-green-500' },
];

const segmentAngle = 360 / symbols.length;

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBlessing, setSelectedBlessing] = useState<{name: string; blessing: string} | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedBlessing(null);

    const randomIndex = Math.floor(Math.random() * symbols.length);
    const targetSymbol = symbols[randomIndex];
    
    // Calculate target rotation: 5 full spins + angle to land on the random segment
    const targetRotation = (360 * 5) + (360 - (randomIndex * segmentAngle)) - (segmentAngle / 2);

    setRotation(targetRotation);

    // After the animation duration, show the blessing
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBlessing(targetSymbol);
    }, 5000); // Must match the CSS transition duration
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-purple-200 text-gray-800 p-4 overflow-hidden">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600 tracking-tight">
          DivineSpin
        </h1>
        <p className="text-gray-600 mt-2 font-lora">Your Daily Dose of Positivity</p>
      </header>

      <div className="relative flex flex-col items-center justify-center my-4">
        {/* Pointer */}
        <div className="absolute -top-2 z-10" style={{ transform: 'translateY(-100%)' }}>
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-amber-500 drop-shadow-lg"></div>
        </div>

        {/* Wheel container */}
        <div 
          className="relative w-[90vw] h-[90vw] max-w-[320px] max-h-[320px] sm:max-w-[450px] sm:max-h-[450px] rounded-full overflow-hidden border-8 border-amber-400/80 shadow-2xl transition-transform duration-[5000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {symbols.map((symbol, index) => (
            <div
              key={index}
              className="absolute w-1/2 h-1/2 origin-bottom-right"
              style={{ transform: `rotate(${index * segmentAngle}deg)` }}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${symbol.color} flex items-start justify-center pt-5 sm:pt-8 text-3xl sm:text-4xl text-white font-bold origin-top-left`}
                style={{
                  transform: `skewY(-${90 - segmentAngle}deg)`,
                }}
              >
                <div style={{ transform: `skewY(${90 - segmentAngle}deg) rotate(${segmentAngle / 2}deg) translateY(-50%)` }}>
                  {symbol.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Center Circle */}
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 border-4 border-amber-300 shadow-inner"></div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 active:scale-100 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isSpinning ? 'Spinning...' : 'Spin for a Blessing'}
      </button>

      {/* Blessing Modal */}
      {selectedBlessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={() => setSelectedBlessing(null)}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 m-4 max-w-md w-full text-center shadow-2xl border border-white/50 animate-fade-in-up"
             onClick={(e) => e.stopPropagation()}
          >
            <div className="text-7xl mb-4 animate-pulse">{selectedBlessing.name}</div>
            <p className="text-2xl font-lora text-gray-700">
              "{selectedBlessing.blessing}"
            </p>
            <button
              onClick={() => setSelectedBlessing(null)}
              className="mt-8 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </main>
  );
};

export default App;
