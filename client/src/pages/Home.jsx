import React from 'react';
import FrameSequenceLanding from '../components/FrameSequenceLanding';
import XwWebsiteShowcase from '../components/XwWebsiteShowcase';

export default function Home() {
  return (
    <main className="bg-[#141619] min-h-screen text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* 1. Prologue / Landing Intro (Video 1: e0845wdsUCwuA477-optimized.mp4) */}
      <FrameSequenceLanding />

      {/* 2. The Entire Website Experience (Video 2: XW-P0oNGs3ubVaQK-optimized.mp4) */}
      <XwWebsiteShowcase />
    </main>
  );
}
