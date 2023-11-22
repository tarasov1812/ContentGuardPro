import React, { useState, useEffect } from 'react';
import styles from '../styles/Tasks.module.css';
import axios from 'axios';

function Tasks() {
  const [prompt, setPrompt] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [response, setResponse] = useState('');
  const [response2, setResponse2] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dbWords, setDbWords] = useState([]);

  useEffect(() => {
    fetchWordsFromDatabase(); // Вызываем при загрузке компонента
  }, []);

  const fetchWordsFromDatabase = async () => {
    try {
      const response = await axios.get('/api/words');
      const words = response.data.words;
      setDbWords(words);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const filterWords = () => {
  const wordsArray = prompt2.split(/\s+/); 
  const filteredWords = wordsArray.filter(word => !dbWords.includes(word));
  const updatedPrompt2 = filteredWords.join(' '); 
  console.log(updatedPrompt2);
  setPrompt2(updatedPrompt2);
};


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
      let finalText2 = '';
    console.log(selectedOption);
      switch (selectedOption) {
        case 'Grammar Check':
          finalText = 'Please correct any grammar mistakes in the following sentence: "';
          finalText2 = 'Identify and list any grammatically incorrect words in the following sentence: "';
          break;
        case 'Political restrictions':
          finalText = 'Please eliminate in the following sentence only political uncorrected sentences: "';
          finalText2 = 'Please correct the following sentence while considering political restrictions: "';
          break;
        case 'Profanity Check':
          finalText = 'Please check the following sentence for profanity and provide a version without any inappropriate language: "';
          finalText2 = 'Identify and list any profanity words in the following sentence: "';
          break;
        case 'Others':
          finalText = 'Replace word/words like ' + prompt2 + ' with the synonims in the sentence: "';
          finalText2 = 'Check and list how many times word/words like ' + prompt2 + ' in the sentence: "';
          break;
        default:
          finalText = 'Please select an option';
          break;
      }

    //   setResponse(finalText);
    console.log(finalText);
    let text = finalText + prompt + '"';
    console.log(text);
      const res = await axios.post('/api/send-prompt', {
        prompt: text,
      });

      setResponse(res.data.completion);
    let text2 = finalText2 + prompt + '"';
    console.log(text2);
    const res2 = await axios.post('/api/send-prompt', {
      prompt: text2,
    });

    setResponse2(res2.data.completion);
    } catch (error) {
      console.error('Error:', error);
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
            <div className={styles.empty}/>
            <h2 className={styles.h2}>Input content</h2>
            <div className={styles.empty}/>
            <textarea
              placeholder="Input your content"
              className="textarea textarea-bordered textarea-lg w-full w-400"
              value={prompt}
              onChange={handleInputChange}
            ></textarea>
            <div className={styles.empty}/>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-accent" onClick={handleSubmit}>
              Check
            </button>
            <div className={styles.empty}/>
            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Grammar Check</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked={selectedOption === 'Grammar Check'}
                  value="Grammar Check"
                  onChange={(e) => setSelectedOption(e.target.value)} 
                />
            </label>
            </div>
            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Political restrictions</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={selectedOption === 'Political restrictions'}
                  value="Political restrictions"
                  onChange={(e) => setSelectedOption(e.target.value)} />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">Profanity Check</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked={selectedOption === 'Profanity Check'}
                  value="Profanity Check"
                  onChange={(e) => setSelectedOption(e.target.value)} />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">Others</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={selectedOption === 'Others'}
                  value="Others"
                  onChange={(e) => setSelectedOption(e.target.value)} />
            </label>
            <input type="text" placeholder="input your restricion here" className="input input-bordered w-full max-w-xs mb-10" onChange={handleInputChange2}/>
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
            <h2 className={styles.h2}>Restricions found</h2>
            <textarea
              placeholder="Restricions"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs h-40 mt-4 text-red-500 mb-10"
              value={response2}
              readOnly
            ></textarea>
            <hr />
            <select className="select select-bordered mt-10 w-40 inline mr-20">
                <option disabled selected>Post to</option>
                <option>Twitter</option>
                <option>Facebook</option>
                <option>TickTock</option>
                <option>Insragramm</option>
            </select>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-accent w-20" >
              Post
            </button>
            </div>
          </div>
          </div>   
    </>
  );
}

export default Tasks;