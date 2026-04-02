import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, ArrowLeft, Zap } from 'lucide-react';

export default function ScanScreen() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  
  // Ambil data hewan yang dipilih
  const selectedAnimal = localStorage.getItem('selectedAnimal') || 'sapi';
  const animalNames: Record<string, string> = {
    sapi: 'Sapi Pedaging',
    kambing: 'Kambing',
    domba: 'Domba',
    ayam: 'Ayam Petelur',
    bebek: 'Bebek',
    kelinci: 'Kelinci',
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulasi proses scanning
    setTimeout(() => {
      navigate('/scan-result');
    }, 2000);
  };

  return (
    <div className="h-full bg-gray-900 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate('/select-animal')}
        className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Animal Info Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-bold">
          🎯 {animalNames[selectedAnimal]}
        </div>
      </div>

      {/* Camera View Mockup */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 z-10 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>

          {/* Scanning Frame */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-80 h-80 border-4 border-green-500 rounded-3xl relative">
              {/* Corner Markers */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

              {/* Scanning Line */}
              {isScanning && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-lg shadow-green-500 animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Camera Background Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
            <Camera className="w-32 h-32 text-white/10" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/4 left-0 right-0 z-10 text-center px-6">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 inline-block">
          <p className="text-white text-lg">
            {isScanning ? '🔍 Memindai limbah...' : '📸 Arahkan kamera ke limbah agroindustri'}
          </p>
        </div>
      </div>

      {/* Scan Button */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center px-6">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isScanning ? (
            <Zap className="w-10 h-10 text-white animate-pulse" />
          ) : (
            <Camera className="w-10 h-10 text-white" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-40 left-0 right-0 z-10 text-center">
        <p className="text-white/70 text-sm">
          AI akan mengidentifikasi jenis limbah secara otomatis
        </p>
      </div>
    </div>
  );
}