import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import OpenAI from "openai";
import bodyParser from 'body-parser';
import axios from 'axios';

const { Pool } = pkg;

const app = express();
// const main = fs.readFileSync('public/index.html', 'utf8');
// app.get('/', (req, res) => res.type('html').send(main));

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'twitter_data_base_user',
  host: 'dpg-cjri4861208c73a2ceig-a.oregon-postgres.render.com',
  database: 'twitter_data_base',
  password: 'KDq4Mrt2Eoz7Ps5t1WZwEgFWe1q3Dp8I',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
});

const openai = new OpenAI({
  apiKey: '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',
});

app.post('/api/send-prompt', async (req, res) => {
  try {
    const { prompt } = req.body;

    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
      {
        prompt,
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer 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`, // Replace with your API key
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(prompt);

    const completion = openaiResponse.data.choices[0].text.trim(); // Extract completion text

    res.json({ completion });
    console.log(completion);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to process the prompt' });
  }
});

// async function main() {
//   const completion = await openai.completions.create({
//     model: "gpt-3.5-turbo-instruct",
//     prompt: "Say this is a test.",
//     max_tokens: 7,
//     temperature: 0,
//   });

//   console.log(completion);
// }
// main();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
