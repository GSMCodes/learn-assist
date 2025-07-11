// app/notes/page.js
import React, { Suspense } from 'react';
import NotesDisplayPage from './NotesDisplayPageClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading notes...</div>}>
      <NotesDisplayPage/>
    </Suspense>
  );
}
