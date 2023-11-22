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

// const openai = new OpenAI({
//   apiKey: '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',
// });

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

app.post('/api/restr', async (req, res) => {
  try {
    const { word } = req.body;

    const insertQuery = 'INSERT INTO restrictions (word) VALUES ($1) RETURNING *';
    const values = [word];

    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      status: 'success',
      message: 'Inserted into restrictions table',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to insert into restrictions table' });
  }
});

app.get('/api/words', async (req, res) => {
  try {
    const dbWordsQuery = 'SELECT word FROM restrictions';
    const dbWordsResult = await pool.query(dbWordsQuery);
    const dbWords = dbWordsResult.rows.map(row => row.word.toLowerCase());
    res.json({ words: dbWords });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch words from the database' });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
