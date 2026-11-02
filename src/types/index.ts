export interface PalettePreset {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  ballColor: string;
  heroGradient: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  pricingExample: string;
  marathi: string;
}

export interface CalculatorItem {
  id: string;
  name: string;
  marathiName: string;
  category: 'daily' | 'heavy' | 'dryclean';
  unit: 'piece' | 'kg';
  price: number;
}
