const OpenAI = require('openai');

// Initialize OpenAI client lazily to ensure env vars are loaded
let openai = null;
let thread = null;

const getOpenAIClient = () => {
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
};

const getThread = async () => {
    const client = getOpenAIClient();
    if (!thread) {
        thread = await client.beta.threads.create();
    }
    return thread;
}

/**
 * Get chat completion from OpenAI
 * @route POST /api/chat/completions
 */
const getAssistantResponse = async (req, res) => {
    try {
        const { messages } = req.body;

        // Validate request
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'messages array is required'
            });
        }

        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'OpenAI API key is not configured'
            });
        }

        getOpenAIClient();
        
        // const thread = await getThread();

        // TODO: ONLY SEND ONE MESSAGE NOW. NEED TO SEND ALL CONTEXT
        const content = messages[messages.length - 1].content;
        console.log('content', content);
        const run = await openai.beta.threads.createAndRun({
            assistant_id: "asst_f95O1T21KGP3qGYWpD5h0bFk",
            thread: {
                messages: [
                    { role: "user", content },
                ],
            },
        });

        // Poll the run status until it's completed
        let runStatus = await openai.beta.threads.runs.retrieve(
            run.thread_id,
            run.id
        );

        while (runStatus.status !== 'completed') {
            if (runStatus.status === 'failed' || runStatus.status === 'cancelled' || runStatus.status === 'expired') {
                throw new Error(`Run ${runStatus.status}: ${runStatus.last_error?.message || 'Unknown error'}`);
            }
            
            // Wait a bit before polling again
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            runStatus = await openai.beta.threads.runs.retrieve(
                run.thread_id,
                run.id
            );
        }

        // Retrieve the messages from the thread
        const threadMessages = await openai.beta.threads.messages.list(run.thread_id);

        // Get the latest assistant message (first in the list since they're ordered newest first)
        const assistantMessage = threadMessages.data[0];
        let message = assistantMessage.content[0].text.value;

        // Remove citation markers like 【4:0†source】
        message = message.replace(/【[^】]*】/g, '');

        console.log('Assistant response:', message);
        
        res.json({
            success: true,
            message: {
                role: 'assistant',
                content: message,
            },
        });

    } catch (error) {
        console.error('OpenAI API Error:', error);

        // Handle specific OpenAI errors
        if (error.status === 401) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid OpenAI API key'
            });
        }

        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Too many requests. Please try again later.'
            });
        }

        // Generic error response
        res.status(500).json({
            error: 'Failed to get completion',
            message: error.message || 'An unexpected error occurred'
        });
    }
};

module.exports = {
    getAssistantResponse,
};

