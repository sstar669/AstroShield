'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full shadow-sm bg-neutral-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/Logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold text-white">
            AstroWatch
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm text-gray-300 hover:underline">
            Sign In
          </Link>
          <Link href="/signup" className="text-sm text-blue-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
