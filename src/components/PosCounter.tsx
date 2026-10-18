import React, { useState } from 'react';
import {
  BasketQuantities,
  PRODUCTS,
  calculateTotal,
  calculateItemSubtotal,
  DEFAULT_EXAMPLE_QUANTITIES
} from '../types/manav.ts';
import {
  Plus,
  Minus,
  RotateCcw,
  Printer,
  Copy,
  Check,
  Scale,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface PosCounterProps {
  quantities: BasketQuantities;
  setQuantities: React.Dispatch<React.SetStateAction<BasketQuantities>>;
}

export const PosCounter: React.FC<PosCounterProps> = ({
  quantities,
  setQuantities
}) => {
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [tareActive, setTareActive] = useState(false);

  const total = calculateTotal(quantities);
  const totalWeight = Number(
    (
      quantities.armut +
      quantities.elma +
      quantities.domates +
      quantities.muz +
      quantities.patlican
    ).toFixed(2)
  );

  const updateQuantity = (key: keyof BasketQuantities, delta: number) => {
    setQuantities((prev) => {
      const current = prev[key];
      const next = Math.max(0, Number((current + delta).toFixed(2)));
      return { ...prev, [key]: next };
    });
  };

  const setDirectQuantity = (key: keyof BasketQuantities, val: string) => {
    const num = Math.max(0, parseFloat(val.replace(',', '.')) || 0);
    setQuantities((prev) => ({
      ...prev,
      [key]: Number(num.toFixed(2))
    }));
  };

  const resetAll = () => {
    setQuantities({
      armut: 0,
      elma: 0,
      domates: 0,
      muz: 0,
      patlican: 0
    });
  };

  const loadExample = () => {
    setQuantities(DEFAULT_EXAMPLE_QUANTITIES);
  };

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getReceiptText = () => {
    return `====================================
    ÖZTÜRK MANAV & ŞARKÜTERİ
      Enes Öztürk Şubesi
Tarih: ${currentDate}   Saat: ${currentTime}
Fiş No: 0214367   Kasiyer: Enes Öztürk
------------------------------------
ÜRÜN          B.FİYAT  KG      TUTAR
------------------------------------
${PRODUCTS.map((p) => {
  const key = p.id as keyof BasketQuantities;
  const qty = quantities[key];
  const subtotal = calculateItemSubtotal(key, qty);
  if (qty <= 0) return null;
  return `${p.name.padEnd(12, ' ')} ${p.price.toFixed(2).padStart(6, ' ')}  ${qty.toFixed(2).padStart(5, ' ')}  ${subtotal.toFixed(2).padStart(7, ' ')} TL`;
})
  .filter(Boolean)
  .join('\n')}
------------------------------------
TOPLAM AĞIRLIK: ${totalWeight.toFixed(2)} KG
KDV (%1): ${(total * 0.01).toFixed(2)} TL
GENEL TOPLAM  : ${total.toFixed(2)} TL
====================================
       TEŞEKKÜR EDERİZ!
      İmza: Enes Öztürk
====================================`;
  };

  const copyReceipt = async () => {
    try {
      await navigator.clipboard.writeText(getReceiptText());
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2000);
    } catch {
      // fallback
    }
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span>MANAV KASA & TEZGÂH MODÜLÜ</span>
            <span>·</span>
            <span>KASİYER: ENES ÖZTÜRK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Kasa Tezgâhı & Dijital Terazi
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Kilogram miktarlarını arttırıp azaltabilir, dijital terazide toplam ağırlığı görüntüleyebilir ve resmi manav satış fişi oluşturabilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadExample}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ödev Örneğini Yükle (21.68 TL)</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Products list + Scale & Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Products Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Ürün Listesi & Birim Fiyatlar</span>
            </h3>
            <span className="text-xs text-slate-500">5 Çeşit Ürün</span>
          </div>

          <div className="space-y-3">
            {PRODUCTS.map((prod) => {
              const key = prod.id as keyof BasketQuantities;
              const currentQty = quantities[key];
              const subtotal = calculateItemSubtotal(key, currentQty);

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-4 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Item info */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {prod.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-base">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            {prod.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Birim Fiyat:{' '}
                          <span className="font-bold text-emerald-700 font-mono">
                            {prod.price.toFixed(2)} TL
                          </span>{' '}
                          / kg
                        </div>
                      </div>
                    </div>

                    {/* Weight Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Stepper buttons */}
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(key, -1)}
                          disabled={currentQty <= 0}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:text-slate-900 disabled:opacity-40 flex items-center justify-center shadow-xs cursor-pointer disabled:cursor-not-allowed"
                          title="1 kg azalt"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-16 text-center">
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={currentQty === 0 ? '0' : currentQty}
                            onChange={(e) => setDirectQuantity(key, e.target.value)}
                            className="w-full text-center font-mono font-bold text-slate-900 text-sm bg-transparent outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => updateQuantity(key, 1)}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-xs cursor-pointer"
                          title="1 kg arttır"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-right min-w-[75px]">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          Ara Tutar
                        </div>
                        <div className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                          {subtotal.toFixed(2)} TL
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Add presets */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Hızlı Ekle:</span>
                    <div className="flex items-center gap-1.5">
                      {[0.5, 1, 2, 5].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => updateQuantity(key, amt)}
                          className="px-2 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-mono cursor-pointer transition-colors"
                        >
                          +{amt} kg
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setDirectQuantity(key, '0')}
                        className="px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] cursor-pointer transition-colors ml-1"
                      >
                        Sıfırla
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Digital Scale & Thermal Receipt */}
        <div className="lg:col-span-5 space-y-6">
          {/* Digital Scale Component */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                  DİJİTAL TERAZİ (0-50 KG)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTareActive(!tareActive)}
                className={`text-[11px] px-2 py-0.5 rounded font-mono cursor-pointer transition-colors ${
                  tareActive
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                DARA (TARE)
              </button>
            </div>

            {/* LED Display */}
            <div className="mt-4 p-4 rounded-xl bg-black border border-slate-800 flex items-center justify-between shadow-inner">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                  NET AĞIRLIK
                </div>
                <div className="text-3xl font-mono font-bold text-emerald-400 tracking-wider tabular-nums">
                  {tareActive ? '0.00' : totalWeight.toFixed(2)}{' '}
                  <span className="text-sm text-emerald-500 font-normal">KG</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                  HESAPLANAN TUTAR
                </div>
                <div className="text-3xl font-mono font-bold text-amber-400 tracking-wider tabular-nums">
                  {total.toFixed(2)}{' '}
                  <span className="text-sm text-amber-500 font-normal">TL</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Hassasiyet: 0.01 kg (10 gr)</span>
              <span>Kasiyer: Enes Öztürk</span>
            </div>
          </div>

          {/* Thermal Receipt Card */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 shadow-sm font-mono text-xs text-slate-800 relative overflow-hidden">
            {/* Top jagged / receipt decorative header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-amber-300/80">
              <div className="text-base font-bold tracking-tight text-slate-900 font-sans">
                ÖZTÜRK MANAV & ŞARKÜTERİ
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Organik Bahçe Ürünleri & Taze Sebze Meyve
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex justify-between px-2">
                <span>Tarih: {currentDate}</span>
                <span>Saat: {currentTime}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between px-2">
                <span>Fiş No: #0214367</span>
                <span>Kasiyer: Enes Öztürk</span>
              </div>
            </div>

            {/* Receipt Table */}
            <div className="py-3 border-b-2 border-dashed border-amber-300/80 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700 pb-1 text-[11px]">
                <span className="w-2/5">ÜRÜN</span>
                <span className="w-1/5 text-right">B.FİYAT</span>
                <span className="w-1/5 text-right">MİKTAR</span>
                <span className="w-1/5 text-right">TUTAR</span>
              </div>

              {PRODUCTS.map((p) => {
                const key = p.id as keyof BasketQuantities;
                const qty = quantities[key];
                const subtotal = calculateItemSubtotal(key, qty);
                if (qty <= 0) return null;

                return (
                  <div key={p.id} className="flex justify-between text-slate-800 tabular-nums">
                    <span className="w-2/5 font-sans font-medium">
                      {p.emoji} {p.name}
                    </span>
                    <span className="w-1/5 text-right">{p.price.toFixed(2)}</span>
                    <span className="w-1/5 text-right">{qty} kg</span>
                    <span className="w-1/5 text-right font-bold">
                      {subtotal.toFixed(2)} TL
                    </span>
                  </div>
                );
              })}

              {totalWeight === 0 && (
                <div className="text-center py-4 text-slate-500 font-sans italic">
                  Henüz sepete ürün eklenmedi.
                </div>
              )}
            </div>

            {/* Receipt Totals */}
            <div className="pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Toplam Net Ağırlık:</span>
                <span className="font-bold tabular-nums">{totalWeight.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>KDV Matrahı (%1):</span>
                <span className="tabular-nums">{(total * 0.01).toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-1 border-t border-amber-300/80">
                <span>ÖDENECEK TUTAR:</span>
                <span className="text-emerald-800 tabular-nums">{total.toFixed(2)} TL</span>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-amber-300/80 text-center text-[11px] text-slate-600">
              <div className="font-bold">İYİ GÜNLER DİLERİZ!</div>
              <div className="text-[10px] mt-0.5">Programcı & Yetkili: Enes Öztürk</div>
            </div>

            {/* Receipt Actions */}
            <div className="mt-4 flex items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={copyReceipt}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 text-slate-800 rounded-lg text-xs font-semibold hover:bg-amber-100/50 transition-colors cursor-pointer shadow-xs"
              >
                {copiedReceipt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fiş Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Fişi Metin Olarak Kopyala</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={printReceipt}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                title="Yazdır"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Yazdır</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
