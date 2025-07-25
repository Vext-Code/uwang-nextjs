"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/favicon.png" alt="uWAng! logo" width={28} height={28} />
          <div className="text-2xl font-bold text-teal-600">uWAng!</div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#fitur" className="text-sm font-medium hover:text-teal-600 transition-colors">Fitur</Link>
          <Link href="/#harga" className="text-sm font-medium hover:text-teal-600 transition-colors">Harga</Link>
          <Link href="/#keunggulan" className="text-sm font-medium hover:text-teal-600 transition-colors">Keunggulan</Link>
          <Link href="/report" className="text-sm font-medium hover:text-teal-600 transition-colors">Report</Link>
        </nav>
        <Link href="https://s.id/uwang-bot">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">Coba Gratis</Button>
        </Link>
      </div>
    </header>
  );
}