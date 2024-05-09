const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/gemini', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});
    const chat = model.startChat({
        history: req.body.history,
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
    const msg = req.body.message;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.send(text);
});



// [
//     {
//       role: 'user',
//       parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
//     },
//     {
//       role: 'model',
//       parts: [{ text: 'Great to meet you. What would you like to know?' }],
//     },
//   ]