import Link from "next/link";
import { Construction, Home, Hammer } from "lucide-react";

export default function UnderConstruction() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="flex items-center justify-center space-x-3 text-amber-500">
        <Construction className="h-16 w-16 animate-bounce" />
        <Hammer className="h-12 w-12" />
      </div>

      <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
        Page Under Construction
      </h1>

      <p className="mt-3 max-w-md text-gray-600">
        We're working hard to bring you something amazing! Please check back soon.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Home className="h-5 w-5" />
        Go Back Home
      </Link>
    </main>
  );
}