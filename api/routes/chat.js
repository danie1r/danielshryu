const express = require('express');
const router = express.Router();
const { getAssistantResponse } = require('../controllers/assistant');

// POST /api/chat/completions
router.post('/assistant', getAssistantResponse);

module.exports = router;

