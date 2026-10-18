import React, { useState } from 'react';
import { JAVA_SOURCE_CODE } from '../types/manav.ts';
import {
  Copy,
  Check,
  Download,
  Code2,
  FileCode,
  BookOpen,
  Info,
  CheckCircle2
} from 'lucide-react';

export const JavaCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JAVA_SOURCE_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JAVA_SOURCE_CODE], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Main.java';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const codeLines = JAVA_SOURCE_CODE.trim().split('\n');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span>TEMİZ JAVA MİMARİSİ</span>
            <span>·</span>
            <span>JDK 8 / 11 / 17 / 21+ UYUMLU</span>
            <span>·</span>
            <span>GELİŞTİRİCİ: ENES ÖZTÜRK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Java Kaynak Kodu (Main.java)
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Enes Öztürk imzalı, standart kütüphaneler kullanılarak yazılmış, tam açıklamalı ve akademik ödev standartlarına uygun kaynak kod.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Main.java İndir</span>
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* IDE Header */}
        <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <div className="flex items-center gap-1.5 ml-2 bg-[#1e1e1e] px-3 py-1 rounded text-slate-200 text-xs border border-slate-700">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Main.java</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-sans">
            Yazar: Enes Öztürk
          </span>
        </div>

        {/* Code Lines with line numbers */}
        <div className="p-4 sm:p-5 overflow-x-auto max-h-[560px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');
                const isImport = line.trim().startsWith('import ');
                const isMethod = line.includes('public static void main') || line.includes('class Main');
                const isPrint = line.includes('System.out.');

                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="w-10 sm:w-12 text-right pr-4 text-slate-400 select-none text-xs align-top pt-0.5">
                      {lineNum}
                    </td>
                    <td className="text-slate-100 whitespace-pre">
                      {isComment ? (
                        <span className="text-emerald-400/90 italic">{line}</span>
                      ) : isImport ? (
                        <span className="text-purple-400 font-semibold">{line}</span>
                      ) : isMethod ? (
                        <span className="text-sky-300 font-semibold">{line}</span>
                      ) : isPrint ? (
                        <span className="text-amber-200">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Explanations & Technical Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>1. Scanner & Locale.US Detayı</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Türkiye bölgesel ayarlarında işletim sistemi ondalık basamak ayracı olarak virgül (<code className="bg-slate-100 px-1 rounded text-slate-800">,</code>) bekler. <code className="text-purple-700 font-mono font-semibold">useLocale(Locale.US)</code> eklenerek hem nokta hem virgül girişlerinde programın çökmesi (<code className="text-rose-600 font-mono">InputMismatchException</code>) kesin olarak engellenmiştir.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>2. double Veri Tipi Seçimi</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Meyve ve sebze fiyatları (örn: 2.14, 3.67, 1.11, 0.95) ve kullanıcıların alacağı tartım miktarları (örn: 1.5 kg, 2.5 kg) kesirli olabileceğinden 64-bit hassasiyete sahip <code className="text-purple-700 font-mono font-semibold">double</code> ilkel (primitive) veri tipi tercih edilmiştir.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>3. System.out.print ile Giriş İstemleri</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ödev isterlerinde <code className="font-mono text-slate-800">"Armut Kaç Kilo ? :"</code> çıktısının hemen yanından veri girilmesi gerektiği için alt satıra geçmeyen <code className="text-purple-700 font-mono font-semibold">System.out.print()</code> metodu kullanılmıştır.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>4. printf("%.2f TL") Formatlı Çıktı</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kayan noktalı sayıların ekranda tam 2 ondalık basamakla (kuruş hanesi) yazdırılması için <code className="text-purple-700 font-mono font-semibold">System.out.printf(Locale.US, "Toplam Tutar : %.2f TL%n", toplamTutar)</code> kullanılarak tam olarak <code className="font-mono text-emerald-700 font-bold">21.68 TL</code> çıktısı elde edilir.
          </p>
        </div>
      </div>
    </div>
  );
};
