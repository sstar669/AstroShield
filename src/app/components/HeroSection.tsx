import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4 bg-neutral-900 min-h-[50vh]">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Explore the Universe of Near-Earth Objects
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Track asteroids and cosmic events in real-time using NASA’s open data.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    href="/signup"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                    Get Started
                </Link>
                <Link
                    href="/login"
                    className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-md hover:bg-neutral-700 transition"
                >
                    Sign In
                </Link>
            </div>
        </section>
    );
}
