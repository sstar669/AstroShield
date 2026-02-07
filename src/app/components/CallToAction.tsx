import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="flex flex-col items-center justify-center bg-blue-700 text-white py-16 text-center px-4 min-h-[50vh]">

      <h2 className="text-3xl font-bold">Join the Mission to Track the Cosmos</h2>
      <p className="mt-4 text-lg">
        Create an account or sign in to start exploring real-time data.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-100 transition"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-700 transition"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
