// Tasks.jsx
import React, { useState } from 'react';
import styles from '../styles/Tasks.module.css';
import axios from 'axios';

function Tasks() {
  const [prompt, setPrompt] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [response, setResponse] = useState('');
  const [response2, setResponse2] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [postTo, setPostTo] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setPrompt2(event.target.value);
  };

  const handleSubmit = async () => {
    setResponse('');
    setResponse2('');
    try {
      let finalText = '';
      console.log(selectedOption);
      switch (selectedOption) {
        case 'Check Grammar':
          finalText = ' - write this phrase grammatically correct';
          break;
        case 'Legal restrictions':
          finalText = '- rewrite the text so that there are no legal mistakes';
          break;
        case 'Social restrictions':
          finalText = ' - rewrite the text politically correct';
          break;
        case 'Others':
          finalText = prompt2;
          break;
        default:
          finalText = 'Please select an option';
          break;
      }

      let text = ' ' + prompt + ' - ' + finalText;
      console.log(text);
      const res = await axios.post('/api/send-prompt', {
        prompt: text,
      });

      setResponse(res.data.completion);
      let text2 = ' ' + prompt + ' what problems does this text have? write down the points';
      console.log(text2);
      const res2 = await axios.post('/api/send-prompt', {
        prompt: text2,
      });

      setResponse2(res2.data.completion);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePost = async () => {
    try {
      const tweet = `${response} ${prompt2}`;
  
      // Replace with your Twitter API endpoint
      const twitterApiEndpoint = 'https://api.twitter.com/2/tweets';
  
      // Replace with your Twitter API Bearer Token
      const twitterBearerToken = 'AAAAAAAAAAAAAAAAAAAAAE6brAEAAAAAe0tx7Y2vGvalDHf52pAyAnRRbTI%3DXCv9vppvmTtQcR3m0E0ZtReDwGrrQcFBQXhUeITZ4hsTCWP2Dr';
  
      console.log('Tweet Content', tweet);
      // Send the tweet to Twitter using the Twitter API
      const res = await axios.post(twitterApiEndpoint, { text: tweet }, {
        headers: {
          Authorization: `Bearer ${twitterBearerToken}`,
        },
      });
  
      // Handle the response from the Twitter API (success or failure)
      console.log('Twitter Post Response:', res.data);
    } catch (error) {
      console.error('Error posting to Twitter:', error);

      if (error.response){
        console.error('Twitter API Response:', error.response.data);
      }
    }
  };
  

  return (
    <>
      <div className={styles.contentForAll}>
        <h1 className={styles.h1}>Create Task</h1>
        <div className={styles.content}>
          <div className={styles.task}>
            <input type="text" placeholder="Title project" className="input input-bordered mr-10" />
            <select className="select select-bordered ml-20 w-100">
              <option disabled selected>Select your project</option>
              <option>Project 1</option>
              <option>Project 2</option>
            </select>
            <div className={styles.empty} />
            <h2 className={styles.h2}>Input content</h2>
            <div className={styles.empty} />
            <textarea
              placeholder="Input your content"
              className="textarea textarea-bordered textarea-lg w-full w-400"
              value={prompt}
              onChange={handleInputChange}
            ></textarea>
            <div className={styles.empty} />
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-accent" onClick={handleSubmit}>
              Check
            </button>
            <div className={styles.empty} />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Grammar check</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked={selectedOption === 'Check Grammar'}
                  value="Check Grammar"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Legal restrictions</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked={selectedOption === 'Legal restrictions'}
                  value="Legal restrictions"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Social restrictions</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked={selectedOption === 'Social restrictions'}
                  value="Social restrictions"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Others</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked={selectedOption === 'Others'}
                  value="Others"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </label>
              <input
                type="text"
                placeholder="input your restriction here"
                className="input input-bordered w-full max-w-xs mb-10"
                onChange={handleInputChange2}
              />
            </div>
          </div>
          <div className={styles.task2}>
            <div className={styles.avatar} />
            <p className={styles.jose}>José Castro</p>
            <textarea
              placeholder="Response will appear here"
              className="textarea textarea-bordered textarea-lg w-full w-400 mb-4"
              value={response}
              readOnly
            ></textarea>
            <h2 className={styles.h2}>Restrictions found</h2>
            <textarea
              placeholder="Restrictions"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs h-40 mt-4 text-red-500 mb-10"
              value={response2}
              readOnly
            ></textarea>
            <hr />
            <select
              className="select select-bordered mt-10 w-40 inline mr-20"
              value={postTo}
              onChange={(e) => setPostTo(e.target.value)}
            >
              <option disabled selected>Post to</option>
              <option>Twitter</option>
              <option>Facebook</option>
              <option>TickTock</option>
              <option>Instagram</option>
            </select>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-accent w-20" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
