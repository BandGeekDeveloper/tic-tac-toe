import Image from 'next/image';
import Greeting from './Components/Greeting.js';

export default function Home() {
  return (
    <main className='w-full h-screen bg-white'>
      <Greeting />
    </main>
  );
}
