"use client"; 

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Search = () => {
  const [topicsInput, setTopicsInput] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loadingPlaylist, setLoadingPlaylist] = useState(false); 

  const handleGeneratePlaylist = async () => {
    setLoadingPlaylist(true);
    setError(null);

    try {
      const topics = topicsInput.split(/[\n,]+/).map(topic => topic.trim()).filter(topic => topic.length > 0);
      if (topics.length === 0) {
        setError("Please enter some topics to generate a playlist.");
        setLoadingPlaylist(false);
        return;
      }

      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/playlist?youtubeUrl=${encodeURIComponent(data.playlistUrl)}`);
      } else {
        setError(data.error || 'Failed to generate playlist.');
      }
    } catch (err) {
      console.error("Error generating playlist:", err);
      setError("An unexpected error occurred while generating playlist.");
    } finally {
      setLoadingPlaylist(false);
    }
  };

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
    const response = await fetch('/api/generate-notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topics }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate notes.');
      } catch {
        throw new Error('Failed to generate notes.');
      }
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'LearnAssist_Notes.pdf';
    a.click();

    window.URL.revokeObjectURL(url); 

  } catch (err) {
    console.error("Error initiating notes generation:", err);
    setError(err.message || 'An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative z-10 mt-10 flex flex-col items-center w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter your topic (e.g., 'React Hooks', 'Quantum Physics Basics')..."
        className="w-full p-4 rounded-lg text-black bg-white/90 shadow-lg text-lg md:text-xl placeholder-gray-500
                   border-2 border-gray-600 dark:border-white focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent
                   transition-all duration-300 ease-in-out transform hover:scale-102 focus:scale-102"
        value={topicsInput} // Controlled component
        onChange={handleInputChange}
        disabled={loading || loadingPlaylist}
      />

      {/* Spacer */}
      <div className="my-6"></div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center ">
        {/* Create Playlist Button */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer "
          onClick={handleGeneratePlaylist} 
          disabled={loading || loadingPlaylist || topicsInput.trim().length === 0}
        >
          {loadingPlaylist ? 'Creating Playlist...' : 'Create Curated Playlist'}
        </button>

        {/* Get Short Notes Button */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer"
          onClick={handleGetNotes}
          disabled={loading || loadingPlaylist || topicsInput.trim().length === 0}
        >
          {loading ? 'Generating Notes...' : 'Get Short Notes'}
        </button>
      </div>

      {/* Error Message Display */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* --- Correct: The playlistLink display block is removed from here --- */}
    </div>
  );
};

export default Search;