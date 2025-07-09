// src/components/Search.js
"use client"; // Mark as Client Component

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // For App Router navigation

const Search = () => {
  const [topicsInput, setTopicsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const handleInputChange = (event) => {
    setTopicsInput(event.target.value);
  };

  const handleGetNotes = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    const topics = topicsInput.split(',').map(topic => topic.trim()).filter(topic => topic.length > 0);

    if (topics.length === 0) {
      setError("Please enter at least one topic for notes generation.");
      setLoading(false);
      return;
    }

    try {
      // 1. Call the backend API to generate and save the PDF
      const response = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate notes.');
      }

      // 2. Get the PDF path from the backend response
      const { pdfPath } = await response.json(); // Backend now sends back a JSON with pdfPath

      if (!pdfPath) {
        throw new Error("PDF path not received from server.");
      }

      // 3. Navigate to the /notes page, passing the PDF path as a query parameter
      router.push(`/notes?pdfUrl=${encodeURIComponent(pdfPath)}`);

    } catch (err) {
      console.error("Error initiating notes generation:", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  // Do not interfere with Create Playlist button's functionality
  const handleCreatePlaylist = () => {
    // Your existing logic for Create Playlist button
    console.log("Create Playlist button clicked!");
  };

  return (
    <div className="relative z-10 mt-10 flex flex-col items-center w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter your topic (e.g., 'React Hooks', 'Quantum Physics Basics')..."
        className="w-full p-4 rounded-lg text-black bg-white/90 shadow-lg text-lg md:text-xl placeholder-gray-500
                   border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent
                   transition-all duration-300 ease-in-out transform hover:scale-102 focus:scale-102"
        value={topicsInput} // Controlled component
        onChange={handleInputChange}
        disabled={loading} // Disable input when loading
      />

      {/* Spacer */}
      <div className="my-6"></div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center ">
        {/* Create Playlist Button - Unchanged */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer "
          onClick={handleCreatePlaylist} // Assign your existing handler
          disabled={loading} // Optionally disable if notes generation is ongoing
        >
          Create Playlist
        </button>

        {/* Get Short Notes Button */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer"
          onClick={handleGetNotes}
          disabled={loading || topicsInput.trim().length === 0} // Disable if loading or input is empty
        >
          {loading ? 'Generating Notes...' : 'Get Short Notes'}
        </button>
      </div>

      {/* Error Message Display */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default Search;