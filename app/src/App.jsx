import React, { useState, useEffect } from 'react';
import './index.css';

// Mock Data
const DATABASE = [
  { id: 'jagung', name: 'Jagung', type: 'Sumber Energi', protein: 9, fiber: 2, energy: 3300, image: '🌽' },
  { id: 'dedak', name: 'Dedak Padi', type: 'Sumber Energi', protein: 12, fiber: 10, energy: 2500, image: '🌾' },
  { id: 'ampas_tahu', name: 'Ampas Tahu', type: 'Sumber Protein', protein: 25, fiber: 14, energy: 2800, image: '🥣' },
  { id: 'jerami', name: 'Jerami Padi', type: 'Sumber Serat', protein: 4, fiber: 35, energy: 1500, image: '🌾' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scanResult, setScanResult] = useState(null);

  const navigate = (page) => setCurrentPage(page);

  return (
    <div className="app-container">
      {currentPage === 'home' && <Home navigate={navigate} />}
      {currentPage === 'scanner' && <Scanner navigate={navigate} setScanResult={setScanResult} />}
      {currentPage === 'result' && <ScanResult navigate={navigate} result={scanResult} />}
      {currentPage === 'analytics' && <Analytics navigate={navigate} />}
      {currentPage === 'database' && <Database navigate={navigate} />}
      {currentPage === 'ar_mode' && <ARMode navigate={navigate} />}
      {currentPage === 'recommendation' && <Recommendation navigate={navigate} />}
      {currentPage === 'manual_input' && <ManualInput navigate={navigate} setScanResult={setScanResult} />}
    </div>
  );
}

// ================= PAGES =================

function Home({ navigate }) {
  return (
    <div className="screen-container">
      <div className="centered-content" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>NutriScan</h1>
        <p style={{ fontWeight: 500, color: 'var(--primary-light)' }}>Ubah Limbah Jadi Pakan Cerdas</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <button className="btn menu-btn" onClick={() => navigate('scanner')}>
          <span className="icon">📷</span>
          Scan Limbah
        </button>
        <button className="btn menu-btn" onClick={() => navigate('database')}>
          <span className="icon">📚</span>
          Database
        </button>
        <button className="btn menu-btn" onClick={() => navigate('recommendation')}>
          <span className="icon">📋</span>
          Rekomendasi Pakan
        </button>
        <button className="btn menu-btn" onClick={() => navigate('analytics')}>
          <span className="icon">📊</span>
          Kalkulator Nutrisi
        </button>
      </div>
    </div>
  );
}

function Scanner({ navigate, setScanResult }) {
  const [scanning, setScanning] = useState(true);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    // Simulate AI scan delay
    const timer = setTimeout(() => {
      setScanning(false);
      // Mock result
      setTempData({
        material: DATABASE[0], // Jagung
        condition: 'Kering',
        confidence: 94
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!scanning && tempData) {
    return (
      <div className="screen-container">
        <div className="header">
          <button className="back-button" onClick={() => { setScanning(true); setTempData(null); }}>←</button>
          <h2>Pilih Jenis Ternak</h2>
          <div style={{width: '40px'}}></div>
        </div>
        <div className="centered-content" style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tempData.material.image}</div>
          <h3>AI Menemukan: {tempData.material.name}</h3>
          <p style={{ marginBottom: '2rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            Limbah ini akan diolah untuk ternak apa?
          </p>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Sapi Potong', 'Kambing', 'Ayam Pedaging'].map(a => (
              <button 
                key={a}
                className="btn btn-primary"
                onClick={() => {
                  setScanResult({ ...tempData, animal: a });
                  navigate('result');
                }}
              >
                Pakan {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Scan Limbah (AI)</h2>
        <div style={{width: '40px'}}></div>
      </div>
      
      <div className="centered-content" style={{ marginTop: '2rem' }}>
        <div className="camera-view">
          <div style={{ color: 'white', opacity: 0.5 }}>[ Mengaktifkan Kamera... ]</div>
          <div className="scanner-overlay">
            <div className="scan-line"></div>
          </div>
        </div>
        
        <h3>Memindai Objek...</h3>
        <p>Arahkan kamera ke bahan baku/limbah</p>
        
        <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={() => navigate('manual_input')}>
          Input Manual (Bila AI Gagal)
        </button>
      </div>
    </div>
  );
}

function ScanResult({ navigate, result }) {
  if (!result) return <div>Error</div>;

  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Hasil Analisis AI</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <div className="card" style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{result.material.image}</div>
        <h1 style={{ color: 'var(--primary)' }}>{result.material.name}</h1>
        <div><span className="tag">{result.material.type}</span></div>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
          <h4>Klasifikasi AI (Multi-Level)</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span>Kondisi & Variasi:</span>
            <strong>{result.condition}</strong>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Tingkat Kepercayaan</span>
              <span>{result.confidence}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar confidence-bar" style={{ width: `${result.confidence}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Kandungan Per 100g</h3>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <span>Protein Kasar</span>
            <strong>{result.material.protein}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <span>Serat Kasar</span>
            <strong>{result.material.fiber}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <span>Energi Metabolis</span>
            <strong>{result.material.energy} kcal/kg</strong>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('analytics')}>
        Hitung Kebutuhan Pakan
      </button>
      <button className="btn btn-outline" onClick={() => navigate('scanner')}>
        Scan Ulang
      </button>
    </div>
  );
}

function Analytics({ navigate }) {
  const [weight, setWeight] = useState(100);
  const material = DATABASE[0]; // Example: Jagung
  
  const calcProtein = (material.protein * weight / 100).toFixed(1);
  const calcFiber = (material.fiber * weight / 100).toFixed(1);

  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Kalkulator Nutrisi</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="input-group">
          <label className="input-label">Jumlah Bahan (gram)</label>
          <input 
            type="number" 
            className="input-field" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <p style={{ fontSize: '0.85rem', marginTop: '-1rem', marginBottom: '1rem' }}>
          *Bahan aktif: {material.image} {material.name} (Kering)
        </p>
      </div>

      <div className="card">
        <h3>Nutrisi Total</h3>
        
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Protein Total</span>
              <strong>{calcProtein}g</strong>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${Math.min(calcProtein, 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Serat Total</span>
              <strong>{calcFiber}g</strong>
            </div>
            <div className="progress-container">
              <div className="progress-bar confidence-bar" style={{ width: `${Math.min(calcFiber, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate('recommendation')}>
        Lihat Rekomendasi Pakan
      </button>
    </div>
  );
}

function Recommendation({ navigate }) {
  const [animal, setAnimal] = useState('Sapi Potong');

  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Rekomendasi Pakan</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', marginBottom: '1rem', overflowX: 'auto' }}>
        {['Sapi Potong', 'Kambing', 'Ayam Pedaging'].map(a => (
          <button 
            key={a}
            onClick={() => setAnimal(a)}
            className="tag"
            style={{ 
              backgroundColor: animal === a ? 'var(--primary)' : 'var(--background)',
              color: animal === a ? 'white' : 'var(--text-primary)',
              padding: '0.5rem 1rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="card">
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Komposisi Pakan ({animal})
        </h3>
        
        <div className="list-item" style={{ padding: '0.5rem 0' }}>
          <div className="list-content">
            <div className="list-title">Jagung Giling</div>
            <div className="list-subtitle">Sumber Energi</div>
          </div>
          <strong>45%</strong>
        </div>
        
        <div className="list-item" style={{ padding: '0.5rem 0' }}>
          <div className="list-content">
            <div className="list-title">Dedak Padi</div>
            <div className="list-subtitle">Karbohidrat & Serat</div>
          </div>
          <strong>25%</strong>
        </div>
        
        <div className="list-item" style={{ padding: '0.5rem 0' }}>
          <div className="list-content">
            <div className="list-title">Bungkil Kedelai</div>
            <div className="list-subtitle">Protein Tinggi</div>
          </div>
          <strong>15%</strong>
        </div>
        
        <div className="list-item" style={{ padding: '0.5rem 0' }}>
          <div className="list-content">
            <div className="list-title">Ampas Tahu</div>
            <div className="list-subtitle">Protein Tambahan</div>
          </div>
          <strong>10%</strong>
        </div>
        
        <div className="list-item" style={{ padding: '0.5rem 0' }}>
          <div className="list-content">
            <div className="list-title">Mineral & Vitamin</div>
            <div className="list-subtitle">Suplemen</div>
          </div>
          <strong>5%</strong>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>
        <h3>Target Nutrisi Tercapai:</h3>
        <p style={{ color: 'white', opacity: 0.9 }}>Protein: ~16% | TDN: ~70%</p>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('home')}>Selesai</button>
    </div>
  );
}

function ARMode({ navigate }) {
  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Mode AR</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <div className="camera-view" style={{ height: '70vh', marginTop: '1rem' }}>
        <div style={{ color: 'white', opacity: 0.5 }}>[ Kamera Aktif ]</div>
        
        <div className="ar-marker" style={{ top: '30%', left: '40%' }}>
          🌽 Jagung (9% Protein)
        </div>
        
        <div className="ar-marker" style={{ top: '60%', left: '70%' }}>
          🌾 Jerami (35% Serat)
        </div>
      </div>
    </div>
  );
}

function Database({ navigate }) {
  const [search, setSearch] = useState('');

  const filtered = DATABASE.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('home')}>←</button>
        <h2>Database Bahan</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Cari nama bahan/limbah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: '0.5rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="list-item">
            <div className="list-icon">
              {item.image}
            </div>
            <div className="list-content">
              <div className="list-title">{item.name}</div>
              <div className="list-subtitle">Protein: {item.protein}% | Serat: {item.fiber}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManualInput({ navigate, setScanResult }) {
  return (
    <div className="screen-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('scanner')}>←</button>
        <h2>Input Manual</h2>
        <div style={{width: '40px'}}></div>
      </div>

      <p style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Pilih bahan limbah agroindustri jika AI tidak mendeteksi dengan baik.</p>

      <div className="card">
        {DATABASE.map(item => (
          <div 
            key={item.id} 
            className="list-item"
            onClick={() => {
              setScanResult({
                material: item,
                condition: 'Normal',
                confidence: 100 // Manual input is 100%
              });
              navigate('result');
            }}
          >
            <div className="list-icon">{item.image}</div>
            <div className="list-content">
              <div className="list-title">{item.name}</div>
              <div className="list-subtitle">Pilih Bahan ini</div>
            </div>
            <div>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}
