# The Life Gym - Deployment Guide

## 🚀 GitHub Pages Deployment

### Frontend Deployment (Static Site)

1. **Update package.json homepage**:
   ```json
   "homepage": "https://yourusername.github.io/Gym_Website"
   ```

2. **Build and Deploy**:
   ```bash
   cd frontend
   npm run build
   npm run deploy
   ```

3. **GitHub Pages Settings**:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### Backend Deployment Options

Since GitHub Pages only supports static sites, you'll need to deploy the backend separately:

#### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option 2: Render
1. Connect your GitHub repository
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables

#### Option 3: Heroku
```bash
# Install Heroku CLI
heroku create your-gym-backend
git subtree push --prefix backend heroku main
```

### Environment Variables for Production

Create these environment variables in your hosting platform:

```env
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thelifegym
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@thelifegym.com
JWT_SECRET=your-secure-jwt-secret
NODE_ENV=production
```

### Database Setup (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string and update MONGO_URI

### Domain Setup (After Client Approval)

1. **Purchase Domain**: GoDaddy, Namecheap, etc.
2. **DNS Configuration**:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

3. **Update GitHub Pages**:
   - Add custom domain in repository settings
   - Enable "Enforce HTTPS"

### SSL Certificate
GitHub Pages automatically provides SSL certificates for custom domains.

### Performance Optimization

1. **Image Optimization**:
   ```bash
   # Install imagemin
   npm install -g imagemin-cli imagemin-webp
   
   # Convert images to WebP
   imagemin public/*.jpg --out-dir=public/optimized --plugin=webp
   ```

2. **Code Splitting** (Already implemented with React Router)

3. **Caching Headers** (Configure in hosting platform)

### Monitoring & Analytics

1. **Google Analytics**:
   ```html
   <!-- Add to index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Error Monitoring**: Consider Sentry for production error tracking

### Backup Strategy

1. **Database Backups**: MongoDB Atlas automatic backups
2. **Code Backups**: GitHub repository
3. **Media Backups**: Cloud storage (AWS S3, Cloudinary)

### Security Checklist

- [x] Environment variables secured
- [x] HTTPS enabled
- [x] Input validation implemented
- [x] Rate limiting configured
- [x] CORS properly configured
- [x] Admin panel password protected

### Post-Deployment Testing

1. **Functionality Tests**:
   - Contact form submission
   - Class booking system
   - BMI calculator
   - Nutrition tracker
   - Admin panel access

2. **Performance Tests**:
   - Page load speed
   - Mobile responsiveness
   - Cross-browser compatibility

3. **SEO Tests**:
   - Meta tags
   - Structured data
   - Sitemap generation

### Maintenance

1. **Regular Updates**:
   - Dependencies updates
   - Security patches
   - Content updates

2. **Monitoring**:
   - Uptime monitoring
   - Performance monitoring
   - Error tracking

### Cost Estimation

- **GitHub Pages**: Free
- **Backend Hosting**: $5-20/month
- **Database**: $0-9/month (MongoDB Atlas)
- **Domain**: $10-15/year
- **Total**: ~$15-35/month

### Support & Documentation

- Frontend: React + Vite documentation
- Backend: Node.js + Express documentation
- Database: MongoDB documentation
- Deployment: Platform-specific guides
