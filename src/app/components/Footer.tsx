export default function Footer() {
  return (
    <footer className="bg-neutral-900 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-4 text-gray-400">
        <div className="text-lg font-semibold text-white">
          AstroWatch
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer">
            NASA API
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="text-xs">
          &copy; 2025 AstroWatch. Built with ❤️ using NASA APIs.
        </div>
      </div>
    </footer>
  );
}
