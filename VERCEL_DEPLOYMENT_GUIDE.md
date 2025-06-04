# 🚀 Vercel Deployment Guide for PSA Studios

## Quick Deploy to Vercel

### Method 1: GitHub Integration (Recommended)
1. **Push to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/psa-studios.git
   git push -u origin main
   \`\`\`

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

### Method 2: Vercel CLI
\`\`\`bash
npm i -g vercel
vercel
# Follow the prompts
\`\`\`

## 📁 Project Structure for Vercel

\`\`\`
psa-studios/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel
│   ├── cinematography/    # Gallery pages
│   ├── video-editing/
│   ├── social-media/
│   └── layout.tsx
├── components/            # Reusable components
├── public/               # Static assets
│   ├── images/          # Your images
│   └── videos/          # Your videos
├── lib/                 # Utilities
└── package.json
\`\`\`

## 🔧 Vercel Configuration

### vercel.json (Optional)
\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/**/*.tsx": {
      "maxDuration": 30
    }
  }
}
\`\`\`

## 📸 Adding Media for Vercel

### For Images & Videos:
1. **Upload to `/public` folder:**
   \`\`\`
   public/
   ├── images/
   │   ├── cinematography-1.jpg
   │   ├── project-thumbnail.jpg
   │   └── hero-image.jpg
   └── videos/
       ├── showcase.mp4
       └── demo-reel.mp4
   \`\`\`

2. **Use in Admin Panel:**
   - File path: `/images/your-image.jpg`
   - File path: `/videos/your-video.mp4`

### For External URLs:
- **Images:** `https://images.unsplash.com/photo-123...`
- **Videos:** `https://player.vimeo.com/video/123...`
- **YouTube:** `https://youtube.com/watch?v=...`

## 🌐 Domain Setup

### Custom Domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `psastudios.com`
3. Configure DNS records as shown

### Free Vercel Domain:
- Your site will be available at: `your-project-name.vercel.app`

## 🔐 Environment Variables

### For Production:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add any needed variables:
   \`\`\`
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ADMIN_PASSWORD=your-secure-password
   \`\`\`

## 📱 Admin Panel Access

### After Deployment:
- **URL:** `https://your-domain.vercel.app/admin`
- **Password:** `psastudios2024` (change this!)

### Security Note:
For production, consider:
- Changing the admin password
- Adding proper authentication
- Using environment variables for sensitive data

## 🚀 Deployment Checklist

- [ ] All images uploaded to `/public/images/`
- [ ] All videos uploaded to `/public/videos/`
- [ ] Admin panel tested locally
- [ ] External URLs verified
- [ ] Custom domain configured (if applicable)
- [ ] Admin password changed
- [ ] Site tested on mobile devices

## 🔄 Updates & Maintenance

### To Update Content:
1. Use the admin panel at `/admin`
2. Changes save to localStorage
3. For permanent changes, update the default data in the code

### To Update Code:
1. Make changes locally
2. Push to GitHub
3. Vercel auto-deploys from main branch

## 📊 Performance Tips

### Image Optimization:
- Use Next.js Image component (already implemented)
- Compress images before upload
- Use WebP format when possible

### Video Optimization:
- Use MP4 format
- Compress videos for web
- Consider using external hosting (YouTube, Vimeo)

## 🆘 Troubleshooting

### Common Issues:

1. **Images not loading:**
   - Check file paths start with `/`
   - Verify files are in `/public` folder

2. **Admin panel not working:**
   - Clear browser localStorage
   - Check console for errors

3. **Build failures:**
   - Check for TypeScript errors
   - Verify all imports are correct

### Support:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Ready to deploy? Your PSA Studios website will be live in minutes! 🎬✨**
