# Star Laundry & Dry Cleaners (स्टार लाँड्री ॲन्ड ड्रायक्लिनर्स)

Modern, interactive React application for **Star Laundry & Dry Cleaners**, Hinjawadi Phase 1, Pune. Features 3D physical suds and soap bubble dynamics with Three.js WebGL, real-time washing machine animation, scroll-reactive color morphing, flat-rate pickup & delivery calculations, and seamless WhatsApp/Call booking.

## Features

- **3D Soap Bubble Dynamics (Three.js)**: Collision-based physics simulation with Verlet integration, pairwise bounce dynamics, and scroll-reactive behavior (drum containment $\to$ outward eruption $\to$ heart formation $\to$ lens release).
- **Interactive Washing Machine**: Vector SVG washing drum with realistic water sloshing wave, spinning garments, suds foam, specular gloss highlight, LED timer, and erupting soap bubbles.
- **Studio Palette Controls Drawer**: Real-time switching between 4 custom theme presets (*Royal Blue & Pearl*, *Rose Blush & Crème*, *Volt Lime & Slate*, and *Arctic Sky & Crystal*).
- **Custom Gol Soap Bubble Mouse Cursor**: Iridescent translucent soap bubble cursor with specular reflection highlights and mini bubble trail.
- **Pickup & Delivery Pricing Estimator**: Interactive laundry rate calculator for Hinjawadi residents (wash & fold by kg, steam iron, blankets, quilts/razai, suits, sarees, and flat ₹30/₹50 delivery zone selection) with 1-click WhatsApp order generator.
- **2–3 Hour Express Service**: Urgent express delivery option highlighted across all service tiers.
- **Authentic Signboard Branding**: Preserves the original shop signboard logo with star-and-clothes-hanger motif, dual-tone navy & crimson typography, and Marathi translations.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4
- **Graphics & 3D**: Three.js WebGL
- **Icons**: Lucide React

## Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript checks
npm run lint

# Build production bundle
npm run build
```
