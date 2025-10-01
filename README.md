# Portfolio Management App

A modern React-based portfolio management dashboard featuring comprehensive investment analytics, performance tracking, and financial data visualization.

## 🚀 Features

### Portfolio Analytics Dashboard
- **Real-time Performance Tracking**: Comprehensive trailing returns analysis (YTD, 1D, 1W, 1M, 3M, 6M, 1Y, 3Y, Since Inception)
- **Benchmark Comparison**: Portfolio performance vs NIFTY50 index
- **Risk Analytics**: Current and maximum drawdown analysis
- **Interactive Charts**: Responsive equity curves with date filtering
- **Financial Calculations**: Annualized returns and risk-adjusted metrics

### Content Management
- **Blog System**: Dynamic blog post rendering with categorization
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Navigation**: Single Page Application with React Router

## 🛠 Technology Stack

- **Frontend**: React 18.2.0 with functional components and hooks
- **Routing**: React Router DOM 6.20.0
- **Charts**: Recharts 2.10.3 for financial data visualization
- **Build System**: Webpack 5 with Babel transpilation
- **Styling**: Modern CSS with Inter font family
- **Data Processing**: Custom financial calculation utilities

## 📊 Data Features

- **Historical NAV Data**: 9+ years of portfolio performance data (2015-2024)
- **Benchmark Data**: NIFTY50 comparison metrics
- **Month-on-Month Statistics**: Dynamic calculation engine
- **Excel Data Integration**: Structured data processing from financial datasets

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   The app will automatically open at `http://localhost:3000`

## 📦 Building for Production

### Build the app
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with:
- **Code Splitting**: Optimized bundle sizes
- **Minification**: Compressed JavaScript and CSS
- **Asset Optimization**: Optimized images and static assets
- **Cache Busting**: Content-based hashing for efficient caching

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Or connect your GitHub repository**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will automatically deploy on every push

### Other Deployment Options

#### Netlify
```bash
# Build the project
npm run build

# Drag and drop the dist/ folder to Netlify
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

#### AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload dist/ folder to S3 bucket
# Configure CloudFront distribution
```

## 🔧 Configuration Files

### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico))",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### Webpack Configuration
- Environment-based builds (development/production)
- Code splitting for vendor libraries
- Asset optimization and caching
- Source maps for debugging

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional financial dashboard aesthetic
- **Interactive Charts**: Hover tooltips, zoom, and pan functionality
- **Responsive Layout**: Mobile-first design with breakpoints
- **Loading States**: Smooth user experience indicators
- **Accessibility**: WCAG-compliant design patterns

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔍 Performance Optimization

- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Memoization**: React.memo and useMemo for expensive calculations
- **Efficient Rendering**: Optimized chart rendering with Recharts
- **Asset Optimization**: Compressed images and optimized fonts
- **CDN Integration**: Static asset delivery via CDN

## 🐛 Troubleshooting

### Common Issues

#### Favicon 404 Error
If you see a favicon 404 error:
1. Ensure `favicon.svg` and `favicon.ico` are in the `public/` directory
2. Check that your build process includes static assets
3. Verify the HTML meta tags are correctly set

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist/
npm run build
```

#### Deployment Issues
- Ensure all environment variables are set
- Check build logs for missing dependencies
- Verify routing configuration for SPA

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using React, Recharts, and modern web technologies** 
