import { PalettePreset, ServiceItem, CalculatorItem } from '../types';

export const STORE_PHONE = '+918856865639';
export const STORE_PHONE_DISPLAY = '088568 65639';
export const STORE_ADDRESS = 'Laxmi Chowk Rd, Phase 1, Hinjawadi, Pune 411057';
export const STORE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=18.5995882,73.7311897';
export const STORE_WHATSAPP_BASE = 'https://wa.me/918856865639';

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'roseGold',
    name: 'Royal Blue & Pearl',
    description: 'Hyper-distinct cobalt spheres floating in soft white-slate gradients.',
    primaryColor: '#2F69FF',
    ballColor: '#2F69FF',
    heroGradient: 'radial-gradient(circle at center, #ffffff 0%, #ecefff 35%, #c2d1ff 100%)',
  },
  {
    id: 'pinkBlush',
    name: 'Rose Blush & Crème',
    description: 'Sweet candy pinks and juicy strawberry accents in a pearl studio.',
    primaryColor: '#FFA6B3',
    ballColor: '#FFC5C2',
    heroGradient: 'radial-gradient(circle at center, #ffffff 0%, #fff0f1 38%, #ffd1d5 100%)',
  },
  {
    id: 'voltLime',
    name: 'Volt Lime & Slate',
    description: 'Electric neon volt-lime against a clean white-slate horizon.',
    primaryColor: '#E1FC03',
    ballColor: '#E1FC03',
    heroGradient: 'radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)',
  },
  {
    id: 'arcticBlue',
    name: 'Arctic Sky & Crystal',
    description: 'Cool arctic crystal blues with a translucent glass sheen.',
    primaryColor: '#96E5FF',
    ballColor: '#96E5FF',
    heroGradient: 'radial-gradient(circle at center, #ffffff 0%, #f0f9ff 38%, #bae6fd 100%)',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'daily-wash',
    number: '01 · Daily Wear',
    title: 'Wash & Fold / Wash & Iron',
    category: 'Daily Wear',
    description: 'Available both Per-Piece and Per-Kg. Shirts, trousers, t-shirts, jeans, kurtas, bedsheets & pillow covers.',
    pricingExample: '₹60/kg or ₹12/piece',
    marathi: 'रोजचे कपडे धुणे व इस्त्री',
  },
  {
    id: 'steam-iron',
    number: '02 · Crisp Press',
    title: 'Professional Ironing & Starching',
    category: 'Crisp Press',
    description: 'Crisp normal ironing and starching services for regular and office wear.',
    pricingExample: 'Contact for rates',
    marathi: 'इस्त्री व स्टार्चिंग',
  },
  {
    id: 'heavy-items',
    number: '03 · Heavy & Winter',
    title: 'Blanket, Razai & Curtains',
    category: 'Heavy Fabric',
    description: 'Deep hygienic washing & dry cleaning for heavy Blankets (कंबल), Razai / Quilts (रजाई), comforters & curtains.',
    pricingExample: 'From ₹180/item',
    marathi: 'कंबल व रजाई ड्रायक्लिनिंग',
  },
  {
    id: 'delicate-suits',
    number: '04 · Delicate Care',
    title: 'Suit, Blazer & Saree Dry Clean',
    category: 'Delicate Care',
    description: 'Expert stain removal & polishing for 2/3-Piece Suits, Blazers, Sherwanis, Silk Sarees, Paithanis & Lehengas.',
    pricingExample: 'From ₹199/item',
    marathi: 'सूट, ब्लेझर व सिल्क साडी',
  },
];

export const CALCULATOR_ITEMS: CalculatorItem[] = [
  { id: 'shirt_wash_iron', name: 'Shirt / T-shirt (Wash & Iron)', marathiName: 'शर्ट / टी-शर्ट (धुणे + प्रेस)', category: 'daily', unit: 'piece', price: 15 },
  { id: 'trouser_wash_iron', name: 'Trouser / Jeans (Wash & Iron)', marathiName: 'पँट / जीन्स (धुणे + प्रेस)', category: 'daily', unit: 'piece', price: 18 },
  { id: 'kg_wash_fold', name: 'Everyday Clothes (Wash & Fold by Kg)', marathiName: 'कपडे किलोवर (धुणे + फोल्ड)', category: 'daily', unit: 'kg', price: 60 },
  { id: 'steam_iron_only', name: 'Steam Iron Only (Any Garment)', marathiName: 'फक्त स्टीम इस्त्री', category: 'daily', unit: 'piece', price: 10 },
  { id: 'blanket_single', name: 'Single Blanket (कंबल)', marathiName: 'सिंगल ब्लँकेट', category: 'heavy', unit: 'piece', price: 190 },
  { id: 'blanket_double', name: 'Double / King Blanket (कंबल)', marathiName: 'डबल ब्लँकेट', category: 'heavy', unit: 'piece', price: 280 },
  { id: 'razai_quilt', name: 'Razai / Quilt (रजाई)', marathiName: 'रजाई / गूदडी', category: 'heavy', unit: 'piece', price: 290 },
  { id: 'suit_2piece', name: '2-Piece Suit Dry Clean', marathiName: '२-पीस कोट / सूट', category: 'dryclean', unit: 'piece', price: 240 },
  { id: 'blazer', name: 'Blazer / Coat Dry Clean', marathiName: 'ब्लेझर / कोट', category: 'dryclean', unit: 'piece', price: 160 },
  { id: 'silk_saree', name: 'Silk / Paithani Saree Dry Clean', marathiName: 'पैठणी / रेशमी साडी', category: 'dryclean', unit: 'piece', price: 220 },
  { id: 'curtain', name: 'Window / Door Curtain', marathiName: 'पडदा (कर्टन)', category: 'heavy', unit: 'piece', price: 90 },
];
