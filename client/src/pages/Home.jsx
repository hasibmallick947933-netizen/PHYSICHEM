import React from 'react';
import FrameSequenceLanding from '../components/FrameSequenceLanding';
import FrameSequenceShowcase from '../components/FrameSequenceShowcase';

export default function Home() {
  return (
    <main className="bg-[#141619] min-h-screen text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* 1. Prologue / Landing Intro (Video 1: sculpture frame sequence) */}
      <FrameSequenceLanding />

      {/* 2. The Exact Website Experience (Video 2 / 20 Website Design Frames: FrameSequenceShowcase) */}
      <FrameSequenceShowcase />
    </main>
  );
}

