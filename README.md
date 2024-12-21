# Minimalist Photography Portfolio Website

A clean, typography-focused photography portfolio website with a modernist design approach. The site features a responsive layout that adapts seamlessly from desktop to mobile views.

## Design System

### Typography
- Base font: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial)
- Font size: 11px base with purposeful usage of 10px for secondary elements
- Text transforms: Uppercase styling for headers and important elements
- Letter spacing: 0.02em base, 0.05em for emphasized elements

### Layout
- Grid-based system with two main layouts:
  1. List View: 240px sidebar + flexible content area
  2. Grid View: Three-column photo grid with 75% aspect ratio
- Consistent spacing:
  - Desktop: 80px padding and gaps
  - Tablet: 40px padding and gaps
  - Mobile: 20px padding and gaps

### Color Palette
- Primary Background: White (#fff)
- Primary Text: Black (#000)
- Secondary Text: Gray (#666)
- Subtle Borders: Light Gray (#f0f0f0)

## Components

### Sidebar
- Fixed position on desktop (240px width)
- Converts to top bar on mobile
- Contains:
  - Main title (uppercase)
  - Navigation links
  - Construction notice (fixed to bottom)

### Content Filters
- Minimal select dropdowns
- Custom styled with bottom border
- View toggle for grid/list layouts
- Uppercase styling with 0.05em letter spacing

### Works Display

#### List View
- Three-column grid layout:
  - Title (250px)
  - Description
  - Date
- Subtle hover effect (0.6 opacity)
- Bottom border separator (#f0f0f0)

#### Grid View
- Three-column layout
- 75% aspect ratio for images
- Title and date positioned below
- 160px vertical spacing between rows
- 80px horizontal gap between items

### Gallery View
- Full-screen overlay
- Horizontal scrolling with snap points
- Centered images with max-height/width constraints
- Fixed header and footer controls
- Image counter and navigation
- Share and close buttons

### Loading State
- Full-screen overlay
- Centered loading text
- Animated dots (...)
- Semi-transparent white background (0.95 opacity)

## Responsive Breakpoints

### Desktop (>1024px)
- Full two-column layout
- 80px spacing
- Fixed sidebar

### Tablet (768px - 1024px)
- Two-column grid view
- 40px spacing
- Adjusted container padding

### Mobile (<768px)
- Single column layout
- 20px spacing
- Top navigation
- Simplified gallery controls
- Adjusted image padding and margins

## Interactive Elements
- Hover states: 0.6 opacity
- Smooth transitions
- Custom select styling
- Hidden scrollbars in gallery view
- Snap scrolling in gallery mode

## Notes for Developers
- All measurements are in pixels for precision
- Uses CSS Grid for main layouts
- Implements modern CSS features:
  - CSS Grid
  - Flexbox
  - Scroll Snap
  - CSS Variables recommended for maintainability
- Mobile-first media queries
- No external CSS dependencies required

## Browser Support
- Modern browsers with CSS Grid support
- -webkit- prefixes included for Safari support
- Smooth scrolling behavior where supported 