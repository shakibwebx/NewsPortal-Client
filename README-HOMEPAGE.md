# Bengali News Portal - Professional Homepage

A complete, production-ready Bengali news website homepage built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features Implemented

### 🎨 Design & Styling
- ✅ **Noto Sans Bengali** font integrated
- ✅ **Red/Maroon color scheme** (#c41e3a primary)
- ✅ Fully **responsive design** (mobile-first)
- ✅ **Newspaper-style layout**
- ✅ Professional card shadows and borders
- ✅ Smooth hover effects and transitions
- ✅ Custom scrollbar styling

### 📱 Header Section
- ✅ Logo with tagline in Bengali
- ✅ Date/time display in Bengali format
- ✅ Horizontal navigation menu with 9 categories:
  - প্রচ্ছদ, বাংলাদেশ, রাজনীতি, অর্থনীতি, আন্তর্জাতিক, খেলা, বিনোদন, লাইফস্টাইল, মতামত
- ✅ Social media icons (Facebook, Twitter, YouTube)
- ✅ Search functionality
- ✅ Sticky header on scroll
- ✅ Mobile hamburger menu
- ✅ Breaking news ticker with marquee animation
- ✅ Advertisement space (728x90)

### 📰 Top News Section
- ✅ **1 large featured news** (left) with:
  - Full-size image with gradient overlay
  - Category badge
  - Headline, excerpt, timestamp
  - Hover effects
- ✅ **4 smaller news items** (right, 2x2 grid)
- ✅ Responsive grid layout

### 🖼️ Photo Gallery Section
- ✅ Horizontal scrollable gallery
- ✅ 6 large images with captions
- ✅ Navigation arrows (left/right)
- ✅ Smooth scroll behavior
- ✅ Hover zoom effects
- ✅ Hide scrollbar for clean look

### 📋 Latest News Grid
- ✅ **3-column grid** (desktop), 1-column (mobile)
- ✅ 6 news cards with:
  - Thumbnail image
  - Headline in Bengali
  - Brief excerpt
  - Timestamp
  - Category badge with different colors
  - Bookmark icon
- ✅ Hover effects with shadow
- ✅ "See All" link

### 🎥 Video Section
- ✅ Grid of 4 video thumbnails
- ✅ Play button overlay
- ✅ Video duration badge
- ✅ View count display
- ✅ Hover effects
- ✅ Video icon in section title

### 📊 Sidebar Components
- ✅ **Popular News (জনপ্রিয়)** section:
  - Numbered list (01-08)
  - Top 3 highlighted with red badges
  - View counts
  - Timestamps
  - Sticky positioning
- ✅ Advertisement space (300x600)

### 🏆 Category Sections
- ✅ **Sports (খেলা)** section
- ✅ **Entertainment (বিনোদন)** section
- ✅ 4-column grid layout
- ✅ Category-specific color coding
- ✅ "See More" links

### 💬 Opinion Section
- ✅ Author profile images
- ✅ Columnist information
- ✅ Opinion article previews
- ✅ 3-column grid

### 🦶 Footer
- ✅ Dark background
- ✅ Multiple columns with links
- ✅ Contact information
- ✅ Social media links
- ✅ Copyright information

## 🎯 Technical Features

### Performance
- ✅ **Server-side rendering** (Next.js 14)
- ✅ **Image optimization** with Next.js Image
- ✅ **Lazy loading** for images
- ✅ Optimized fonts (Google Fonts)

### UX Enhancements
- ✅ Skeleton loaders ready
- ✅ Smooth transitions
- ✅ Hover states on all interactive elements
- ✅ Accessibility features (aria-labels)
- ✅ Focus visible states

### Responsive Breakpoints
- ✅ Mobile: < 640px
- ✅ Tablet: 640px - 1024px
- ✅ Desktop: 1024px+
- ✅ Large Desktop: 1280px+

## 📂 File Structure

```
client/
├── app/
│   ├── (home)/
│   │   └── page.tsx                    # Main homepage
│   └── globals.css                      # Global styles + animations
├── components/
│   └── home/
│       ├── ProfessionalHeader.tsx       # Header with nav
│       ├── TopNewsSection.tsx           # Featured + grid news
│       ├── PhotoGallerySection.tsx      # Photo carousel
│       ├── LatestNewsGrid.tsx           # Latest news cards
│       ├── VideoSection.tsx             # Video grid
│       └── PopularNewsSidebar.tsx       # Popular news list
└── components/
    └── Footer.tsx                       # Footer component
```

## 🎨 Color Palette

```css
Primary Red: #c41e3a
Primary Dark: #a01729
Secondary: #1a1a1a
Gray Light: #f5f5f5
Gray Medium: #e0e0e0
Gray Dark: #666666
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📸 Components Overview

### ProfessionalHeader
- Top bar with date/time
- Logo section
- Navigation menu (9 categories)
- Breaking news ticker
- Mobile responsive menu

### TopNewsSection
- 1 large featured news (2/3 width)
- 4 grid news items (1/3 width)
- Category badges
- Gradient overlays

### PhotoGallerySection
- Horizontal scroll
- 6 photos with captions
- Arrow navigation
- Smooth animations

### LatestNewsGrid
- 3-column responsive grid
- 6 news cards
- Category color coding
- Bookmark feature

### VideoSection
- 4-column video grid
- Play button overlays
- Duration badges
- View counts

### PopularNewsSidebar
- Sticky sidebar
- 8 popular news items
- Numbered rankings
- Top 3 highlighted

## 🎯 Mock Data

All sections use Bengali mock data including:
- News headlines
- Excerpts
- Timestamps in Bengali
- View counts in Bengali numerals
- Category names in Bengali

## 📱 Responsive Design

- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grid, adjusted spacing
- **Desktop**: Full 3-column + sidebar layout
- **Large Desktop**: Max-width 1400px container

## ✅ Production Ready

- ✅ TypeScript for type safety
- ✅ ESLint configuration
- ✅ Optimized images
- ✅ SEO friendly structure
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ Mobile-first approach

## 🔧 Customization

All components are modular and can be easily customized:
- Colors in `globals.css` CSS variables
- Spacing and typography
- Grid layouts
- Animation timings
- Mock data replacement

## 📄 License

MIT
