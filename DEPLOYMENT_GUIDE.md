# PSA Studios - Netlify Deployment Guide

## 🚀 Step-by-Step Deployment Instructions

### Prerequisites
- GitHub account
- Netlify account (free)
- Your project files ready

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository:**
   - Go to GitHub.com
   - Click "New repository"
   - Name it "psa-studios-portfolio"
   - Make it public
   - Don't initialize with README (we have our files)

2. **Upload your project files:**
   - Download all files from this v0 project
   - Extract them to a local folder
   - Open terminal/command prompt in that folder
   - Run these commands:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/psa-studios-portfolio.git
git push -u origin main
\`\`\`

### Step 2: Deploy to Netlify

1. **Connect to Netlify:**
   - Go to netlify.com
   - Sign up/login with your GitHub account
   - Click "New site from Git"
   - Choose "GitHub"
   - Select your "psa-studios-portfolio" repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Click "Deploy site"

### Step 3: Configure Domain (Optional)

1. **Custom domain:**
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., psastudios.com)
   - Follow DNS configuration instructions

### Step 4: Set Up Environment Variables

1. **In Netlify dashboard:**
   - Go to "Site settings" > "Environment variables"
   - Add these variables:
   \`\`\`
   NODE_VERSION = 18
   NPM_VERSION = 9
   \`\`\`

### Step 5: Enable Form Handling

1. **For contact forms:**
   - Go to "Site settings" > "Forms"
   - Enable form detection
   - Set up notifications if needed

### Step 6: Test Your Deployment

1. **Check all pages:**
   - Visit your Netlify URL
   - Test all navigation links
   - Verify WhatsApp integration works
   - Test admin panel at `/admin`

### Step 7: Set Up Continuous Deployment

Your site will automatically redeploy when you push changes to GitHub.

## 🔧 Troubleshooting Common Issues

### Build Failures

**Issue:** Build fails with "Module not found"
**Solution:** Check package.json dependencies are correct

**Issue:** Image optimization errors
**Solution:** We've disabled image optimization for static export

**Issue:** Routing problems
**Solution:** netlify.toml handles SPA routing with redirects

### Performance Issues

**Issue:** Slow loading
**Solution:** 
- Optimize images before uploading
- Use WebP format when possible
- Enable Netlify's asset optimization

### Admin Panel Issues

**Issue:** Admin panel not accessible
**Solution:** 
- Check `/admin` route works
- Verify authentication logic
- Clear browser cache

## 📱 Mobile Optimization

Your site is already mobile-responsive, but test on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

## 🔒 Security Checklist

- [x] Admin panel has authentication
- [x] No sensitive data in client code
- [x] HTTPS enabled by default on Netlify
- [x] Security headers configured in netlify.toml

## 📊 Analytics Setup (Optional)

1. **Google Analytics:**
   - Create GA4 property
   - Add tracking code to layout.tsx

2. **Netlify Analytics:**
   - Enable in site settings
   - View traffic data in dashboard

## 🚀 Going Live Checklist

- [ ] All pages load correctly
- [ ] Contact forms work
- [ ] WhatsApp integration functional
- [ ] Admin panel accessible
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking (if desired)

## 📞 Support

If you encounter issues:
1. Check Netlify deploy logs
2. Verify all files are uploaded correctly
3. Test locally with `npm run build && npm run start`
4. Contact Netlify support if needed

Your PSA Studios website should now be live and fully functional!
