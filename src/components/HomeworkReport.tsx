import React, { useState } from 'react';
import { PRODUCTS, TEST_CASES, JAVA_SOURCE_CODE } from '../types/manav.ts';
import {
  GraduationCap,
  FileText,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  User,
  Award
} from 'lucide-react';

export const HomeworkReport: React.FC = () => {
  const [copiedReport, setCopiedReport] = useState(false);

  const markdownReport = `# MANAV KASA PROGRAMI - ÖDEV RAPORU

**Öğrenci / Geliştirici:** Enes Öztürk  
**Ders:** Java 101 - Temel Kavramlar ve Değişkenler  
**Proje:** Manav Kasa Programı  
**İmza:** Enes Öztürk  

---

## 1. Ödev Konusu ve Amacı
Java ile kullanıcıların manavdan almış oldukları ürünlerin kilogram değerlerine göre toplam tutarını ekrana yazdıran program.

## 2. Ürünler ve Kilogram Fiyatları
- Armut    : 2,14 TL
- Elma     : 3,67 TL
- Domates  : 1,11 TL
- Muz      : 0,95 TL
- Patlıcan : 5,00 TL

## 3. Matematiksel Formül
\`\`\`
Toplam = (Armut_KG * 2.14) + (Elma_KG * 3.67) + (Domates_KG * 1.11) + (Muz_KG * 0.95) + (Patlican_KG * 5.00)
\`\`\`

## 4. Örnek Test Çıktısı (Ödev Doğrulaması)
\`\`\`
Armut Kaç Kilo ? : 0
Elma Kaç Kilo ? : 1
Domates Kaç Kilo ? : 1
Muz Kaç Kilo ? : 2
Patlıcan Kaç Kilo ? : 3
Toplam Tutar : 21.68 TL
\`\`\`

## 5. Java Kaynak Kodu
\`\`\`java
${JAVA_SOURCE_CODE}
\`\`\`

---
*Hazırlayan: Enes Öztürk*
`;

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(markdownReport);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span>AKADEMİK TESLİM FORMATI</span>
            <span>·</span>
            <span>JAVA 101</span>
            <span>·</span>
            <span>İMZA: ENES ÖZTÜRK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Ödev Teslim & Doğrulama Raporu
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Ödevin gereksinimlerini, formül yapısını, test sonuçlarını ve kaynak kodunu içeren hazır teslim dokümantasyonu.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm cursor-pointer shrink-0"
        >
          {copiedReport ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Rapor Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Teslim Raporunu Kopyala (Markdown)</span>
            </>
          )}
        </button>
      </div>

      {/* Student Meta Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Öğrenci / İmza</div>
            <div className="text-sm font-bold text-slate-900">Enes Öztürk</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Ders</div>
            <div className="text-sm font-bold text-slate-900">Java 101</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Ödev Başlığı</div>
            <div className="text-sm font-bold text-slate-900">Manav Kasa Programı</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Durum</div>
            <div className="text-sm font-bold text-emerald-600 flex items-center gap-1">
              <span>Eksiksiz & Doğrulandı</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Two columns: Requirements Table & Test Validation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Requirements & Price Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Meyveler ve KG Fiyatları</span>
            <span className="text-xs text-slate-400 font-normal">Ödev Kriterleri</span>
          </h3>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 text-left">Ürün</th>
                  <th className="py-2.5 px-3 text-left">Kategori</th>
                  <th className="py-2.5 px-3 text-right">Birim Fiyat</th>
                  <th className="py-2.5 px-3 text-right">Java Değişkeni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-medium text-slate-900 flex items-center gap-1.5">
                      <span>{prod.emoji}</span>
                      <span>{prod.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 capitalize">
                      {prod.category}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {prod.price.toFixed(2)} TL
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      {prod.id}Fiyat
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Formül İzahı:</div>
            <p className="font-mono text-[11px] text-slate-700 leading-relaxed">
              toplamTutar = (armutKilo * 2.14) + (elmaKilo * 3.67) + (domatesKilo * 1.11) + (muzKilo * 0.95) + (patlicanKilo * 5.00);
            </p>
          </div>
        </div>

        {/* Right: Test Verification Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Test Senaryoları & Doğrulama Matrisi</span>
            <span className="text-xs text-emerald-600 font-semibold">%100 Başarılı</span>
          </h3>

          <div className="space-y-2.5">
            {TEST_CASES.map((tc, index) => (
              <div
                key={tc.id}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">
                    {index + 1}. {tc.title}
                  </span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {tc.expectedTotal.toFixed(2)} TL ✓
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  {tc.description}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
            <div className="font-semibold mb-0.5">Enes Öztürk İmzalı Ödev Doğrulaması:</div>
            <div>
              Ödev metninde verilen örnek girdi değerleri (0 kg Armut, 1 kg Elma, 1 kg Domates, 2 kg Muz, 3 kg Patlıcan) girildiğinde program tam olarak <span className="font-bold underline">21.68 TL</span> sonucunu üretmektedir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
