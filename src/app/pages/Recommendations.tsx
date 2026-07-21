import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Sparkles,
  Bot,
  User,
  Send,
  Leaf,
  ClipboardCheck,
  Calculator,
  GraduationCap,
} from 'lucide-react';
 
type ChatMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};
 
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'ai',
    text:
      'Halo! 👋 Saya NutriAI, asisten cerdas peternakan Anda. Saya bisa bantu jelasin hasil scan, kebutuhan nutrisi ternak, formulasi pakan, Pearson Square, Linear Programming, sampai fermentasi. Mau tanya apa hari ini?',
  },
];
 
const QUICK_PROMPTS = [
  { icon: Leaf, label: 'Limbah Terbaik Bulan Ini', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: ClipboardCheck, label: 'Kriteria Pakan Ternak yang Baik', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Calculator, label: 'Metode Formulasi Pakan Ternak', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: GraduationCap, label: 'Belajar Membuat Pakan Ternak bagi Pemula', color: 'text-teal-600', bg: 'bg-teal-50' },
];
 
// Basis pengetahuan sederhana untuk simulasi respons AI berdasarkan kata kunci.
const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['tongkol', 'jagung'],
    answer:
      'Tongkol jagung aman digunakan sebagai bahan pakan sapi. Kandungan seratnya tinggi, tapi proteinnya relatif rendah (sekitar 2-3%), jadi sebaiknya dikombinasikan dengan sumber protein seperti ampas tahu atau bungkil kedelai agar nutrisinya seimbang.',
  },
  {
    keywords: ['protein', 'sapi', 'pedaging'],
    answer:
      'Sapi pedaging umumnya butuh ransum dengan protein kasar sekitar 12-14% dan energi termetabolis sekitar 2.500-2.700 kcal/kg untuk pertumbuhan optimal. Kombinasi hijauan, dedak, dan bahan berprotein seperti ampas tahu bisa memenuhi kebutuhan ini.',
  },
  {
    keywords: ['silase', 'silage'],
    answer:
      'Cara membuat silase: 1) Cacah bahan hijauan/limbah, 2) Layukan sebentar untuk turunkan kadar air ke 60-70%, 3) Padatkan dalam wadah kedap udara (silo/plastik) agar tidak ada oksigen, 4) Fermentasi selama 21 hari. Hasilnya pakan awet dengan aroma asam segar khas silase.',
  },
  {
    keywords: ['pearson', 'square'],
    answer:
      'Pearson Square adalah metode sederhana untuk mencampur dua bahan pakan agar mencapai target kadar nutrisi tertentu (biasanya protein). Caranya: taruh target di tengah, dua bahan di kiri, lalu hitung selisih diagonal untuk menentukan proporsi masing-masing bahan.',
  },
  {
    keywords: ['linear programming', 'linear', 'programming'],
    answer:
      'Linear Programming adalah metode matematis untuk mencari kombinasi bahan pakan dengan biaya termurah, tapi tetap memenuhi batas minimum-maksimum nutrisi yang dibutuhkan ternak. Cocok dipakai kalau bahan pakannya lebih dari 2-3 jenis, karena Pearson Square jadi kurang praktis.',
  },
  {
    keywords: ['limbah', 'terbaik', 'bulan'],
    answer:
      'Berdasarkan data scan terbaru, limbah dengan ketersediaan dan nilai gizi terbaik bulan ini adalah jerami padi dan ampas tahu. Keduanya melimpah, murah, dan saling melengkapi dari sisi serat dan protein.',
  },
  {
    keywords: ['hemat', 'biaya', 'murah'],
    answer:
      'Tips menghemat biaya pakan: manfaatkan limbah agroindustri lokal (jerami, dedak, ampas tahu), buat silase agar pakan awet dan tidak terbuang, serta gunakan Pearson Square atau Linear Programming supaya formulasi tetap efisien tanpa mengorbankan nutrisi.',
  },
  {
    keywords: ['fermentasi'],
    answer:
      'Fermentasi limbah pakan dilakukan dengan mencacah bahan, menambahkan starter (misalnya EM4), mengatur kadar air sekitar 60%, lalu memeramnya dalam wadah tertutup selama 1-3 minggu. Proses ini meningkatkan kecernaan dan daya simpan pakan.',
  },
  {
    keywords: ['kambing'],
    answer:
      'Kambing butuh ransum dengan protein sekitar 12-14% dan serat lebih tinggi dari sapi karena pencernaannya cocok dengan pakan berserat seperti jerami dan kulit kacang, dikombinasikan sedikit konsentrat untuk energi tambahan.',
  },
  {
    keywords: ['scan', 'hasil'],
    answer:
      'Hasil scan menampilkan estimasi kandungan nutrisi dari limbah yang Anda foto, seperti protein, serat kasar, dan energi. Angka ini bisa langsung dipakai sebagai acuan saat menyusun formulasi pakan di menu Analitik.',
  },
  {
    keywords: ['kriteria', 'pakan ternak yang baik', 'pakan yang baik'],
    answer:
      'Pakan ternak yang baik punya beberapa kriteria: 1) Bergizi seimbang (protein, energi, serat, mineral sesuai kebutuhan ternak), 2) Palatable atau disukai ternak, 3) Higienis dan bebas jamur/racun, 4) Mudah dicerna, 5) Kualitasnya konsisten, dan 6) Harganya terjangkau dibanding manfaatnya.',
  },
  {
    keywords: ['metode formulasi', 'formulasi pakan'],
    answer:
      'Ada beberapa metode formulasi pakan yang umum dipakai: 1) Trial and error untuk skala kecil, 2) Pearson Square untuk mencampur 2 bahan mencapai target protein, 3) Linear Programming untuk banyak bahan dengan biaya termurah, dan 4) Bantuan software/aplikasi seperti NutriScan ini untuk hitung otomatis.',
  },
  {
    keywords: ['pemula', 'belajar membuat pakan', 'belajar'],
    answer:
      'Tips belajar membuat pakan ternak bagi pemula: 1) Kenali dulu jenis ternak dan kebutuhan nutrisinya, 2) Pelajari bahan pakan lokal yang mudah didapat di sekitar Anda, 3) Coba metode sederhana seperti Pearson Square dulu sebelum ke Linear Programming, 4) Mulai dengan skala kecil dan uji coba, lalu 5) Evaluasi pertumbuhan dan kesehatan ternak untuk menyempurnakan formulanya.',
  },
];
 
const DEFAULT_ANSWER =
  'Menarik! Saat ini saya paling jago soal nutrisi ternak, formulasi pakan, Pearson Square, Linear Programming, dan fermentasi limbah. Coba tanyakan salah satu topik itu, atau pilih salah satu Tanya Cepat di atas ya 😊';
 
function generateAiAnswer(userText: string): string {
  const lower = userText.toLowerCase();
  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  );
  return match ? match.answer : DEFAULT_ANSWER;
}
 
export default function Recommendations() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);
 
  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
 
    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
 
    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: generateAiAnswer(trimmed),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, delay);
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
 
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 via-teal-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-5 py-6 rounded-b-3xl shadow-lg shrink-0">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-3 relative">
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">NutriAI</h1>
            <p className="text-teal-50 text-xs">Asisten Cerdas Peternakan</p>
          </div>
        </div>
      </div>
 
      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-3 space-y-3">
        {messages.map((msg) =>
          msg.role === 'ai' ? (
            <div key={msg.id} className="flex justify-start items-end gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[80%] shadow-md">
                <p className="text-xs leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end items-end gap-2">
              <div className="bg-white rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%] shadow-md">
                <p className="text-xs text-gray-800">{msg.text}</p>
              </div>
              <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          )
        )}
 
        {isTyping && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
 
        {/* Quick prompts hanya muncul di awal percakapan */}
        {messages.length === 1 && !isTyping && (
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-gray-500 mb-2 px-1">Tanya Cepat</p>
            <div className="grid grid-cols-2 gap-2.5">
              {QUICK_PROMPTS.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.label}
                    onClick={() => sendMessage(prompt.label)}
                    className="bg-white rounded-2xl shadow-md p-3 text-left hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <div className={`w-7 h-7 ${prompt.bg} rounded-xl flex items-center justify-center mb-2`}>
                      <Icon className={`w-3.5 h-3.5 ${prompt.color}`} />
                    </div>
                    <p className="text-[11px] font-semibold text-gray-700 leading-snug">
                      {prompt.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
 
      {/* Sticky Chat Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-400 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
 