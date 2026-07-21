import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  DollarSign,
  ChefHat,
} from "lucide-react";

export default function FeedFormulation() {
  const navigate = useNavigate();

  const selectedAnimal =
    localStorage.getItem("selectedAnimal") || "sapi";

  const selectedGoal =
    localStorage.getItem("selectedGoal") || "hemat";

  const animalNames: Record<string, string> = {
    sapi: "🐄 Sapi Pedaging",
    kambing: "🐐 Kambing",
    domba: "🐑 Domba",
    ayam: "🐔 Ayam Petelur",
    bebek: "🦆 Bebek",
    kelinci: "🐰 Kelinci",
  };

  const goalNames: Record<string, string> = {
    hemat: "💰 Pakan Paling Hemat",
    seimbang: "⚖️ Nutrisi Seimbang",
    penggemukan: "🐄 Penggemukan Cepat",
    susu: "🥛 Produksi Susu",
    limbah: "🌿 Maksimalkan Limbah",
  };

  const formulation = [
    {
      name: "🌽 Tongkol Jagung",
      percent: 35,
    },
    {
      name: "🟫 Ampas Tahu",
      percent: 30,
    },
    {
      name: "🟨 Dedak",
      percent: 20,
    },
    {
      name: "🟩 Bungkil Kedelai",
      percent: 15,
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">

        <button
          onClick={() => navigate("/scan-result")}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center">

          <Brain className="w-7 h-7 mr-3" />

          <div>

            <h1 className="text-xl font-bold">
              Formulasi Pakan AI
            </h1>

            <p className="text-green-100 text-xs">
              Komposisi otomatis berdasarkan kebutuhan ternak
            </p>

          </div>

        </div>

      </div>

      <div className="px-5 -mt-5 space-y-5">

        {/* TARGET */}

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <h2 className="font-bold text-lg mb-4">

            🎯 Target Formulasi

          </h2>

          <div className="space-y-2">

            <p>

              {animalNames[selectedAnimal]}

            </p>

            <p>

              {goalNames[selectedGoal]}

            </p>

          </div>

        </div>

{/* Metode Formulasi */}
<div className="bg-white rounded-3xl shadow-xl p-5">
  <h2 className="font-bold text-lg mb-4">
    🧠 Metode Formulasi
  </h2>

  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">

    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-gray-700 text-gray-600">
        Metode yang Digunakan  adalah <b>Linear Programming </b> 
      </span>
    </div>

    <p className="text-sm text-gray-700 leading-relaxed mb-4">
      Sistem menggunakan <b>Linear Programming</b> karena formulasi
      melibatkan beberapa bahan pakan dengan berbagai target nutrisi,
      seperti protein, energi, dan serat. Metode ini membantu
      memperoleh komposisi pakan yang memenuhi kebutuhan ternak
      sekaligus menghasilkan biaya yang lebih efisien.
    </p>

    <div className="grid grid-cols-2 gap-3">

      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <p className="text-xl">🎯</p>
        <p className="text-xs font-semibold mt-2">
          Nutrisi Optimal
        </p>
      </div>

      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <p className="text-xl">💰</p>
        <p className="text-xs font-semibold mt-2">
          Biaya Minimum
        </p>
      </div>

      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <p className="text-xl">🌽</p>
        <p className="text-xs font-semibold mt-2">
          Multi Bahan
        </p>
      </div>

      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <p className="text-xl">⚡</p>
        <p className="text-xs font-semibold mt-2">
          Perhitungan Cepat
        </p>
      </div>

    </div>

  </div>
</div>

        {/* KOMPOSISI */}

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <h2 className="font-bold text-lg mb-4">

            📋 Komposisi Pakan

          </h2>

          {formulation.map((item, index) => (

            <div
              key={index}
              className="mb-4"
            >

              <div className="flex justify-between mb-2">

                <span className="font-medium">

                  {item.name}

                </span>

                <span className="font-bold">

                  {item.percent}%

                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${item.percent}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI */}

        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5">

          <h2 className="font-bold text-blue-700 mb-3">

            🤖 Analisis AI

          </h2>

          <p className="text-sm text-gray-700 leading-relaxed">

            Berdasarkan jenis ternak dan tujuan yang dipilih,
            tongkol jagung dimanfaatkan sebagai sumber serat.
            Ampas tahu digunakan untuk meningkatkan protein,
            dedak sebagai sumber energi,
            sedangkan bungkil kedelai membantu memenuhi target
            protein sehingga formulasi menjadi lebih seimbang.

          </p>

        </div>

        {/* TARGET NUTRISI */}

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <h2 className="font-bold text-lg mb-4">

            ✅ Target Nutrisi

          </h2>

          <div className="space-y-3">

            {[
              "Protein",
              "Energi",
              "Serat",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center justify-between"
              >

                <span>

                  {item}

                </span>

                <CheckCircle className="text-green-500 w-5 h-5" />

              </div>

            ))}

          </div>

        </div>
        {/* CARA MEMBUAT */}

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <div className="flex items-center mb-4">

            <ChefHat className="mr-2 text-orange-500" />

            <h2 className="font-bold">

              Cara Membuat

            </h2>

          </div>

          <ol className="list-decimal ml-5 space-y-2 text-sm text-gray-700">

            <li>Haluskan tongkol jagung.</li>

            <li>Campurkan dedak dan bungkil kedelai.</li>

            <li>Tambahkan ampas tahu.</li>

            <li>Aduk hingga homogen.</li>

            <li>Simpan di tempat yang kering.</li>

            <li>Berikan sesuai kebutuhan ternak.</li>

          </ol>

        </div>

        <button
          onClick={() => navigate("/analytics")}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-4 font-bold shadow-lg hover:scale-105 transition"
        >
          📊 Lanjut Kalkulasi Nutrisi
        </button>

      </div>
    </div>
  );
}