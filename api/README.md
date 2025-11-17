# Backend API for Portfolio Chat

A simple Express.js backend server that provides OpenAI chat completions for the portfolio website.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

## Running the Server

### Development Mode (Frontend + Backend)

Run both the React frontend and Express backend concurrently:

```bash
npm run dev
```

### Backend Only

Run just the backend server:

```bash
npm run server
```

The server will start on `http://localhost:5000`

### Frontend Only

Run just the React frontend:

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /api/health
```

Returns the server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Chat Completions

```
POST /api/chat/completions
```

Get chat completions from OpenAI.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help you?" },
    { "role": "user", "content": "Tell me about yourself" }
  ],
  "model": "gpt-4o-mini",
  "temperature": 0.7
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "role": "assistant",
    "content": "I'm an AI assistant..."
  },
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 50,
    "total_tokens": 70
  }
}
```

## Project Structure

```
api/
├── server.js              # Main Express server
├── routes/
│   └── chat.js           # Chat routes
├── controllers/
│   └── chatController.js # OpenAI integration logic
└── README.md             # This file
```

## Error Handling

The API handles various error cases:

- **400**: Invalid request (missing or malformed messages)
- **401**: Authentication failed (invalid API key)
- **429**: Rate limit exceeded
- **500**: Server or OpenAI API errors

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file contains sensitive API keys
- Use environment variables for all sensitive configuration
- The CORS middleware is configured to allow requests from your frontend

## Deployment

When deploying to production:

1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Ensure your OpenAI API key is set in production environment
4. Consider adding rate limiting for production use

## Troubleshooting

### Server won't start
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`

### OpenAI API errors
- Verify your API key is correct in `.env`
- Check your OpenAI account has available credits
- Ensure you have access to the model you're trying to use

### CORS errors
- Make sure the backend server is running
- Check that the proxy setting in `package.json` points to the correct backend URL

