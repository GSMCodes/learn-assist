'use client'

import { AuroraBackground } from '@/components/ui/aurora-background';
import React from 'react';
import Headings from '@/components/ui/headings'; 
import Search from '@/components/ui/Search';

const Page = () => {
  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

      <Headings/>
      <Search />
      <AuroraBackground className="absolute inset-0 z-0"></AuroraBackground>

    </main>
  );
};

export default Page;