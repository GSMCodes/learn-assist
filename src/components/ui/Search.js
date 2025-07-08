import React from "react";

const Search = () => {
  return (
    <div className="relative z-10 mt-10 flex flex-col items-center w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      {}
      <input
        type="text"
        placeholder="Enter your topic (e.g., 'React Hooks', 'Quantum Physics Basics')..."
        className="w-full p-4 rounded-lg text-black bg-white/90 shadow-lg text-lg md:text-xl placeholder-gray-500
                   border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent
                   transition-all duration-300 ease-in-out transform hover:scale-102 focus:scale-102"
      />

      {}
      <div className="my-6"></div> {}

      {}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        {}
        <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 text-lg">
          Create Playlist
        </button>

        <button className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 text-lg">
          Get Short Notes
        </button>
      </div>
    </div>
  );
};

export default Search;