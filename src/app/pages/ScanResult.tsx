import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function ScanResult() {
  const navigate = useNavigate();
  
  // Ambil data hewan yang dipilih
  const selectedAnimal = localStorage.getItem('selectedAnimal') || 'sapi';
  const selectedGoal = localStorage.getItem('selectedGoal') || 'hemat';

const goalNames: Record<string, string> = {
  hemat: 'Pakan Paling Hemat',
  seimbang: 'Nutrisi Seimbang',
  penggemukan: 'Penggemukan Cepat',
  susu: 'Produksi Susu',
  limbah: 'Maksimalkan Limbah',
};
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
          </div>
        </div>
      </div>

      <div className="px-5 -mt-2">
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

  <h2 className="text-2xl font-bold text-gray-800 mb-2">
    {scanData.name}
  </h2>

  {/* Jenis Limbah */}
  <div className="flex items-center text-gray-600 mb-5">
    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
    <span className="text-sm font-medium">
      {scanData.specificType}
    </span>
  </div>

  {/* Card Rekomendasi */}
  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mb-6">

    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-2xl mr-4">
        🌽
      </div>

      <div>
        <p className="text-xs text-gray-500">
          Jenis Limbah
        </p>

        <h3 className="font-bold text-gray-800">
          {scanData.specificType}
        </h3>
      </div>
    </div>

    <div className="border-t border-green-200 my-4"></div>

    <div className="flex items-start">

      <div className="text-3xl mr-3">
        ✅
      </div>

      <div>

        <h4 className="font-bold text-green-700 text-lg mb-3">
          Direkomendasikan Untuk
        </h4>

        <div className="flex items-center mb-2">
          <span className="mr-2 text-lg">🐄</span>
          <span className="font-medium text-gray-700">
            {animalNames[selectedAnimal]}
          </span>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-lg">🎯</span>
          <span className="font-medium text-gray-700">
            {goalNames[selectedGoal]}
          </span>
        </div>

      </div>

    </div>

  </div>

  {/* Nutrients */}
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
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/ai-analysis')}
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