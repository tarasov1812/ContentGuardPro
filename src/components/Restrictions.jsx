import React, {useState} from 'react';
import styles from '../styles/Restricions.module.css';
import axios from 'axios';

function Restricions() {
    const [word, setWord] = useState('');

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const addWordToDatabase = async () => {
    try {
      const res = await axios.post('/api/restr', { word });
      console.log(res.data); // Ответ от сервера после добавления в базу данных
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
        <><div className={styles.container}>
            <div className={styles.empty} />           
            <div className={styles.content}>
            <h2 className={styles.h2}>New Restriction</h2>
            <input type="text" placeholder="Input your restriction here" className="input input-bordered w-full max-w-xs mb-10"
            value={word}
            onChange={handleInputChange} />
            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Brand restriction</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
            </label>
            </div>
                <div className="form-control">
            <label className="label cursor-pointer">
                    <span className="label-text">Legal restriction</span> 
                    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">Social restriction</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
            </label>
            </div>
                <div className="form-control">
            <label className="label cursor-pointer">
                    <span className="label-text">Other</span> 
                    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
            </label>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-accent w-20 mt-10"
            onClick={addWordToDatabase} >
              Add
            </button>
            </div>
            </div>
        </div><div className={styles.container2} /></>
    );
}

export default Restricions;