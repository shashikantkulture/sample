# LUXIGNIA — Digital Luxury Showroom & 3D Interactive Ecommerce

A cinematic, interactive ecommerce web application engineered for **LUXIGNIA**, an antique and luxury home-decor brand, based directly on the visual direction, composition, typography, and interactive benchmarks of high-end luxury maisons.

---

## ✦ Key Architecture & Features

### 1. Modern Node.js Architecture
- **Framework**: Next.js 14 (App Router)
- **UI Engine**: React 18, TypeScript, Tailwind CSS
- **3D Interactive Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animations & Physics**: Framer Motion (`framer-motion`) with custom spring physics
- **State Management**: Zustand lightweight store (`lib/store.ts`)
- **Delight & Micro-Interactions**: Custom spring magnetic buttons, custom multi-state cursor system, celebration confetti (`canvas-confetti`)
- **Backend / API Ready**: REST endpoints for `/api/products` and `/api/orders` with server-side validation and Supabase/PostgreSQL/MongoDB readiness.

---

### 2. Digital Showroom Experience (Matching Reference Benchmark)

- **Top Announcement Bar**: Slim gold-accented dismissible marquee with complimentary shipping thresholds.
- **Floating Luxury Navbar**: LUXIGNIA brand mark, center navigation links with gold reveal underlines, dynamic bag counter badge, wishlist trigger, cinematic search trigger, and magnetic "Contact Us" CTA.
- **Cinematic Hero**:
  - Full-height museum ambiance with architectural depth and mouse-based parallax.
  - Interactive multi-slide showcase featuring the **Archival Bronze Stallion**.
  - Verified provenance metrics: `500+ Curated Products`, `10K+ Happy Customers`, `4.8★ Rating`.
  - Staggered typography reveals and luxury slide pagination (`01 | 02 | 03`).
- **6-Category Showcase**:
  - Sculptures
  - Wall Decor
  - Vases & Planters
  - Lighting
  - Table Decor
  - Custom Designs
- **Interactive 3D Experience**:
  - Real-time WebGL studio rendering the **Handcrafted Heritage Vase** with 360° drag rotation, zoom controls, reset view, and turntable platform.
  - Multi-angle thumbnails and complete commercial spec card with instant "Add to Cart" integration.
- **"Spaces with Character" Collection Banner**: Full-width architectural salon background with subtle mouse parallax and callout.
- **Featured Products Carousel**:
  - Badges: `New`, `Bestseller`, `Limited`, `Handcrafted`.
  - 3D tilt effects, hover quick view, and one-click bag acquisition.
- **Comprehensive Shop Page (`/shop`)**:
  - Dynamic category switching, valuation slider cap, instant search filter, stock filter, wishlist filter, and sorting.
- **Archival Product Detail (`/shop/[slug]`)**:
  - Toggle between 3D Interactive Studio and high-resolution archival plate photography.
  - Quantity controls, instant acquisition ("Buy Now"), tabbed provenance dossier (Story, Metallurgy, Registry Specs, White-Glove Protocol), and complementary works.
- **Full Luxury Bag (`/cart`)**:
  - Valuation breakdown, coupon code engine (e.g. `HERITAGE10`), and complimentary shipping calculator.
- **Bespoke Acquisition Checkout (`/checkout`)**:
  - Multi-section collector form, residence details, payment gateway options (Stripe/Razorpay/COD), and celebratory confetti upon completion.
- **Bespoke Commissions (`/custom-design`)**:
  - Full request form for custom bronze sculptures and architectural friezes with budget tiers and blueprint/sketch uploads.
- **Maison Story (`/our-story`)**:
  - High-editorial chapters detailing foundry metallurgy, mineral patinas, and brand philosophy.

---

### 3. Running Locally

```bash
# Start development server
npm run dev

# Or build for production
npm run build
npm run start
```

The application runs on `http://localhost:3001` (or `http://localhost:3000`).

---

### 4. Production Deployment

- **Vercel**: Connect your GitHub repository to Vercel for zero-config automatic deployment.
- **Node.js Hosting (Hostinger / cPanel / VPS)**: Run `npm run build` and launch `npm start` with PM2 (`pm2 start npm --name "luxignia" -- start`).
- **AWS (ECS / EC2 / Amplify)**: Standard Node.js containerization with Docker or Amplify Next.js hosting.
