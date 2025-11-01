// src/components/Page.tsx (or similar)

import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Details About Our Project
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
        This is the dedicated page containing more information.
      </p>
      <Link
        to="/"
        className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      >
        Go Back Home
      </Link>
    </div>
  );
}
