import { NextResponse } from 'next/server';
import { google } from 'googleapis'; 

export async function POST(req) {
  try {
    console.log("API route /api/generate-playlist received request.");
    const { topics } = await req.json();
    console.log("Received topics for playlist:", topics);

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({ error: 'No topics provided or topics format is incorrect.' }, { status: 400 });
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY, 
    });

    const videoIds = new Set();

    for (const topic of topics) {
      try {
        console.log(`Searching YouTube for topic: "${topic}"`);
        const searchResponse = await youtube.search.list({ 
          q: `${topic} full explained`,
          part: 'snippet',
          type: 'video',
          maxResults: 2, 
          videoEmbeddable: 'true',
          videoSyndicated: 'true', 
          safeSearch: 'strict', 
        });

        if (searchResponse.data.items && searchResponse.data.items.length > 0) {
          searchResponse.data.items.forEach(item => {
            if (item.id && item.id.videoId) { 
                videoIds.add(item.id.videoId);
            }
          });
          console.log(`Found ${searchResponse.data.items.length} videos for "${topic}"`);
        } else {
          console.log(`No videos found for "${topic}"`);
        }

      } catch (youtubeError) {
        console.error(`ERROR: Youtube failed for topic "${topic}":`, youtubeError.message);
      }
    }

    const videoIdList = Array.from(videoIds); 
    if (videoIdList.length === 0) {
      return NextResponse.json({ error: 'No relevant videos found for the provided topics.' }, { status: 404 });
    }

    const subsequentVideoIds = videoIdList.join(',');
    
    const playlistUrl = `https://www.youtube.com/watch_videos?video_ids=${subsequentVideoIds}`;
    
    console.log("Generated YouTube Playlist URL:", playlistUrl);
    return NextResponse.json({ playlistUrl: playlistUrl }, { status: 200 });

  } catch (error) {
    console.error('Final Catch Block ERROR in /api/generate-playlist route:', error);

    return NextResponse.json({ error: 'Internal Server Error: Failed to generate playlist.', details: error.message }, { status: 500 });
  }
}