# 🚀 Final Steps to Complete Cloudinary Setup

I've integrated Cloudinary into your PSA Studios website! Here are the **ONLY 3 steps** you need to complete:

## ✅ Step 1: Create Your Cloudinary Account (5 minutes)

1. **Go to**: https://cloudinary.com
2. **Click**: "Sign up for free"
3. **Fill out the form**:
   - Email: your-email@example.com
   - Password: (create a strong password)
   - **Cloud Name**: `psa-studios` (or whatever you prefer)
4. **Click**: "Create Account"
5. **Verify your email** (check inbox)

## ✅ Step 2: Create Upload Preset (2 minutes)

1. **Log into your Cloudinary dashboard**
2. **Go to**: Settings → Upload (in left sidebar)
3. **Scroll down** to "Upload presets" section
4. **Click**: "Add upload preset"
5. **Fill out**:
   - **Preset name**: `psa_studios_preset`
   - **Signing mode**: Select "Unsigned"
   - **Folder**: Leave blank (optional)
6. **Click**: "Save"

## ✅ Step 3: Update Your Code (1 minute)

1. **Open**: `components/cloudinary-upload.tsx`
2. **Find line 42**: `const cloudName = 'demo'`
3. **Replace 'demo'** with your actual cloud name from Step 1
4. **Example**: `const cloudName = 'psa-studios'`
5. **Save the file**

## 🎯 That's It! Your Cloudinary Integration is Ready!

### **What You Get:**
- ⚡ **10MB file uploads** (larger than before!)
- 🌍 **Global CDN delivery** (super fast loading)
- 📱 **Automatic optimization** (WebP, responsive)
- 🔄 **Auto-path filling** in admin panel
- 💾 **25GB free storage** per month

### **How to Use:**
1. **Go to**: `https://your-site.vercel.app/studio-management`
2. **Login** with: `PSA.website.@#!`
3. **Click**: "Add Media"
4. **Select**: "Cloudinary CDN" tab
5. **Upload** your images/videos
6. **Files auto-fill** the path field!

### **Your Cloudinary URLs will look like:**
\`\`\`
https://res.cloudinary.com/psa-studios/image/upload/v123456/sample.jpg
https://res.cloudinary.com/psa-studios/video/upload/v123456/sample.mp4
\`\`\`

## 🚀 Deploy Instructions:

1. **Update your GitHub** with the new code
2. **Vercel will auto-deploy** in 2-3 minutes
3. **Test the Cloudinary upload** in your admin panel

## 🆘 Need Help?

If you get stuck on any step, the most common issue is:
- **Wrong cloud name**: Make sure you use YOUR cloud name, not 'demo'
- **Upload preset**: Make sure it's named exactly `psa_studios_preset`
- **Unsigned mode**: Make sure the preset is set to "Unsigned"

That's it! Your website now has professional-grade media hosting! 🎉
