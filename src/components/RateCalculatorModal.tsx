import React, { useState } from 'react';
import { X, Calculator, Plus, Minus, MessageSquare, Sparkles, Check, Zap } from 'lucide-react';
import { CALCULATOR_ITEMS, STORE_WHATSAPP_BASE } from '../data/constants';

interface RateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateCalculatorModal: React.FC<RateCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    shirt_wash_iron: 3,
    trouser_wash_iron: 2,
    blanket_single: 0,
    kg_wash_fold: 0,
  });

  const [deliveryDistance, setDeliveryDistance] = useState<'store' | '1km' | '2km'>('1km');
  const [isExpress, setIsExpress] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'daily' | 'heavy' | 'dryclean'>('all');

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const deliveryFee = deliveryDistance === 'store' ? 0 : deliveryDistance === '1km' ? 30 : 50;

  const subtotal = CALCULATOR_ITEMS.reduce((sum, item) => {
    const qty = quantities[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  const expressSurcharge = isExpress && subtotal > 0 ? Math.round(subtotal * 0.25) : 0;
  const grandTotal = subtotal + deliveryFee + expressSurcharge;

  const totalItemsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  // Generate WhatsApp message with formatted order details
  const buildWhatsAppMessage = () => {
    let msg = `*Star Laundry & Dry Cleaners — Pickup Order*\n`;
    msg += `📍 *Delivery Zone*: ${
      deliveryDistance === 'store'
        ? 'Store Visit (Self Drop)'
        : deliveryDistance === '1km'
        ? 'Within 1 KM (Flat ₹30)'
        : 'Up to 2 KM (Flat ₹50)'
    }\n`;
    if (isExpress) msg += `⚡ *Service*: 2–3 Hour Express Delivery\n`;
    msg += `---------------------------------\n*Selected Clothes / Items*:\n`;

    let hasItems = false;
    CALCULATOR_ITEMS.forEach((item) => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        hasItems = true;
        msg += `• ${item.name}: ${qty} ${item.unit} = ₹${qty * item.price}\n`;
      }
    });

    if (!hasItems) {
      msg += `• General Laundry Pickup Request\n`;
    }

    msg += `---------------------------------\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (deliveryFee > 0) msg += `Delivery Fee: ₹${deliveryFee}\n`;
    if (expressSurcharge > 0) msg += `Express Surcharge: ₹${expressSurcharge}\n`;
    msg += `*Estimated Total: ₹${grandTotal}*\n\n`;
    msg += `Please confirm pickup address and time slot!`;
    return encodeURIComponent(msg);
  };

  const filteredItems = CALCULATOR_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0E2AC5]/10 flex items-center justify-center text-[#0E2AC5]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-raleway font-bold text-lg text-neutral-900 leading-tight">
                Laundry Rate &amp; Pickup Estimator
              </h3>
              <p className="font-sans text-xs text-neutral-500">
                Laxmi Chowk &amp; Hinjawadi Phase 1 · Transparent Pricing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="px-6 py-5 overflow-y-auto space-y-6">
          {/* Category Tabs */}
          <div className="flex gap-2 pb-1 overflow-x-auto text-xs font-raleway font-bold">
            {(
              [
                { id: 'all', label: 'All Services' },
                { id: 'daily', label: 'Daily Wear & Kg' },
                { id: 'heavy', label: 'Blankets & Razai' },
                { id: 'dryclean', label: 'Suits & Sarees' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0E2AC5] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="space-y-2.5">
            {filteredItems.map((item) => {
              const qty = quantities[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/40 transition-colors"
                >
                  <div className="pr-2">
                    <div className="font-raleway font-bold text-sm text-neutral-900">
                      {item.name}
                    </div>
                    <div className="font-sans text-xs text-[#a81c4b] font-medium">
                      {item.marathiName} · ₹{item.price}/{item.unit}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={qty === 0}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                        qty > 0
                          ? 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed'
                      }`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-mono font-bold text-sm text-neutral-900">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery & Express Options */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3.5">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-bold mb-2">
                Pickup &amp; Delivery Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'store', title: 'Self Drop', sub: 'Store visit', fee: '₹0' },
                    { id: '1km', title: 'Up to 1 KM', sub: 'Laxmi Chowk', fee: 'Flat ₹30' },
                    { id: '2km', title: 'Up to 2 KM', sub: 'Hinjawadi Ph 1', fee: 'Flat ₹50' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDeliveryDistance(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryDistance === opt.id
                        ? 'border-[#0E2AC5] bg-[#0E2AC5]/5 text-neutral-950 font-semibold shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-raleway text-xs font-bold">{opt.title}</div>
                    <div className="font-mono text-[10px] text-[#0E2AC5] font-semibold">{opt.fee}</div>
                    <div className="text-[10px] text-neutral-400">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2-3 Hr Express Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#e1306c]" />
                <div>
                  <div className="font-raleway font-bold text-xs text-neutral-900">
                    2–3 Hour Express Service
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Urgent same-day dispatch (Call at 12 PM → Ready by 3 PM)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpress(!isExpress)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isExpress ? 'bg-[#e1306c]' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    isExpress ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Summary */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto">
            <div className="text-xs text-neutral-500 font-raleway">
              Estimated Total ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
            </div>
            <div className="font-raleway text-2xl font-black text-neutral-950">
              ₹{grandTotal}
              <span className="text-[11px] font-normal text-neutral-500 ml-1.5 font-mono">
                {deliveryFee > 0 ? `(incl. ₹${deliveryFee} delivery)` : '(no delivery fee)'}
              </span>
            </div>
          </div>

          <a
            href={`${STORE_WHATSAPP_BASE}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0E2AC5] hover:bg-[#091d8c] text-white font-raleway text-xs font-bold shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
