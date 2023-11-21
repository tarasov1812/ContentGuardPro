import React, { useState } from 'react';
import styles from '../styles/Tasks.module.css';
import axios from 'axios';

function Tasks() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/send-prompt', {
        prompt: prompt,
      });

      setResponse(res.data.completion); 
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
            <input type="text" placeholder="Title project" className="input input-bordered max-w-xs" />
            <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Select your project</option>
                <option>Project 1</option>
                <option>Project 2</option>
            </select>
            <div className={styles.empty}/>
            <h2 className={styles.h2}>Inpunt content</h2>
            <div className={styles.empty}/>
            <textarea
              placeholder="Input your content"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              value={prompt}
              onChange={handleInputChange}
            ></textarea>
            <div className={styles.empty}/>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg " onClick={handleSubmit}>
              Check
            </button>
            <div className={styles.empty}/>
            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Gramar check</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
            </label>
            </div>
            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Legal restrictions</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">Social restricions</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">Others</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
            </label>
            <input type="text" placeholder="input your restricion here" className="input input-bordered w-full max-w-xs" />
</div>
            </div>
            <div className={styles.task2}>
            <textarea
              placeholder="Response will appear here"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              value={response}
              readOnly
            ></textarea>
            </div>
          </div>
          </div>   
    </>
  );
}

export default Tasks;