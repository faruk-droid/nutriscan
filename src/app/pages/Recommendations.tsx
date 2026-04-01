import { useNavigate } from 'react-router';
import { ArrowLeft, Lightbulb, CheckCircle } from 'lucide-react';

export default function Recommendations() {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      animalType: 'Sapi Pedaging',
      composition: [
        { name: 'Tongkol Jagung', amount: '40%', color: 'bg-yellow-500' },
        { name: 'Jerami Padi', amount: '30%', color: 'bg-green-500' },
        { name: 'Dedak Padi', amount: '20%', color: 'bg-orange-500' },
        { name: 'Ampas Tahu', amount: '10%', color: 'bg-teal-500' },
      ],
      totalProtein: '14.2%',
      totalEnergy: '2,650 kcal/kg',
      benefits: ['Pertumbuhan optimal', 'Efisiensi pakan tinggi', 'Biaya rendah'],
    },
    {
      id: 2,
      animalType: 'Kambing',
      composition: [
        { name: 'Jerami Padi', amount: '45%', color: 'bg-green-500' },
        { name: 'Dedak Padi', amount: '25%', color: 'bg-orange-500' },
        { name: 'Kulit Kacang', amount: '20%', color: 'bg-red-500' },
        { name: 'Ampas Tahu', amount: '10%', color: 'bg-teal-500' },
      ],
      totalProtein: '13.5%',
      totalEnergy: '2,480 kcal/kg',
      benefits: ['Pencernaan baik', 'Kesehatan optimal', 'Hemat biaya'],
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <Lightbulb className="w-7 h-7 mr-3" />
          <div>
            <h1 className="text-xl font-bold">Rekomendasi Pakan</h1>
            <p className="text-yellow-100 text-xs">Komposisi pakan dari AI</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-5">
        {/* Recommendations List */}
        <div className="space-y-5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Animal Type Header */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4">
                <h2 className="text-xl font-bold mb-0.5">🐄 {rec.animalType}</h2>
                <p className="text-xs text-yellow-100">Formula pakan optimal</p>
              </div>

              <div className="p-5">
                {/* Composition */}
                <h3 className="font-bold text-gray-800 mb-3 text-sm">Komposisi Bahan:</h3>
                <div className="space-y-2.5 mb-4">
                  {rec.composition.map((comp, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-700 text-xs font-medium">
                          {comp.name}
                        </span>
                        <span className="text-gray-900 font-bold text-xs">
                          {comp.amount}
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${comp.color}`}
                          style={{ width: comp.amount }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Nutrients */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-[10px] text-blue-600 mb-1">Total Protein</p>
                    <p className="text-xl font-bold text-blue-700">
                      {rec.totalProtein}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="text-[10px] text-orange-600 mb-1">Total Energi</p>
                    <p className="text-base font-bold text-orange-700">
                      {rec.totalEnergy}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <h3 className="font-bold text-gray-800 mb-2.5 text-sm">Keuntungan:</h3>
                <div className="space-y-2">
                  {rec.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate('/analytics')}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-3 font-bold text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  📊 Hitung Nutrisi
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mt-5">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">
                💡 Tentang Rekomendasi
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Komposisi pakan ini dibuat berdasarkan analisis AI dari kebutuhan nutrisi
                ternak, ketersediaan limbah agroindustri, dan efisiensi biaya pakan.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-5">
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