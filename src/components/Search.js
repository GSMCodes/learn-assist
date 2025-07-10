// src/components/Search.js
"use client"; // Mark as Client Component

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // For App Router navigation

const Search = () => {
  const [topicsInput, setTopicsInput] = useState('');
  const [loading, setLoading] = useState(false); // For notes generation
  const [error, setError] = useState(null);
  const router = useRouter();
  // const [playlistLink, setPlaylistLink] = useState(null); // <-- Correct: This line is removed/commented out
  const [loadingPlaylist, setLoadingPlaylist] = useState(false); // For playlist generation

  const handleGeneratePlaylist = async () => {
    setLoadingPlaylist(true);
    setError(null);
    // setPlaylistLink(null); // <-- Correct: This line is removed/commented out

    try {
      // --- FIX 1: Use `topicsInput` here. It was `syllabusInput` previously. ---
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
        // --- FIX 2: Add the router.push() call here for navigation ---
        router.push(`/playlist?youtubeUrl=${encodeURIComponent(data.playlistUrl)}`);
        // The following lines are correctly commented out or removed, as we are navigating now:
        // setPlaylistLink(data.playlistUrl);
        // window.open(data.playlistUrl, '_blank');
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate notes.');
      }

      const { pdfPath } = await response.json();

      if (!pdfPath) {
        throw new Error("PDF path not received from server.");
      }

      router.push(`/notes?pdfUrl=${encodeURIComponent(pdfPath)}`);

    } catch (err) {
      console.error("Error initiating notes generation:", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false); // Always stop loading
    }
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
        // --- FIX 3: Disable input if either notes or playlist is loading ---
        disabled={loading || loadingPlaylist}
      />

      {/* Spacer */}
      <div className="my-6"></div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center ">
        {/* Create Playlist Button */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer "
          onClick={handleGeneratePlaylist} // Correct: Calls the handler for playlist generation
          // --- FIX 4: Disable if loading any operation or input is empty ---
          disabled={loading || loadingPlaylist || topicsInput.trim().length === 0}
        >
          {loadingPlaylist ? 'Creating Playlist...' : 'Create Curated Playlist'}
        </button>

        {/* Get Short Notes Button */}
        <button
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 text-lg hover:cursor-pointer"
          onClick={handleGetNotes}
          // --- FIX 5: Also disable if playlist is loading, and check topicsInput ---
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