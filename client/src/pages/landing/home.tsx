import React from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import { bio } from '../../static/constants';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className='flex flex-col gap-4'>
      <h1 className="text-8xl font-bold">Hey there!👋🏼</h1>
      <p className='text-5xl text-gradient'>I'm {bio.FirstName} { bio.LastName} </p>
      <span className='text-[1rem] text-gray-400 w-[450px]'>{bio.ShortBio}</span>

      <div className='flex items-center gap-3 bg-gradient w-fit rounded-md p-2 mt-[50px]'>
        <a href="" className='text-[0.8rem]'>More About me</a>
        <BsArrowRightCircle />
      </div>
      </div>

      <img src="" alt="A portrait of me" />
    </div>
  );
};