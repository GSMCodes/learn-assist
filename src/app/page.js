// src/app/page.js
import React from 'react';
import Headings from '@/components/ui/Headings';
import Search from '@/components/ui/Search';

const Page = () => {
  return (
  
    <div className="flex flex-col items-center justify-center py-10 min-h-screen">
      
      <Headings />

      <Search />

    </div>
  );
};

export default Page;