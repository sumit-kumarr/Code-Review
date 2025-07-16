const aiService = require("../services/ai.services");

module.exports.getResponse = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const prompt = `
            As a code review assistant, please analyze this code and provide feedback:
            \`\`\`javascript
            ${code}
            \`\`\`
            Please include:
            1. Code quality assessment
            2. Potential improvements
            3. Best practices suggestions
        `;

        const response = await aiService(prompt);
        res.json({ response });
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({ 
            error: "Failed to get code review",
            details: error.message 
        });
    }
}