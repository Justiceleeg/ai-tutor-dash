/**
 * Homepage
 * Landing page with navigation to the tutor quality dashboard
 */

import Link from "next/link";
import { getTutorCount } from "@/lib/data/tutors";

export default function Home() {
  const tutorCount = getTutorCount();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center px-6 py-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Tutor Quality Dashboard
          </h1>
          <p className="max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 leading-8">
            Automated tutor performance evaluation system. Identify coaching
            opportunities, predict churn, and provide actionable insights.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/tutors"
              className="flex h-14 items-center justify-center rounded-lg bg-zinc-900 px-8 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-[200px]"
            >
              View All Tutors
            </Link>
          </div>

          {tutorCount > 0 && (
            <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                System Status
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {tutorCount} Tutors
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Ready for analysis
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
