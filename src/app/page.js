'use client';
import Image from 'next/image';
import Greeting from './Components/Greeting.js';
import GameTypes from './Components/GameTypes.js';

export default function Home() {
  return (
    <main className='w-full h-screen bg-white'>
      <Greeting />
      <GameTypes />
    </main>
  );
}
