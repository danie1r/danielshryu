# 🚀 Backend Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

This will install all the required packages including:
- `express` - Web framework
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management
- `openai` - OpenAI API client
- `concurrently` - Run multiple commands

### Step 2: Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Or manually create `.env` with this content:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 3: Get Your OpenAI API Key

1. Visit [platform.openai.com](https://platform.openai.com/)
2. Sign in or create an account
3. Go to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)
6. Paste it in your `.env` file

⚠️ **Important**: Never share or commit your API key!

### Step 4: Run the Application

**Option A: Run everything together (Recommended)**
```bash
npm run dev
```
This starts both frontend (port 3000) and backend (port 5000)

**Option B: Run separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm start
```

### Step 5: Test the Chat

1. Open your browser to `http://localhost:3000`
2. Click the chat button (floating button on the page)
3. Type a message and see the AI respond!

## 📁 Backend Structure

```
api/
├── server.js                 # Express server setup
├── routes/
│   └── chat.js              # Chat API routes
├── controllers/
│   └── chatController.js    # OpenAI integration
└── README.md                # Backend documentation
```

## 🔧 API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Chat Completion
```bash
curl -X POST http://localhost:5000/api/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

## 🐛 Troubleshooting

### "Cannot find module 'express'"
Run `npm install` to install dependencies

### "OpenAI API key is not configured"
- Check your `.env` file exists in root directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart the server after changing `.env`

### "Port 5000 is already in use"
Change the PORT in `.env`:
```env
PORT=5001
```

### CORS errors
- Ensure backend is running on port 5000
- Check `package.json` has `"proxy": "http://localhost:5000"`

## 💰 OpenAI Pricing

The backend uses `gpt-4o-mini` which is very affordable:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Each chat message costs less than $0.001

[Check latest pricing](https://openai.com/api/pricing/)

## 🔐 Security

✅ `.env` is in `.gitignore` - your API key won't be committed
✅ CORS is configured for your frontend only
✅ Error handling prevents key exposure

## 📦 Deployment

For production deployment (Vercel, Heroku, etc.):

1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` in production environment
3. Consider adding rate limiting
4. Monitor your OpenAI usage

## 🎉 You're All Set!

Your portfolio now has a fully functional AI chat powered by OpenAI!

For more details, see `api/README.md`

