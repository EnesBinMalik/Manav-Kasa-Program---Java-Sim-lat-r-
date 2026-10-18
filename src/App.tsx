import React, { useState } from 'react';
import {
  BasketQuantities,
  DEFAULT_EXAMPLE_QUANTITIES,
  calculateTotal
} from './types/manav.ts';
import { Navbar } from './components/Navbar.tsx';
import { ConsoleSimulator } from './components/ConsoleSimulator.tsx';
import { PosCounter } from './components/PosCounter.tsx';
import { JavaCodeViewer } from './components/JavaCodeViewer.tsx';
import { HomeworkReport } from './components/HomeworkReport.tsx';
import {
  Terminal,
  Scale,
  Code2,
  FileText,
  UserCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'pos' | 'code' | 'report'>('console');
  const [quantities, setQuantities] = useState<BasketQuantities>(DEFAULT_EXAMPLE_QUANTITIES);

  const total = calculateTotal(quantities);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Context & Signature Kicker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">Java 101 Ödevi</span>
            <span aria-hidden="true">·</span>
            <span>Manav Kasa Programı</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Geliştirici: Enes Öztürk</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">Örnek Doğrulama:</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-800">
              0, 1, 1, 2, 3 kg → 21.68 TL
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Tam Uyumlu</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher on Desktop/Tablet */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'console'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Java Konsol Simülatörü</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'pos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Kasa Tezgâhı & Terazi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Java Kaynak Kodu</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ödev Raporu</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        {activeTab === 'console' && (
          <ConsoleSimulator
            quantities={quantities}
            setQuantities={setQuantities}
          />
        )}

        {activeTab === 'pos' && (
          <PosCounter
            quantities={quantities}
            setQuantities={setQuantities}
          />
        )}

        {activeTab === 'code' && <JavaCodeViewer />}

        {activeTab === 'report' && <HomeworkReport />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Manav Kasa Programı</span>
            <span className="mx-2">·</span>
            <span className="font-medium text-slate-700">Enes Öztürk İmzasıyla</span>
            <span className="mx-2">·</span>
            <span>Java 101 Ödevi</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-600">
              Formül: (A×2.14) + (E×3.67) + (D×1.11) + (M×0.95) + (P×5.00)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
