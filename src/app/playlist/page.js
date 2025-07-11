import React, { Suspense } from 'react';
import PlaylistDisplayPageClient from './PlaylistDisplayPageClient'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading Playlist...</div>}>
      <PlaylistDisplayPageClient />
    </Suspense>
  );
}
