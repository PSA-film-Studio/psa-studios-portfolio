# 🚀 PSA Studios - Local Development Setup Guide

## Prerequisites

Before you start, make sure you have these installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control) - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## Step 1: Download the Project

### Option A: Download from v0
1. Click the "Download Code" button in v0
2. Extract the ZIP file to your desired location
3. Rename the folder to `psa-studios-portfolio`

### Option B: Clone from GitHub (if you have it there)
\`\`\`bash
git clone https://github.com/yourusername/psa-studios-portfolio.git
cd psa-studios-portfolio
\`\`\`

## Step 2: Install Dependencies

Open your terminal/command prompt in the project folder and run:

\`\`\`bash
# Using npm
npm install

# OR using yarn
yarn install
\`\`\`

This will install all the required packages listed in `package.json`.

## Step 3: Start the Development Server

\`\`\`bash
# Using npm
npm run dev

# OR using yarn
yarn dev
\`\`\`

You should see output like:
\`\`\`
✓ Ready in 2.3s
○ Local:        http://localhost:3000
○ Network:      http://192.168.1.100:3000
\`\`\`

## Step 4: Open in Browser

1. Open your web browser
2. Go to `http://localhost:3000`
3. You should see the PSA Studios website!

## Step 5: Access Admin Panel

1. Go to `http://localhost:3000/admin`
2. Enter password: `psastudios2024`
3. Now you can add/edit content!

## 📁 Project Structure

\`\`\`
psa-studios-portfolio/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel
│   ├── cinematography/    # Cinematography page
│   ├── video-editing/     # Video editing page
│   ├── social-media/      # Social media page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── navigation.tsx    # Navigation bar
│   └── admin-link.tsx    # Admin access button
├── public/               # Static files (images, videos)
│   └── images/          # Your media files go here
├── lib/                  # Utility functions
├── package.json          # Dependencies
└── next.config.mjs       # Next.js configuration
\`\`\`

## 🖼️ Adding Your Own Images/Videos

### Step 1: Add Files to Public Folder
1. Put your images in `public/images/`
2. Put your videos in `public/videos/`

Example structure:
\`\`\`
public/
├── images/
│   ├── my-photo.jpg
│   ├── project-1.png
│   └── thumbnail.jpeg
└── videos/
    ├── demo-reel.mp4
    └── behind-scenes.mov
\`\`\`

### Step 2: Use Admin Panel
1. Go to `http://localhost:3000/admin`
2. Login with password: `psastudios2024`
3. Click "Add Media"
4. For images: Enter `/images/my-photo.jpg`
5. For videos: Enter `/videos/demo-reel.mp4`
6. For external links: Enter full URL like `https://youtube.com/watch?v=...`

## 🔧 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:** Run `npm install` again

### Issue: Port 3000 already in use
**Solution:** 
\`\`\`bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
\`\`\`

### Issue: Images not showing
**Solution:** 
- Make sure images are in the `public/` folder
- Use paths starting with `/` like `/images/photo.jpg`
- Check file names match exactly (case-sensitive)

### Issue: Admin panel not working
**Solution:**
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors (F12)
- Make sure you're using the correct password

## 🎨 Customizing the Website

### Change Colors
Edit `tailwind.config.ts` and modify the color values:
\`\`\`typescript
colors: {
  'psa-black': '#000000',    // Change this
  'psa-white': '#FFFFFF',    // Change this
  'psa-silver': '#C0C0C0',   // Change this
}
\`\`\`

### Change Fonts
Edit `app/layout.tsx` to import different Google Fonts:
\`\`\`typescript
import { Cute_Font as YourFont } from 'next/font/google'
\`\`\`

### Modify Content
- Edit page files in the `app/` directory
- Use the admin panel for gallery content
- Modify text directly in the component files

## 📱 Testing on Mobile

1. Find your computer's IP address
2. On your phone, go to `http://YOUR_IP:3000`
3. Example: `http://192.168.1.100:3000`

## 🚀 Building for Production

When ready to deploy:

\`\`\`bash
# Build the project
npm run build

# Test the production build locally
npm run start
\`\`\`

## 📞 Getting Help

If you run into issues:

1. **Check the terminal** for error messages
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Restart the dev server** (Ctrl+C, then `npm run dev`)
4. **Check file paths** are correct
5. **Ensure all files are saved**

## 🎯 Quick Start Checklist

- [ ] Node.js installed
- [ ] Project downloaded and extracted
- [ ] `npm install` completed successfully
- [ ] `npm run dev` running without errors
- [ ] Website opens at `http://localhost:3000`
- [ ] Admin panel accessible at `/admin`
- [ ] Can add/edit content through admin panel

You're all set! Start customizing your PSA Studios website! 🎬✨
