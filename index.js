const { OpenAI } = require('openai');
require('dotenv').config();

module.exports = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { query } = req.query;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You recommend Roblox games based on user preferences. Always respond with 3 game recommendations including their descriptions and Roblox URLs."
    }, {
      role: "user",
      content: query
    }]
  });

  res.status(200).json({
    recommendations: response.choices[0].message.content
  });
}
