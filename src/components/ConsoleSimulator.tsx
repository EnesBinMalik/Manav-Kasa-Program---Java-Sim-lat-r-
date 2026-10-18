import React, { useState, useEffect, useRef } from 'react';
import {
  BasketQuantities,
  DEFAULT_EXAMPLE_QUANTITIES,
  TEST_CASES,
  calculateTotal,
  calculateItemSubtotal
} from '../types/manav.ts';
import { Play, RotateCcw, FastForward, Terminal, ArrowRight, CornerDownLeft } from 'lucide-react';

interface ConsoleSimulatorProps {
  quantities: BasketQuantities;
  setQuantities: React.Dispatch<React.SetStateAction<BasketQuantities>>;
}

const STEPS = [
  { key: 'armut' as const, label: 'Armut Kaç Kilo ? :', name: 'Armut', price: 2.14, emoji: '🍐' },
  { key: 'elma' as const, label: 'Elma Kaç Kilo ? :', name: 'Elma', price: 3.67, emoji: '🍎' },
  { key: 'domates' as const, label: 'Domates Kaç Kilo ? :', name: 'Domates', price: 1.11, emoji: '🍅' },
  { key: 'muz' as const, label: 'Muz Kaç Kilo ? :', name: 'Muz', price: 0.95, emoji: '🍌' },
  { key: 'patlican' as const, label: 'Patlıcan Kaç Kilo ? :', name: 'Patlıcan', price: 5.00, emoji: '🍆' }
];

export const ConsoleSimulator: React.FC<ConsoleSimulatorProps> = ({
  quantities,
  setQuantities
}) => {
  // Step index: 0 = armut, 1 = elma, 2 = domates, 3 = muz, 4 = patlican, 5 = completed
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [logHistory, setLogHistory] = useState<Array<{ type: 'prompt' | 'input' | 'output' | 'system'; text: string }>>([]);
  const [isRunningExample, setIsRunningExample] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initialize terminal
  const resetTerminal = () => {
    setCurrentStep(0);
    setCurrentInputValue('');
    setIsRunningExample(false);
    setLogHistory([
      { type: 'system', text: '$ javac Main.java && java Main' },
      { type: 'system', text: '--- Manav Kasa Programı | Geliştirici: Enes Öztürk ---' },
      { type: 'prompt', text: STEPS[0].label }
    ]);
  };

  useEffect(() => {
    resetTerminal();
  }, []);

  useEffect(() => {
    // Focus terminal input when step changes and not completed
    if (currentStep < STEPS.length && inputRef.current) {
      inputRef.current.focus();
    }
    // Auto scroll to bottom
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, logHistory]);

  const handleStepSubmit = (valStr?: string) => {
    if (currentStep >= STEPS.length) return;

    const raw = valStr !== undefined ? valStr : currentInputValue;
    const num = parseFloat(raw.replace(',', '.')) || 0;
    const currentItem = STEPS[currentStep];

    const nextQuantities = {
      ...quantities,
      [currentItem.key]: num
    };
    setQuantities(nextQuantities);

    const newLogs = [...logHistory];
    // Add entered value if not already printed
    newLogs.push({ type: 'input', text: num.toString() });

    const nextStepIdx = currentStep + 1;

    if (nextStepIdx < STEPS.length) {
      newLogs.push({ type: 'prompt', text: STEPS[nextStepIdx].label });
      setLogHistory(newLogs);
      setCurrentStep(nextStepIdx);
      setCurrentInputValue('');
    } else {
      // Completed calculation
      const total = calculateTotal(nextQuantities);
      newLogs.push({
        type: 'output',
        text: `Toplam Tutar : ${total.toFixed(2)} TL`
      });
      newLogs.push({
        type: 'system',
        text: 'Geliştirici & İmza: Enes Öztürk'
      });
      newLogs.push({
        type: 'system',
        text: 'Process finished with exit code 0'
      });
      setLogHistory(newLogs);
      setCurrentStep(STEPS.length);
      setCurrentInputValue('');
    }
  };

  const handleRunExample = async () => {
    setIsRunningExample(true);
    setCurrentStep(0);
    setQuantities(DEFAULT_EXAMPLE_QUANTITIES);

    const stepsToRun = [
      { key: 'armut', val: 0 },
      { key: 'elma', val: 1 },
      { key: 'domates', val: 1 },
      { key: 'muz', val: 2 },
      { key: 'patlican', val: 3 }
    ];

    const logs: Array<{ type: 'prompt' | 'input' | 'output' | 'system'; text: string }> = [
      { type: 'system', text: '$ javac Main.java && java Main' },
      { type: 'system', text: '--- Manav Kasa Programı | Geliştirici: Enes Öztürk ---' }
    ];

    for (let i = 0; i < stepsToRun.length; i++) {
      logs.push({ type: 'prompt', text: STEPS[i].label });
      logs.push({ type: 'input', text: stepsToRun[i].val.toString() });
    }

    const total = calculateTotal(DEFAULT_EXAMPLE_QUANTITIES);
    logs.push({
      type: 'output',
      text: `Toplam Tutar : ${total.toFixed(2)} TL`
    });
    logs.push({
      type: 'system',
      text: 'Geliştirici & İmza: Enes Öztürk'
    });
    logs.push({
      type: 'system',
      text: 'Process finished with exit code 0'
    });

    setLogHistory(logs);
    setCurrentStep(STEPS.length);
    setIsRunningExample(false);
  };

  const loadTestCase = (tc: typeof TEST_CASES[0]) => {
    setQuantities(tc.quantities);
    const logs: Array<{ type: 'prompt' | 'input' | 'output' | 'system'; text: string }> = [
      { type: 'system', text: `$ java Main (Senaryo: ${tc.title})` },
      { type: 'system', text: '--- Manav Kasa Programı | Geliştirici: Enes Öztürk ---' }
    ];

    STEPS.forEach((step) => {
      logs.push({ type: 'prompt', text: step.label });
      logs.push({ type: 'input', text: tc.quantities[step.key].toString() });
    });

    const total = calculateTotal(tc.quantities);
    logs.push({
      type: 'output',
      text: `Toplam Tutar : ${total.toFixed(2)} TL`
    });
    logs.push({
      type: 'system',
      text: 'Geliştirici & İmza: Enes Öztürk'
    });
    logs.push({
      type: 'system',
      text: 'Process finished with exit code 0'
    });

    setLogHistory(logs);
    setCurrentStep(STEPS.length);
  };

  const totalCalculated = calculateTotal(quantities);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>JAVA 101 KONSOL UYGULAMASI</span>
            <span>·</span>
            <span>STANDART I/O: SCANNER</span>
            <span>·</span>
            <span>İMZA: ENES ÖZTÜRK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Java Konsol Simülatörü
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Kullanıcıdan <code className="text-amber-300 font-mono">Scanner.nextDouble()</code> ile sırayla kilogram değerlerini alarak matematiksel formülle toplam tutarı hesaplayan canlı Java terminali.
          </p>
        </div>

        {/* Quick action controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRunExample}
            disabled={isRunningExample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Örnek Çıktıyı Çalıştır (21.68 TL)</span>
          </button>
          <button
            type="button"
            onClick={resetTerminal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yeniden Başlat</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Terminal Simulator on Left, Variable Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Window */}
        <div className="lg:col-span-7 bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Title Bar */}
          <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-slate-400 text-xs ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>Run: Main.main() [Java 21]</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">
              Enes Öztürk
            </span>
          </div>

          {/* Terminal Content Box */}
          <div className="p-4 sm:p-5 min-h-[380px] max-h-[460px] overflow-y-auto space-y-1.5 text-slate-100">
            {logHistory.map((log, index) => {
              if (log.type === 'system') {
                return (
                  <div key={index} className="text-slate-400 py-0.5 leading-relaxed">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'prompt') {
                return (
                  <span key={index} className="text-slate-200 font-semibold inline">
                    {log.text}{' '}
                  </span>
                );
              }
              if (log.type === 'input') {
                return (
                  <span key={index} className="text-emerald-400 font-bold block sm:inline mb-1 sm:mb-0">
                    {log.text}
                    <br />
                  </span>
                );
              }
              if (log.type === 'output') {
                return (
                  <div
                    key={index}
                    className="mt-3 p-3 bg-emerald-950/70 border border-emerald-600/60 rounded-lg text-emerald-300 font-bold text-sm sm:text-base flex items-center justify-between shadow-inner"
                  >
                    <span>{log.text}</span>
                    <span className="text-xs font-normal text-emerald-400">Doğrulandı ✓</span>
                  </div>
                );
              }
              return null;
            })}

            {/* Interactive Current Prompt Input */}
            {currentStep < STEPS.length && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStepSubmit();
                }}
                className="mt-3 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-base">{STEPS[currentStep].emoji}</span>
                  <span className="font-semibold text-slate-200">
                    {STEPS[currentStep].label}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    ref={inputRef}
                    type="number"
                    step="any"
                    min="0"
                    value={currentInputValue}
                    onChange={(e) => setCurrentInputValue(e.target.value)}
                    placeholder="KG giriniz (örn: 2)"
                    className="flex-1 bg-slate-800 border border-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white px-3 py-1.5 rounded text-sm outline-none font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-sans text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Enter</span>
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {currentStep >= STEPS.length && (
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Program başarıyla tamamlandı.</span>
                <button
                  type="button"
                  onClick={resetTerminal}
                  className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                >
                  Tekrar Test Et
                </button>
              </div>
            )}

            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Quick Input Keypad */}
          {currentStep < STEPS.length && (
            <div className="bg-[#252526] px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Hızlı Miktar Seç:</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleStepSubmit(val.toString())}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono transition-colors cursor-pointer"
                  >
                    {val} kg
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Variable & Memory Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Variables Inspector Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Bellek & Değişken Durumu (Variables)
              </h3>
              <span className="text-xs text-slate-400 font-mono">Stack Memory</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {STEPS.map((step) => {
                const qty = quantities[step.key];
                const subtotal = calculateItemSubtotal(step.key, qty);
                return (
                  <div
                    key={step.key}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <span>{step.emoji}</span>
                      <span className="text-slate-700 font-medium">{step.key}Kilo</span>
                      <span className="text-slate-400">(double)</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 tabular-nums">
                        {qty} kg
                      </span>
                      <span className="text-slate-400 text-[11px] ml-2 tabular-nums">
                        ({subtotal.toFixed(2)} TL)
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Total Variable */}
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900">toplamTutar</span>
                  <span className="text-emerald-700 text-[11px] ml-1.5">(double)</span>
                </div>
                <span className="text-base font-bold text-emerald-800 tabular-nums">
                  {totalCalculated.toFixed(2)} TL
                </span>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Formül Açılımı:
              </div>
              <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto">
                <span className="text-emerald-400">toplam</span> = ({quantities.armut} × 2.14) + ({quantities.elma} × 3.67) + ({quantities.domates} × 1.11) + ({quantities.muz} × 0.95) + ({quantities.patlican} × 5.00)
                <br />
                <span className="text-amber-400 font-bold">= {totalCalculated.toFixed(2)} TL</span>
              </div>
            </div>
          </div>

          {/* Test Scenarios Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Hazır Test Senaryoları
            </h3>
            <div className="space-y-2">
              {TEST_CASES.map((tc) => (
                <button
                  key={tc.id}
                  type="button"
                  onClick={() => loadTestCase(tc)}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-emerald-800">
                      {tc.title}
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {tc.description}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-mono font-bold text-slate-900 group-hover:text-emerald-700 tabular-nums">
                      {tc.expectedTotal.toFixed(2)} TL
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 inline ml-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
