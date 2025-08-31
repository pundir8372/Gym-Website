# Gold's Gym Website

A modern, responsive gym website built with React and Vite, featuring a professional Gold's Gym-inspired design.

## Features

- **Modern Design**: Black and gold color scheme inspired by Gold's Gym branding
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Smooth Animations**: CSS transitions and scroll animations
- **Interactive Components**: 
  - Sticky navigation with smooth scrolling
  - Testimonials carousel
  - Hover effects on cards and images
  - Contact form with validation
- **SEO Optimized**: Meta tags, semantic HTML, and accessibility features

## Sections

1. **Hero Section**: Eye-catching banner with call-to-action buttons
2. **About Us**: Company information with features grid
3. **Membership Plans**: Three-tier pricing with featured plan
4. **Trainers**: Team showcase with social links
5. **Testimonials**: Customer reviews with auto-rotating carousel
6. **Gallery**: Image grid with hover effects
7. **Contact**: Contact form and business information
8. **Footer**: Links, social media, and company details

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with custom properties and Flexbox/Grid
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Oswald, Roboto)
- **Notifications**: React Toastify
- **Routing**: React Router DOM

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Abhinav8630/Gym_Website.git
cd Gym_Website/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

### GitHub Pages Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Ensure `_redirects` file is included for SPA routing

### Netlify Deployment
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The `_redirects` file will handle SPA routing

## File Structure

```
frontend/
├── public/
│   ├── _redirects          # SPA routing for deployment
│   └── favicon.ico         # Site favicon
├── src/
│   ├── components/
│   │   ├── About.jsx       # About section
│   │   ├── Contact.jsx     # Contact form and info
│   │   ├── Footer.jsx      # Site footer
│   │   ├── Gallery.jsx     # Image gallery
│   │   ├── Hero.jsx        # Hero banner
│   │   ├── Membership.jsx  # Pricing plans
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Testimonials.jsx # Customer reviews
│   │   └── Trainers.jsx    # Team showcase
│   ├── App.css            # Main stylesheet
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Customization

### Colors
Update CSS custom properties in `App.css`:
```css
:root {
  --primary-black: #000000;
  --primary-gold: #FFD700;
  --secondary-gold: #FFA500;
  /* ... other colors */
}
```

### Content
- Update text content in component files
- Replace placeholder images with actual gym photos
- Modify contact information in `Contact.jsx` and `Footer.jsx`
- Update social media links throughout components

### Styling
- Modify component styles in `App.css`
- Adjust responsive breakpoints as needed
- Customize animations and transitions

## Performance Optimizations

- Lazy loading for images
- Optimized image formats (WebP recommended)
- Minified CSS and JavaScript in production
- Efficient React component structure
- Smooth scrolling with CSS `scroll-behavior`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the [MIT License](LICENSE).
