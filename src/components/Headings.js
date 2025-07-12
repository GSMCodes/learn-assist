'use client'
import React from 'react';

const Headings = () => {
  return (

    <div className="z-10 max-w-4xl p-8 text-gray-600 dark:text-blue-50 text-center">
      {}
      <div id='headings' className='mb-10'>
        {}
        <h1 className="text-5xl md:text-6xl font-bold mb-4">LearnAssist</h1>
      </div>
      <div id='para'>
        <p className="text-lg md:text-xl leading-relaxed">
          Transform your learning journey. Simply provide your syllabus or a list of topics you need to master. Our tool intelligently crafts either a perfectly curated YouTube playlist to guide you through or clear, concise PDF notes for quick understanding. Your personalized education starts here.
        </p>
      </div>
    </div>
  );
};

export default Headings;