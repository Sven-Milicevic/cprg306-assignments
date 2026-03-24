"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Home() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

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
          Grocery List
        </h1>

        {!user ? (
          <>
            <p className="text-cyan-300">
              Sign in to manage your shopping list and discover meal ideas.
            </p>

            <button
              onClick={handleSignIn}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_20px_#ff2be6] transition"
            >
              Sign In with GitHub
            </button>
          </>
        ) : (
          <>
            <p className="text-cyan-300">
              Welcome,{" "}
              <span className="text-pink-400 font-semibold">
                {user.displayName}
              </span>
            </p>

            <p className="text-gray-300 text-sm">{user.email}</p>

            <div className="flex justify-center gap-4 mt-4">

              <Link href="week-8/shopping-list">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_20px_#00f0ff] transition">
                  Open Shopping List
                </button>
              </Link>

              <button
                onClick={handleSignOut}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_20px_#ff2be6] transition"
              >
                Logout
              </button>

            </div>
          </>
        )}
      </div>
    </main>
  );
}