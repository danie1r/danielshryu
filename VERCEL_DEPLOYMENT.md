# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio website with the backend API to Vercel.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free)
3. **OpenAI API Key**: Get it from [platform.openai.com](https://platform.openai.com)

## 📦 Project Structure for Vercel

Your project is now configured for Vercel with these files:

```
/
├── vercel.json           # Vercel configuration
├── .vercelignore        # Files to exclude from deployment
├── api/
│   ├── index.js         # Serverless function entry point
│   ├── server.js        # Local development server
│   ├── routes/          # API routes
│   └── controllers/     # Business logic
├── src/                 # React frontend source
└── public/              # Static assets
```

## 🔧 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it as a React app

### Step 3: Configure Environment Variables

Before deploying, add your environment variables:

1. In the Vercel project setup, find **"Environment Variables"** section
2. Add the following variables:

```
Name: OPENAI_API_KEY
Value: sk-your-actual-openai-api-key-here

Name: FRONTEND_URL
Value: https://your-domain.vercel.app
(You can update this after first deployment with your actual domain)

Name: NODE_ENV
Value: production
```

### Step 4: Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Step 5: Deploy!

Click **"Deploy"** and wait for the build to complete (usually 1-2 minutes)

## 🎉 Post-Deployment

### Update Environment Variables

After your first deployment, you'll get a URL like `https://your-project.vercel.app`

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Update `FRONTEND_URL` with your actual Vercel URL
4. Redeploy if needed

### Test Your Deployment

1. Visit your Vercel URL
2. Test the health endpoint: `https://your-project.vercel.app/api/health`
3. Try the chat feature on your portfolio

## 🔄 Automatic Deployments

Every time you push to your GitHub repository:
- Vercel automatically deploys to production (main branch)
- Preview deployments for pull requests
- Instant rollbacks if needed

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update `FRONTEND_URL` environment variable

## 🐛 Troubleshooting

### API Routes Not Working

**Problem**: `/api/*` routes return 404
**Solution**: 
- Check `vercel.json` is in the root directory
- Ensure `api/index.js` exists
- Redeploy the project

### OpenAI API Errors

**Problem**: Chat doesn't work
**Solution**:
- Verify `OPENAI_API_KEY` in Vercel environment variables
- Check the key starts with `sk-`
- View function logs in Vercel dashboard

### Build Fails

**Problem**: Build fails during deployment
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version matches (22.x or higher)

### CORS Issues

**Problem**: Frontend can't connect to API
**Solution**:
- Update `FRONTEND_URL` in environment variables
- Ensure it matches your actual Vercel domain
- Redeploy after updating

## 📊 Monitor Your Deployment

### View Logs
1. Go to Vercel dashboard
2. Select your project
3. Click on a deployment
4. View **Functions** logs for API debugging

### Analytics
- Vercel provides built-in analytics
- Monitor API performance and errors
- Track frontend performance

## 💰 Pricing

**Vercel Free Tier Includes:**
- Unlimited deployments
- Automatic HTTPS
- 100GB bandwidth/month
- Serverless function executions

**OpenAI Costs:**
- Same as local development
- ~$0.001 per chat message with gpt-4o-mini

## 🔐 Security Best Practices

✅ Never commit `.env` file
✅ Use Vercel environment variables for secrets
✅ Enable environment variable encryption (automatic)
✅ Regular security updates via dependabot
✅ Monitor API usage in OpenAI dashboard

## 🚀 Advanced Configuration

### Environment-Specific Variables

You can set different values for:
- **Production**: Main branch deployments
- **Preview**: Pull request deployments  
- **Development**: Local development

### Function Configuration

Add to `vercel.json` for custom timeouts:

```json
{
  "functions": {
    "api/*.js": {
      "maxDuration": 10
    }
  }
}
```

### Redirects and Rewrites

Already configured in `vercel.json`, but you can customize:
- Add redirects for old URLs
- Configure custom headers
- Set up custom 404 pages

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)
- [Serverless Functions](https://vercel.com/docs/serverless-functions)

## 🆘 Need Help?

- Check [Vercel Community](https://github.com/vercel/vercel/discussions)
- View deployment logs for specific errors
- Test locally first with `npm run dev`

---

**Quick Command Reference:**

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from command line
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs [deployment-url]
```

Enjoy your deployed portfolio! 🎉

