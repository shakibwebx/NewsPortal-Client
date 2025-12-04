# Cloudinary Setup Instructions

Follow these steps to enable image uploads in your News Portal admin dashboard.

## 1. Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account (or log in if you already have one)

## 2. Get Your Credentials

After logging in to Cloudinary:

1. Go to **Dashboard** (default page after login)
2. You'll see your **Account Details** section with:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key**
   - **API Secret**

## 3. Create Upload Preset

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset**
3. Configure the preset:
   - **Preset name**: Choose any name (e.g., `news-portal-uploads`)
   - **Signing mode**: Set to **Unsigned** (important!)
   - **Folder**: Optional, you can set to `news-images`
   - **Upload control**:
     - Max file size: 5 MB recommended
     - Allowed formats: jpg, jpeg, png, gif, webp
4. Click **Save**
5. Copy the **preset name** you just created

## 4. Update Environment Variables

Open `/client/.env.local` file and update these values:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
```

Replace:
- `your_cloud_name_here` with your actual Cloud Name from step 2
- `your_preset_name_here` with the preset name you created in step 3

## 5. Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 6. Test Image Upload

1. Go to `http://localhost:3001/admin/news/create`
2. Click **"Upload Image"** button
3. Select an image from your computer
4. Image should upload to Cloudinary and appear as preview
5. When you create the news, the Cloudinary URL will be saved

## Example Configuration

If your Cloud Name is `mycompany` and Upload Preset is `news-uploads`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mycompany
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=news-uploads
```

## Troubleshooting

### "Upload preset not found" error
- Make sure the preset is set to **Unsigned** mode
- Double-check the preset name matches exactly

### Images not uploading
- Verify your Cloud Name is correct
- Check browser console for errors
- Ensure you're not exceeding free tier limits (25 credits/month)

### CORS errors
- Cloudinary automatically handles CORS for unsigned uploads
- If you see CORS errors, verify the upload preset is set to "Unsigned"

## Free Tier Limits

Cloudinary Free tier includes:
- 25 monthly credits
- 25 GB storage
- 25 GB bandwidth
- Enough for development and small projects

Need more? Upgrade to a paid plan at [cloudinary.com/pricing](https://cloudinary.com/pricing)
