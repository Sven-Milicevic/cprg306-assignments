"use client";

import Link from "next/link";

export default function AccessDenied() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,12,36,0.9),rgba(11,12,36,0.9)),url('/week-6/cbgrocer.jpg')",
      }}
    >
      <div className="bg-[#131637]/90 glow-pulse-cyan border border-cyan-500 rounded-2xl p-10 text-center space-y-6 shadow-lg">
        <h1 className="text-5xl font-extrabold text-pink-400 neon-flicker-pink">
          Access Denied
        </h1>
        <p className="text-cyan-300 text-lg">
          You must be logged in to access the shopping list.
        </p>
        <Link href="/week-8">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_20px_#00f0ff] transition">
            Go to Login Page
          </button>
        </Link>
      </div>
    </main>
  );
}