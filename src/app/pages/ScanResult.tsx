import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function ScanResult() {
  const navigate = useNavigate();
  
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

  const scanData = {
    name: 'Tongkol Jagung',
    specificType: 'Jagung Kering Giling',
    confidence: 94,
    nutrients: [
      { name: 'Protein', value: '8.5%', color: 'bg-blue-500' },
      { name: 'Serat Kasar', value: '32.7%', color: 'bg-green-500' },
      { name: 'Energi', value: '2,800 kcal/kg', color: 'bg-orange-500' },
      { name: 'Lemak', value: '3.1%', color: 'bg-yellow-500' },
    ],
    alternatives: [
      { name: 'Jagung Basah', confidence: 5 },
      { name: 'Jagung Pecah', confidence: 1 },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1758412047861-0e45c6be59fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwYWdyaWN1bHR1cmFsJTIwd2FzdGUlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzc1MDM5NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/scan')}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <CheckCircle className="w-7 h-7 mr-3" />
          <div>
            <h1 className="text-xl font-bold">Hasil Scan</h1>
            <p className="text-green-100 text-xs">Identifikasi berhasil</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-5">
        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-5">
          {/* Image */}
          <div className="relative h-40 bg-gradient-to-br from-green-100 to-yellow-100">
            <ImageWithFallback
              src={scanData.imageUrl}
              alt={scanData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {scanData.confidence}% Match
            </div>
            {/* Animal Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg">
              🎯 {animalNames[selectedAnimal]}
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {scanData.name}
            </h2>
            <div className="flex items-center text-gray-600 mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-xs">{scanData.specificType}</span>
            </div>

            {/* Nutrients */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-700 mb-3 text-sm">Kandungan Nutrisi:</h3>
              {scanData.nutrients.map((nutrient, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 text-xs font-medium">
                      {nutrient.name}
                    </span>
                    <span className="text-gray-900 font-bold text-xs">
                      {nutrient.value}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${nutrient.color} rounded-full`}
                      style={{ width: `${parseFloat(nutrient.value) * 2}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-5">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
            <h3 className="font-bold text-gray-800 text-sm">Alternatif Lain</h3>
          </div>
          <div className="space-y-2">
            {scanData.alternatives.map((alt, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl"
              >
                <span className="text-gray-700 text-xs">{alt.name}</span>
                <span className="text-[10px] text-gray-500">{alt.confidence}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/analytics')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all font-bold text-base hover:scale-105 active:scale-95"
          >
            📊 Hitung Nutrisi
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white text-gray-700 border-2 border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all font-bold text-base hover:scale-105 active:scale-95"
          >
            🏠 Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}