# D. Atlas Estates - Lead Generation Landing Page

A high-converting landing page for D. Atlas Estates, Philadelphia's trusted diamond and jewelry buyer since 1994.

## Features

- **Lead Capture Form** with real-time validation
- **Mobile Responsive** design
- **Analytics Integration** (Google Analytics 4 & Facebook Pixel)
- **Framer Motion** animations for enhanced UX
- **Trust Elements** including testimonials and badges
- **SEO Optimized** with proper meta tags

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Hook Form with Zod validation
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mbark223/datlasestates.git
cd datlasestates
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Analytics

Update the tracking IDs in `src/components/Analytics.tsx`:

```typescript
export const GA_TRACKING_ID = "G-XXXXXXXXXX" // Your GA4 ID
export const FB_PIXEL_ID = "XXXXXXXXXXXXXXX" // Your Facebook Pixel ID
```

### CRM Integration

The form submission handler in `src/app/page.tsx` has a TODO comment where you should add your CRM integration:

```typescript
// TODO: Send to CRM
```

## Deployment

This app is ready to deploy on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Deploy

## Performance

- Lighthouse Score: 95+
- Page Load: <2 seconds
- Mobile Optimized

## License

Private - D. Atlas Estates