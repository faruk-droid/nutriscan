import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, X } from 'lucide-react';

export default function SelectAnimal() {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
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
      emoji: '🐑',
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
  const goals = [
  {
    id: "hemat",
    title: "💰 Pakan Paling Hemat",
    description: "Biaya serendah mungkin dengan nutrisi tetap terpenuhi.",
    animals: ["all"],
  },
  {
    id: "seimbang",
    title: "⚖️ Nutrisi Seimbang",
    description: "Komposisi nutrisi sesuai kebutuhan ternak.",
    animals: ["all"],
  },
  {
    id: "penggemukan",
    title: "🐄 Penggemukan Cepat",
    description: "Mengoptimalkan protein dan energi.",
    animals: ["all"],
  },
  {
    id: "susu",
    title: "🥛 Produksi Susu",
    description: "Meningkatkan kualitas dan produksi susu.",
    animals: ["sapi", "kambing", "domba"],
  },
  {
    id: "limbah",
    title: "🌿 Maksimalkan Limbah",
    description: "Menggunakan limbah sebanyak mungkin secara aman.",
    animals: ["all"],
  },
];

  const handleContinue = () => {
    if (selectedAnimal && selectedGoal) {

        localStorage.setItem(
            "selectedAnimal",
            selectedAnimal
        );

        localStorage.setItem(
            "selectedGoal",
            selectedGoal
        );

        navigate("/scan");
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

      {/* Bagian Konten (Margin disesuaikan menjadi pt-6 agar rapi setelah Info Box dihapus) */}
      <div className="px-5 pt-6">
        
        {/* Animal Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => {
    setSelectedAnimal(animal.id);
    setShowGoalModal(true);
}}
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
          disabled={!selectedAnimal || !selectedGoal}
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
{selectedAnimal && selectedGoal && (
  <div className="mt-3 p-4 bg-green-50 rounded-xl animate-in fade-in zoom-in duration-300">
    <p className="text-sm text-green-700">
      🐄 Hewan:
      <span className="font-bold ml-1">
        {animals.find((a) => a.id === selectedAnimal)?.name}
      </span>
    </p>

    <p className="text-sm text-green-700 mt-2">
      🎯 Tujuan:
      <span className="font-bold ml-1">
        {goals.find((g) => g.id === selectedGoal)?.title}
      </span>
    </p>
  </div>
)}

{/* ===== GOAL MODAL ===== */}
{showGoalModal && (
  <div className="absolute inset-0 bg-black/40 flex items-end z-50">
    <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">

      <div className="flex items-center justify-between mb-5">

  <div>
    <h2 className="text-xl font-bold">
      🎯 Apa tujuan Anda?
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Pilih tujuan formulasi pakan.
    </p>
  </div>

  <button
    onClick={() => {
      setShowGoalModal(false);
      setSelectedAnimal(null);
    }}
    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
  >
    <X className="w-5 h-5 text-gray-600" />
  </button>

</div>

      <div className="space-y-3">
  {goals
    .filter(
      (goal) =>
        goal.animals.includes("all") ||
        goal.animals.includes(selectedAnimal ?? "")
    )
    .map((goal) => (
      <button
        key={goal.id}
            onClick={() => {
              setSelectedGoal(goal.id);

              localStorage.setItem("selectedAnimal", selectedAnimal!);
              localStorage.setItem("selectedGoal", goal.id);

              navigate("/scan");
            }}
            className="w-full text-left p-4 rounded-2xl border hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <div className="font-semibold">
              {goal.title}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {goal.description}
            </div>
          </button>
        ))}
      </div>

    </div>
  </div>
)}

</div>
</div>

    
  );
}