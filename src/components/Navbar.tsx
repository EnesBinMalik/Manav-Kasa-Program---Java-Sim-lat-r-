import React, { useState } from 'react';
import { JAVA_SOURCE_CODE } from '../types/manav.ts';
import { Check, Copy, Code2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'console' | 'pos' | 'code' | 'report';
  setActiveTab: (tab: 'console' | 'pos' | 'code' | 'report') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(JAVA_SOURCE_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            MK
          </span>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Manav Kasa Programı
          </span>
        </div>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'console'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Konsol Simülatörü
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'pos'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Kasa & Terazi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'code'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Java Kodu
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'report'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Ödev Raporu
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Java Kodunu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50 px-2 py-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('console')}
          className={`py-1 px-2 whitespace-nowrap rounded ${activeTab === 'console' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Konsol
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pos')}
          className={`py-1 px-2 whitespace-nowrap rounded ${activeTab === 'pos' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Kasa
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`py-1 px-2 whitespace-nowrap rounded ${activeTab === 'code' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Java Kodu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('report')}
          className={`py-1 px-2 whitespace-nowrap rounded ${activeTab === 'report' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Rapor
        </button>
      </div>
    </header>
  );
};
