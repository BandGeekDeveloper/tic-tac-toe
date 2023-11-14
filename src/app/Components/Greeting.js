import React from 'react';
import { useState } from 'react';
import GameTypes from './GameTypes';

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
      <div className='text-5xl'>Tic-Tac-Toe</div>
      <div className='text-xl'>Play against your friends or an AI</div>
      <div className='w-3/4 h-[600px] flex justify-center items-center'>
        <div className='p-16 text-center shadow-lg bg-opacity-20 rounded-xl hero-container bg-slate-50'>
          <h1 className='text-2xl text-secondary'>
            Hi there! What do we call you?
          </h1>
          <form onSubmit={handleSubmit}>
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
            <button className='shadow-md btn btn-accent'>Let's play</button>
          </form>
        </div>
      </div>
      {playerName && <GameTypes playerName={playerName} />}
    </div>
  );
};

export default Greeting;
