import React from 'react';
import { useState } from 'react';

const Greeting = () => {
  const [playerName, setPlayerName] = useState('');

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem('playerName', playerName);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <div className='w-3/4 h-[600px] flex justify-center items-center'>
        <div className='p-16 text-center bg-opacity-50 shadow-lg rounded-xl hero-container bg-slate-50'>
          <h1 className='text-2xl text-secondary'>
            Hi there! What do we call you?
          </h1>
          <label htmlFor='playerName' className='sr-only'>
            Your Name
          </label>
          <input
            id='playerName'
            type='text'
            placeholder='Your Name'
            value={playerName}
            onChange={handleNameChange}
            className='w-full max-w-xs my-6 shadow-sm input input-bordered'
          />{' '}
          <form onSubmit={handleSubmit}>
            <button className='shadow-md btn btn-accent'>Let's play</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
