import React from 'react';

const Greeting = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <div className='w-3/4 h-[600px] flex justify-center items-center'>
        <div className='p-16 text-center bg-opacity-50 shadow-lg rounded-xl hero-container bg-slate-50'>
          <h1 className='text-2xl text-secondary'>
            Hi there! What do we call you?
          </h1>
          <input
            type='text'
            placeholder='Your Name'
            className='w-full max-w-xs my-6 shadow-sm input input-bordered'
          />
          <button className='shadow-md btn btn-accent'>Let's play</button>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
