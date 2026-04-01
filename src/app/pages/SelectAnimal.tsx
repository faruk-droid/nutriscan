import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function SelectAnimal() {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const animals = [
    {
      id: 'sapi',
      name: 'Sapi Pedaging',
      emoji: '🐄',
      description: 'Pakan untuk pertumbuhan optimal',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'kambing',
      name: 'Kambing',
      emoji: '🐐',
      description: 'Pakan dengan serat tinggi',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'domba',
      name: 'Domba',
      emoji: '양',
      description: 'Pakan bernutrisi seimbang',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'ayam',
      name: 'Ayam Petelur',
      emoji: '🐔',
      description: 'Pakan untuk produksi telur',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      id: 'bebek',
      name: 'Bebek',
      emoji: '🦆',
      description: 'Pakan unggas air',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'kelinci',
      name: 'Kelinci',
      emoji: '🐰',
      description: 'Pakan berbasis sayuran',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const handleContinue = () => {
    if (selectedAnimal) {
      // Simpan data hewan ke localStorage atau state management
      localStorage.setItem('selectedAnimal', selectedAnimal);
      navigate('/scan');
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold mb-1">Pilih Hewan Ternak</h1>
          <p className="text-green-100 text-xs">
            Pilih jenis ternak untuk rekomendasi pakan yang tepat
          </p>
        </div>
      </div>

      <div className="px-5 -mt-4">
        {/* Info Box */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-5">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm">Kenapa Pilih Hewan?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Setiap hewan ternak memiliki kebutuhan nutrisi yang berbeda. 
                AI akan menyesuaikan rekomendasi pakan berdasarkan pilihan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => setSelectedAnimal(animal.id)}
              className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                selectedAnimal === animal.id
                  ? 'ring-4 ring-green-500 shadow-2xl scale-105'
                  : ''
              }`}
            >
              <div className={`bg-gradient-to-br ${animal.color} p-5 text-white`}>
                <div className="text-4xl mb-2">{animal.emoji}</div>
                <h3 className="font-bold text-base mb-0.5">{animal.name}</h3>
                <p className="text-[10px] opacity-90">{animal.description}</p>
              </div>
              
              {/* Selected Indicator */}
              {selectedAnimal === animal.id && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedAnimal}
          className={`w-full rounded-2xl p-5 shadow-lg font-bold text-base transition-all flex items-center justify-center ${
            selectedAnimal
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedAnimal ? (
            <>
              Lanjutkan Scan
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            'Pilih Hewan Ternak Terlebih Dahulu'
          )}
        </button>

        {/* Selected Info */}
        {selectedAnimal && (
          <div className="mt-3 p-3 bg-green-50 rounded-xl text-center animate-in fade-in zoom-in duration-300">
            <p className="text-xs text-green-700">
              ✅ Anda memilih:{' '}
              <span className="font-bold">
                {animals.find((a) => a.id === selectedAnimal)?.name}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}