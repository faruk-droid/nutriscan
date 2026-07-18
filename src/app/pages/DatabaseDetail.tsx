import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, BookOpen, ShieldAlert, Award, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Definisi tipe data untuk TS kejelasan struktur
interface WasteDetailInfo {
  name: string;
  category: string;
  protein: string;
  fiber: string;
  imageUrl: string;
  color: string;
  description: string;
  benefit: string;
  processing: string;
}

export default function DatabaseDetail() {
  const { wasteId } = useParams<{ wasteId: string }>();
  const navigate = useNavigate();

  // Data pustaka pakan agroindustri disamakan ID-nya dengan halaman Database.tsx
  const databasePakan: Record<string, WasteDetailInfo> = {
    '1': {
      name: 'Tongkol Jagung',
      category: 'Serealia',
      protein: '8.5%',
      fiber: '32.7%',
      imageUrl: 'https://images.unsplash.com/photo-1758412047861-0e45c6be59fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwYWdyaWN1bHR1cmFsJTIwd2FzdGUlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzc1MDM5NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-yellow-500 to-orange-500',
      description: 'Tongkol jagung merupakan limbah sisa pemisahan biji jagung yang kaya akan hemiselulosa dan selulosa. Meskipun memiliki serat kasar yang tinggi, tongkol jagung sangat potensial dijadikan sumber energi alternatif bagi ternak ruminansia.',
      benefit: 'Meningkatkan aktivitas mikroba rumen, menyediakan sumber energi karbohidrat struktural, dan menekan biaya pakan serat pengganti rumput konvensional.',
      processing: 'Disarankan melalui proses pencacahan mekanis (*chopper*) menjadi ukuran 1-2 cm, kemudian difermentasi (*silase*) menggunakan starter probiotik untuk memecah lignin kasar agar lebih mudah dicerna ternak.'
    },
    '2': {
      name: 'Jerami Padi',
      category: 'Serealia',
      protein: '4.2%',
      fiber: '38.5%',
      imageUrl: 'https://images.unsplash.com/photo-1752253509855-e2dd7224184b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZmllbGQlMjB3aGVhdCUyMHdhc3RlfGVufDF8fHx8MTc3NTAzOTYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-teal-500 to-cyan-500',
      description: 'Jerami padi diperoleh melimpah pasca panen raya pertanian. Secara alami memiliki kecernaan yang rendah akibat tingginya kandungan silika dan lignin, namun sangat awet disimpan untuk cadangan pakan musim kemarau.',
      benefit: 'Sebagai pakan serat pengisi volume lambung ternak (*bulk*) dan merangsang proses *ruminasi* (mengunyah kembali) pada sapi maupun kambing.',
      processing: 'Ammoniasi menggunakan urea atau fermentasi dengan EM4 sangat direkomendasikan untuk meningkatkan kadar protein kasar (bisa naik hingga 7-8%) sekaligus melunakkan tekstur jerami yang kaku.'
    },
    '3': {
      name: 'Dedak Padi',
      category: 'Penggilingan',
      protein: '12.5%',
      fiber: '11.4%',
      imageUrl: 'https://images.unsplash.com/photo-1695712325265-628a2a136304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyaWNlJTIwaHVzayUyMGFncmljdWx0dXJhbCUyMHJlc2lkdWV8ZW58MXx8fHwxNzc1MDM5NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-amber-500 to-orange-500',
      description: 'Dedak padi atau bekatul adalah hasil samping penggilingan padi bulir. Bahan ini merupakan salah satu pakan konsentrat paling populer di Indonesia karena memiliki densitas energi tinggi serta palatabilitas (tingkat kesukaan ternak) yang sangat baik.',
      benefit: 'Sumber energi utama, kaya akan vitamin B-kompleks, serta mengandung fosfor yang baik untuk pembentukan struktur tulang ternak.',
      processing: 'Bisa langsung dicampurkan ke dalam formulasi pakan konsentrat kering (*mash*) atau dicampur air hangat sebagai pakan komboran basah harian.'
    },
    '4': {
      name: 'Ampas Tahu',
      category: 'Kacang-kacangan',
      protein: '24.3%',
      fiber: '18.2%',
      imageUrl: 'https://images.unsplash.com/photo-1758158286655-f0d93d86e174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwYWdyaWN1bHR1cmElMjBvcmdhbmljfGVufDF8fHx8MTc3NTAzOTYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-600 to-teal-600',
      description: 'Ampas tahu adalah limbah basah dari proses ekstraksi kedelai pada industri pembuatan tahu. Nilai nutrisinya sangat tinggi terutama sebagai sumber protein murah bagi peternakan rakyat.',
      benefit: 'Sangat baik untuk mempercepat laju pertumbuhan bobot badan harian (ADG) ternak pedaging serta meningkatkan produksi susu ternak perah.',
      processing: 'Karena kadar airnya sangat tinggi (>80%), ampas tahu cepat membusuk (hanya bertahan 2-3 hari). Perlu diperas menggunakan kain, dijemur, atau difermentasi kering agar bisa disimpan hingga beberapa minggu.'
    },
    '5': {
      name: 'Kulit Kacang',
      category: 'Kacang-kacangan',
      protein: '15.8%',
      fiber: '42.3%',
      imageUrl: 'https://images.unsplash.com/photo-1758612153921-9525532663d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBmZWVkJTIwbnV0cml0aW9uJTIwZ3JhaW5zfGVufDF8fHx8MTc3NTAzOTYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-500 to-red-500',
      description: 'Kulit kacang tanah didapatkan dari limbah pengupasan industri makanan ringan. Teksturnya cukup kering dan berserat tinggi namun menyimpan kandungan protein sisa polong yang lumayan baik.',
      benefit: 'Sebagai alternatif pakan serat pengisi, membantu menjaga kestabilan pH di dalam rumen agar terhindar dari kembung (*bloat*).',
      processing: 'Wajib digiling halus menggunakan *hammer mill* terlebih dahulu agar menjadi tepung kulit kacang sebelum dicampur rata ke dalam formulasi pakan konsentrat.'
    }
  };

  // Mengambil data spesifik berdasarkan ID di URL parameter
  const currentWaste = wasteId ? databasePakan[wasteId] : null;

  // Proteksi jika user menembak ID asal di URL browser
  if (!currentWaste) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-5 text-white">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold mb-2">Bahan Tidak Ditemukan</h2>
        <p className="text-gray-400 text-sm mb-6 text-center max-w-xs">
          ID bahan pakan agroindustri tidak tercatat di dalam database sistem NutriScan.
        </p>
        <button
          onClick={() => navigate('/database')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          Kembali ke Database
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 pb-12">
      {/* Top Navigation */}
      <div className="p-4 flex items-center bg-white shadow-sm sticky top-0 z-30">
        <button
          onClick={() => navigate('/database')}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-gray-800 text-base">Detail Edukasi Pakan</h2>
          <p className="text-[10px] text-gray-500">Katalog NutriScan Agroindustri</p>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-60 w-full bg-gray-300 overflow-hidden shadow-md">
        <ImageWithFallback
          src={currentWaste.imageUrl}
          alt={currentWaste.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${currentWaste.color} opacity-40 mix-blend-multiply`}></div>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <span className="text-[10px] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
            📂 {currentWaste.category}
          </span>
          <h1 className="text-2xl font-black mt-2 drop-shadow-md">
            {currentWaste.name}
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-5 mt-5 space-y-4">
        
        {/* Nutrients Grid Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex justify-around border border-gray-100">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Protein Kasar</p>
            <span className="text-xl font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl block">
              {currentWaste.protein}
            </span>
          </div>
          <div className="w-[1px] bg-gray-200 self-stretch"></div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Serat Kasar</p>
            <span className="text-xl font-extrabold text-green-600 bg-green-50 px-3 py-1 rounded-xl block">
              {currentWaste.fiber}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <div className="flex items-center mb-3 text-gray-800 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-teal-500 mr-2" />
            <h3>Deskripsi Bahan</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed text-justify">
            {currentWaste.description}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <div className="flex items-center mb-3 text-gray-800 font-bold text-sm">
            <Award className="w-4 h-4 text-orange-500 mr-2" />
            <h3>Manfaat pada Ternak</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed text-justify">
            {currentWaste.benefit}
          </p>
        </div>

        {/* Processing Instruction Section */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-md p-5 border border-teal-100">
          <div className="flex items-center mb-3 text-teal-900 font-bold text-sm">
            <Info className="w-4 h-4 text-teal-600 mr-2" />
            <h3>Rekomendasi Pengolahan</h3>
          </div>
          <p className="text-xs text-teal-800 leading-relaxed text-justify bg-white/60 p-3 rounded-xl border border-teal-50">
            {currentWaste.processing}
          </p>
        </div>
      </div>
    </div>
  );
}