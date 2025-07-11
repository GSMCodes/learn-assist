"use client"; 

import React from 'react';
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link';

export default function NotesDisplayPage() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('pdfUrl'); 

  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-400 mb-4">
            Oops! No Notes Found
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            It looks like no PDF URL was provided. Please go back to the home page to generate your short notes.
          </p>
          <Link
            href="/" 
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6 md:p-10">
      <div className="w-full flex items-center justify-between mb-8">
        <button
          onClick={() => history.back()}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          ← Back to Generator
        </button>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white text-center flex-1">
          Your AI Generated Short Notes
        </h1>
          {/* Empty div to balance space on the right */}
        <div className="w-[140px] md:w-[180px]"></div>
      </div>


      {/* PDF Display Area */}
      <div className="w-full max-w-4xl lg:max-w-6xl bg-gray-800 rounded-xl shadow-2xl p-2 md:p-4 mb-8 overflow-hidden"
           style={{ height: '70vh', minHeight: '400px' }}> {}
        <iframe
          src={pdfUrl}
          title="Generated Short Notes PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '8px' }}
          className="shadow-inner"
        >
          {/* Fallback content for browsers that don't support iframes */}
          <p className="text-center text-gray-400 p-4">
            Your browser does not support embedded PDFs.
            You can <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">download the PDF directly here</a>.
          </p>
        </iframe>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold rounded-lg shadow-xl hover:from-purple-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 text-xl md:text-2xl hover:cursor-pointer transform hover:scale-105"
      >
        Download PDF
      </button>

      {}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-lg">
          Want to generate more notes?{' '}
          <a href="/" className="text-blue-400 hover:underline font-medium">
            Go back to the generator
          </a>
        </p>
      </div>
    </div>
  );
}