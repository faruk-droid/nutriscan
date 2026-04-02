import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Database() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const wasteData = [
    {
      id: 1,
      name: 'Tongkol Jagung',
      category: 'Serealia',
      protein: '8.5%',
      fiber: '32.7%',
      imageUrl: 'https://images.unsplash.com/photo-1758412047861-0e45c6be59fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwYWdyaWN1bHR1cmFsJTIwd2FzdGUlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzc1MDM5NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 2,
      name: 'Jerami Padi',
      category: 'Serealia',
      protein: '4.2%',
      fiber: '38.5%',
      imageUrl: 'https://images.unsplash.com/photo-1752253509855-e2dd7224184b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZmllbGQlMjB3aGVhdCUyMHdhc3RlfGVufDF8fHx8MTc3NTAzOTYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 3,
      name: 'Dedak Padi',
      category: 'Penggilingan',
      protein: '12.5%',
      fiber: '11.4%',
      imageUrl: 'https://images.unsplash.com/photo-1695712325265-628a2a136304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwaHVzayUyMGFncmljdWx0dXJhbCUyMHJlc2lkdWV8ZW58MXx8fHwxNzc1MDM5NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      name: 'Ampas Tahu',
      category: 'Kacang-kacangan',
      protein: '24.3%',
      fiber: '18.2%',
      imageUrl: 'https://images.unsplash.com/photo-1758158286655-f0d93d86e174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwYWdyaWN1bHR1cmUlMjBvcmdhbmljfGVufDF8fHx8MTc3NTAzOTYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-600 to-teal-600',
    },
    {
      id: 5,
      name: 'Kulit Kacang',
      category: 'Kacang-kacangan',
      protein: '15.8%',
      fiber: '42.3%',
      imageUrl: 'https://images.unsplash.com/photo-1758612153921-9525532663d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBmZWVkJTIwbnV0cml0aW9uJTIwZ3JhaW5zfGVufDF8fHx8MTc3NTAzOTYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const filteredData = wasteData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Database Bahan</h1>
        <p className="text-orange-100 text-xs">
          {wasteData.length} limbah agroindustri terdaftar
        </p>
      </div>

      <div className="px-5 -mt-4">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-5 flex items-center">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari limbah atau kategori..."
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => navigate('/scan-result')}
            >
              <div className="flex">
                {/* Image */}
                <div className={`w-24 h-24 bg-gradient-to-br ${item.color} relative overflow-hidden flex-shrink-0`}>
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mb-2">
                      📂 {item.category}
                    </p>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
                        Protein: {item.protein}
                      </span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                        Serat: {item.fiber}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Tidak ada hasil ditemukan</p>
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