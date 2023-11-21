import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import OpenAI from "openai";

const { Pool } = pkg;

const app = express();

// const main = fs.readFileSync('public/index.html', 'utf8');
// app.get('/', (req, res) => res.type('html').send(main));

app.use(express.static('public'));
app.use(express.json());

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

const openai = new OpenAIApi({
  key: 'YOUR_OPENAI_API_KEY',
  // другие опции, если необходимо
});

async function main() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Say this is a test.",
    max_tokens: 7,
    temperature: 0,
  });

  console.log(completion);
}
main();

console.log(response);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
