const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function generateContent(prompt) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('No response generated');
    }

    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw new Error(`AI Service Error: ${error.message}`);
  }
}

module.exports = generateContent;