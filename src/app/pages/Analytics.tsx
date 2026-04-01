import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calculator, TrendingUp } from 'lucide-react';
import { Progress } from '../components/ui/progress';

export default function Analytics() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  // Data contoh untuk jagung kering
  const baseNutrients = {
    protein: 8.5, // per 100g
    fiber: 32.7,
    fat: 3.1,
    energy: 280, // per 100g (kcal)
  };

  const calculateNutrients = (grams: number) => {
    const multiplier = grams / 100;
    return {
      protein: (baseNutrients.protein * multiplier).toFixed(1),
      fiber: (baseNutrients.fiber * multiplier).toFixed(1),
      fat: (baseNutrients.fat * multiplier).toFixed(1),
      energy: Math.round(baseNutrients.energy * multiplier),
    };
  };

  const calculated = amount ? calculateNutrients(parseFloat(amount)) : null;

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <Calculator className="w-7 h-7 mr-3" />
          <div>
            <h1 className="text-xl font-bold">Kalkulator Nutrisi</h1>
            <p className="text-orange-100 text-xs">Hitung kandungan pakan</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-5">
        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl p-5 mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Tongkol Jagung (Kering)
          </h2>

          <label className="block mb-2 text-gray-700 font-medium text-sm">
            Jumlah Bahan (gram):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Contoh: 500"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-lg font-bold text-center focus:border-orange-500 focus:outline-none transition-all"
          />

          {amount && (
            <div className="mt-3 p-3 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700">
                💡 <span className="font-medium">{amount}g</span> tongkol jagung akan menghasilkan:
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {calculated && (
          <div className="space-y-3 animate-in fade-in duration-500">
            {/* Protein Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">Protein</h3>
                    <p className="text-[10px] text-gray-500">Pembentuk otot</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {calculated.protein}g
                </span>
              </div>
              <Progress value={parseFloat(calculated.protein)} className="h-2" />
            </div>

            {/* Fiber Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">Serat Kasar</h3>
                    <p className="text-[10px] text-gray-500">Kesehatan pencernaan</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {calculated.fiber}g
                </span>
              </div>
              <Progress value={parseFloat(calculated.fiber)} className="h-2" />
            </div>

            {/* Fat Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">Lemak</h3>
                    <p className="text-[10px] text-gray-500">Sumber energi</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {calculated.fat}g
                </span>
              </div>
              <Progress value={parseFloat(calculated.fat) * 10} className="h-2" />
            </div>

            {/* Energy Card */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-5 text-white">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-bold text-lg">Total Energi</h3>
                  <p className="text-xs text-orange-100">Kalori metabolis</p>
                </div>
                <span className="text-4xl font-bold">
                  {calculated.energy}
                </span>
              </div>
              <p className="text-right text-xs opacity-90">kcal</p>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!amount && (
          <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
            <Calculator className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2 text-sm">
              Masukkan Jumlah Bahan
            </h3>
            <p className="text-gray-600 text-xs">
              Sistem akan menghitung kandungan nutrisi secara otomatis
            </p>
          </div>
        )}

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