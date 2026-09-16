import React from 'react';
import FrameSequenceLanding from '../components/FrameSequenceLanding';
import PhysichemShowcase from '../components/PhysichemShowcase';

export default function Home() {
  return (
    <main className="bg-[#141619] min-h-screen text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* 1. Prologue / Landing Intro (Sculpture Frame Sequence) */}
      <FrameSequenceLanding />

      {/* 2. The Flagship Interactive Website Showcase (PhysichemShowcase) */}
      <PhysichemShowcase />
    </main>
  );
}


