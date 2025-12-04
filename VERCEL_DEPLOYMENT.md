# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (signup at vercel.com)
- Railway backend URL ready

## Step-by-Step Deployment

### 1. Ensure Code is on GitHub
Your code should already be pushed to GitHub from the backend deployment step.

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `news-portal` repository from GitHub
4. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `client`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

### 3. Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables:

Add these variables:

```
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dge2c3dkx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=news_portal_unsigned
```

**Important:**
- Replace `NEXT_PUBLIC_API_URL` with your actual Railway backend URL
- Don't include trailing slash in the URL
- These are public variables (NEXT_PUBLIC_*) so they're safe to expose

### 4. Deploy

Click "Deploy" button. Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production

This takes 2-5 minutes.

### 5. Get Your Vercel URL

After deployment, Vercel will give you a URL like:
`https://your-app-name.vercel.app`

### 6. Update Backend CORS

**IMPORTANT:** Go back to Railway and update the backend environment variable:

```
CORS_ORIGIN=https://your-app-name.vercel.app
```

This allows your frontend to communicate with the backend.

### 7. Test Your Application

1. Visit your Vercel URL
2. Navigate to `/admin/login`
3. Try logging in with your admin credentials
4. Create a test news article
5. Check if images upload correctly
6. Verify comments work

## Custom Domain (Optional)

### Add Your Own Domain

1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `channeldo.com`)
3. Follow DNS configuration instructions
4. Update Railway `CORS_ORIGIN` with your custom domain

## Troubleshooting

### API Connection Issues
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure Railway backend is running
- Verify CORS_ORIGIN in Railway matches Vercel URL

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify no TypeScript errors: `npm run build` locally

### Images Not Uploading
- Verify Cloudinary credentials
- Check `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is correct
- Ensure Cloudinary upload preset is "unsigned"

### Environment Variables Not Working
- Ensure all variables start with `NEXT_PUBLIC_`
- Redeploy after adding/changing environment variables
- Clear browser cache

## Auto-Deployment

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically rebuild and redeploy!

## Preview Deployments

Every Pull Request gets a unique preview URL for testing before merging to main.

## Performance

- Vercel automatically optimizes images
- Provides global CDN for fast loading
- Built-in analytics available

## Monitoring

Check Vercel dashboard for:
- Deployment status
- Build logs
- Runtime logs
- Performance metrics
- Error tracking
