import { useNavigate } from 'react-router';
import { Scan, Database, Lightbulb, View } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const menuButtons = [
    {
      title: 'Scan Limbah',
      subtitle: 'Identifikasi limbah dengan AI',
      icon: Scan,
      color: 'from-green-500 to-green-600',
      path: '/select-animal',
    },
    {
      title: 'Database Bahan',
      subtitle: 'Lihat daftar limbah agroindustri',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      path: '/database',
    },
    {
      title: 'Rekomendasi Pakan',
      subtitle: 'Komposisi pakan dari AI',
      icon: Lightbulb,
      color: 'from-yellow-500 to-yellow-600',
      path: '/recommendations',
    },
    {
      title: 'AR Mode',
      subtitle: 'Panduan dengan Augmented Reality',
      icon: View,
      color: 'from-blue-500 to-blue-600',
      path: '/ar-mode',
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex flex-col items-center justify-center p-6 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="mb-5 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Scan className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          NutriScan
        </h1>
        <p className="text-lg text-gray-600">
          Ubah Limbah Jadi Pakan Cerdas
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-md space-y-4">
        {menuButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(button.path)}
              className={`w-full bg-gradient-to-r ${button.color} text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95`}
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Icon className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold mb-0.5">
                    {button.title}
                  </h3>
                  <p className="text-xs opacity-90">
                    {button.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500 text-xs">
        <p>🌾 Powered by AI & AR Technology</p>
      </div>
    </div>
  );
}