import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Brain, CheckCircle2, Loader2 } from "lucide-react";

export default function AIAnalysisScreen() {
  const navigate = useNavigate();

  const demoType = localStorage.getItem("demoType") || "lp";

  const [step, setStep] = useState(0);

  const steps = [
    "Menganalisis jenis ternak...",
    "Menganalisis tujuan pemeliharaan...",
    "Mengidentifikasi kandungan nutrisi...",
    "Memeriksa bahan pakan yang tersedia...",
    "Memilih metode formulasi terbaik...",
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        navigate("/feed-formulation");
      }, 2000);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <Brain className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          AI Sedang Menganalisis
        </h1>

        <p className="text-gray-500 text-center text-sm mb-8">
          Mohon tunggu sebentar...
        </p>

        <div className="space-y-4">

          {steps.map((item, index) => (

            <div
              key={index}
              className="flex items-center"
            >

              {index < step ? (

                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />

              ) : index === step ? (

                <Loader2 className="w-5 h-5 text-blue-500 mr-3 animate-spin" />

              ) : (

                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />

              )}

              <span
                className={
                  index <= step
                    ? "text-gray-800"
                    : "text-gray-400"
                }
              >
                {item}
              </span>

            </div>

          ))}

        </div>

        
       

      </div>

    </div>
  );
}