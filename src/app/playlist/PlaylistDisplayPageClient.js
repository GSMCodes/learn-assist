'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PlaylistPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const [error, setError] = useState(null);

    

  useEffect(() => {
    const urlFromParams = searchParams.get('youtubeUrl');
    if (urlFromParams) {
      try {
        setYoutubeUrl(decodeURIComponent(urlFromParams));
      } catch (e) {
        console.error("Error decoding YouTube URL from params:", e);
        setError("Invalid playlist URL received.");
      }
    } else {
      setError("No playlist URL found in parameters.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          ← Back to Generator
        </button>

        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Your Curated Learning Playlist</h1>
        <h3 className='text-xl font-medium text-center mb-6 text-gray-300 underline'>We offer 2 carefully selected videos per topic, giving you flexibility to choose your preferred explanation directly within this playlist.</h3>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {youtubeUrl && (
          <>
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-2">Bookmark This Playlist:</h3>
              <p className="mb-2 text-gray-300">
                You can bookmark the URL below to save this specific curated playlist in your browser.
              </p>
              <Link
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all block p-2 bg-gray-600 rounded-md"
              >
                {youtubeUrl}
              </Link>
              <p className="text-sm text-gray-400 mt-2">
                (Alternatively, once opened on YouTube, use YouTube's own "Save" button to add it to your official playlists.)
              </p>
            </div>
          </>
        )}

        {!youtubeUrl && !error && (
          <p className="text-center text-lg text-gray-400">Loading playlist...</p>
        )}
      </div>
    </div>
  );
}