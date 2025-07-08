'use client'
import React from 'react';

const Headings = () => {
  return (

    <div className="z-10 max-w-4xl p-8 text-white text-center">
      {}
      <div id='headings' className='mb-5'>
        {}
        <h1 className="text-5xl md:text-6xl font-bold mb-4">LearnAssist</h1>
      </div>
      <div id='para'>
        <p className="text-lg md:text-xl leading-relaxed">
          Transform your learning journey. Just type in any topic, and our tool intelligently crafts either a perfectly curated YouTube playlist to guide you through or clear, concise PDF notes for quick understanding. Your personalized education starts here.
        </p>
      </div>
    </div>
  );
};

export default Headings;