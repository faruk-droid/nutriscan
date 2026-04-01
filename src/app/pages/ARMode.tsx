import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Camera, Sparkles, Info } from 'lucide-react';

export default function ARMode() {
  const navigate = useNavigate();
  const [isARActive, setIsARActive] = useState(false);

  const arLabels = [
    { name: 'Tongkol Jagung', x: 30, y: 40, protein: '8.5%', fiber: '32.7%' },
    { name: 'Jerami Padi', x: 60, y: 55, protein: '4.2%', fiber: '38.5%' },
  ];

  return (
    <div className="h-full bg-gray-900 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Title */}
      <div className="absolute top-4 left-0 right-0 z-10 text-center px-5">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-3 inline-block">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-white font-bold text-sm">AR Mode</span>
          </div>
        </div>
      </div>

      {/* Camera View Mockup */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
        <Camera className="w-32 h-32 text-white/10" strokeWidth={1} />
      </div>

      {/* AR Overlay Labels */}
      {isARActive && (
        <div className="absolute inset-0 z-10">
          {arLabels.map((label, index) => (
            <div
              key={index}
              className="absolute animate-in fade-in zoom-in duration-500"
              style={{
                left: `${label.x}%`,
                top: `${label.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pointer */}
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50 mb-2 mx-auto"></div>

              {/* Label Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl min-w-[200px]">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                  {label.name}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Protein:</span>
                    <span className="font-bold text-blue-600">{label.protein}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Serat:</span>
                    <span className="font-bold text-green-600">{label.fiber}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-1/3 left-0 right-0 z-10 px-6">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 max-w-md mx-auto">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold mb-2">Cara Menggunakan AR</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>1. Arahkan kamera ke limbah agroindustri</li>
                <li>2. Tekan tombol AR untuk mulai scan</li>
                <li>3. Label nutrisi akan muncul otomatis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AR Toggle Button */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center px-6">
        <button
          onClick={() => setIsARActive(!isARActive)}
          className={`px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center ${
            isARActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
          }`}
        >
          {isARActive ? (
            <>
              <span className="w-3 h-3 bg-white rounded-full animate-pulse mr-3"></span>
              Matikan AR
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 mr-2" />
              Aktifkan AR
            </>
          )}
        </button>
      </div>

      {/* Feature Cards */}
      <div className="absolute bottom-40 left-6 right-6 z-10 flex gap-3">
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-3">
          <p className="text-white text-xs font-medium text-center">
            🎯 Real-time Detection
          </p>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-3">
          <p className="text-white text-xs font-medium text-center">
            📊 Instant Analytics
          </p>
        </div>
      </div>

      {/* Top Info Bar */}
      {isARActive && (
        <div className="absolute top-24 left-6 right-6 z-10">
          <div className="bg-green-500 text-white rounded-xl p-3 text-center shadow-lg">
            <p className="text-sm font-bold">
              ✅ AR Aktif - {arLabels.length} Bahan Terdeteksi
            </p>
          </div>
        </div>
      )}
    </div>
  );
}