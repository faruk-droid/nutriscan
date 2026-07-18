import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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

  const handleCardClick = () => {
    setIsScanning(true); 
    
    setTimeout(() => {
      navigate('/scan-result');
    }, 1000);
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
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-lg shadow-green-500 animate-bounce"></div>
              )}
            </div>
          </div>

          {/* FOTO TONGKOL JAGUNG SEBAGAI BACKGROUND KAMERA */}
          <div className="w-full h-full relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758412047861-0e45c6be59fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwYWdyaWN1bHR1cmFsJTIwd2FzdGUlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzc1MDM5NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tongkol Jagung Background"
              className="w-full h-full object-cover"
            />
            {/* Overlay gelap tipis agar elemen UI di atas gambar (seperti label card) tetap kontras dan mudah dibaca */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* INTERAKTIF LABEL CARD: Tongkol Jagung */}
      <div
        className="absolute z-20 cursor-pointer animate-in fade-in zoom-in duration-500"
        style={{
          left: '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={handleCardClick}
      >
        {/* Pointer Dot */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50 mb-2 mx-auto"></div>

        {/* Card Body */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl min-w-[180px] hover:scale-105 transition-all active:scale-95 text-center">
          <h3 className="font-bold text-gray-800 mb-1 text-sm">
            🌽 Tongkol Jagung
          </h3>
          <p className="text-[10px] text-green-600 font-semibold animate-pulse">
            {isScanning ? 'Memindai...' : 'Klik untuk Scan'}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/9 left-0 right-0 z-10 text-center px-6">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 inline-block">
          <p className="text-white text-lg">
            {isScanning ? 'Tunggu Sebentar...' : '📸 Sentuh objek untuk mulai memindai'}
          </p>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-16 left-0 right-0 z-10 text-center">
        <p className="text-white/70 text-sm">
          Arahkan kamera ke limbah, lalu ketuk label yang muncul
        </p>
      </div>
    </div>
  );
}