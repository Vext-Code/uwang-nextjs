import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">© 2025 uWAng! All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privasi</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}