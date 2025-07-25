"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Brain, Shield, Smartphone, Cloud, Lock, Wand2, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [sheetId, setSheetId] = useState("");

  const handleViewReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (sheetId.trim()) {
      router.push(`/report/${sheetId.trim()}`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <div className="flex flex-col items-start text-left md:col-span-3">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                uWAng!
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
                Catat Keuangan Cukup via WhatsApp
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                Kirim catatan transaksi lewat WhatsApp, biarkan AI yang simpulkan detail pengeluaran. 
                Data sepenuhnya milik kamu karena disimpan di Google Sheets kamu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                <Link href="/report">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                    Lihat Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                <span>Data aman di Google Sheets</span>
              </div>
            </div>
            <div className="hidden md:block md:col-span-2">
              <Image src="/hero.png" alt="Contoh Laporan uWAng! di Google Sheets" width={350} height={350} className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* View Report Section */}
      <section id="view-report" className="bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-gray-50 p-8 rounded-lg shadow-md border">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Sudah Terdaftar?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Masukkan ID Google Sheet Anda untuk melihat laporan keuangan.
                </p>
                <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto" onSubmit={handleViewReport}>
                    <Input
                        type="text"
                        placeholder="...spreadsheets/d/[ID_Sheet_Anda]/edit?..."
                        className="flex-grow text-base p-6"
                        value={sheetId}
                        onChange={(e) => setSheetId(e.target.value)}
                    />
                    <Button type="submit" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">Lihat Laporan</Button>
                </form>
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="fitur" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Bagaimana uWAng! Bekerja?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tiga langkah sederhana untuk mengelola keuangan Anda dengan mudah.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kirim Transaksi</h3>
              <p className="text-gray-600 leading-relaxed">
                Kirim catatan transaksi Anda lewat WhatsApp dengan format bebas. 
                Tidak perlu ribet, tulis seperti biasa.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Menganalisis</h3>
              <p className="text-gray-600 leading-relaxed">
                AI otomatis menganalisis dan merinci pengeluaran Anda, 
                mengelompokkan berdasarkan kategori.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Disimpan Aman</h3>
              <p className="text-gray-600 leading-relaxed">
                Semua data disimpan di Google Sheets Anda sendiri. 
                Privasi terjaga, data sepenuhnya milik Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pilih Paket yang Tepat untuk Anda
            </h2>
            <p className="text-lg text-gray-600">
              Mulai gratis atau upgrade untuk fitur yang lebih lengkap.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Versi Gratis</CardTitle>
                <CardDescription>Sempurna untuk pemula</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">Gratis</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Catat transaksi via WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Analisis AI untuk kategori otomatis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Penyimpanan di Google Sheets pribadi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Laporan ringkas di halaman web</span>
                  </li>
                </ul>
                <Link href="https://s.id/uwang-bot">
                <Button className="w-full" variant="outline">
                  Mulai Gratis
                </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-600">
                Populer
              </Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Versi Pro</CardTitle>
                <CardDescription>Untuk pengelolaan keuangan yang lebih mendalam</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">
                  Rp 20rb<span className="text-lg font-normal text-gray-600">/bulan</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Semua fitur versi gratis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">Terhubung AI canggih yang lebih fleksibel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Laporan keuangan otomatis dan interaktif</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Kontrol pengeluaran dan budget</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Notifikasi dan reminder cerdas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Analytics mendalam</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Export data ke berbagai format</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                  Pilih Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="keunggulan" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Keunggulan uWAng!
            </h2>
            <p className="text-lg text-gray-600">
              Mengapa memilih uWAng! dibandingkan aplikasi keuangan lainnya?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Keamanan Terjamin</h3>
              <p className="text-gray-600 leading-relaxed">
                Data kamu disimpan di Google Sheets milik kamu sendiri, bukan di server pihak ketiga. 
                Privasi dan keamanan terjaga 100%.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wand2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Penyederhanaan Keuangan</h3>
              <p className="text-gray-600 leading-relaxed">
                Tidak perlu aplikasi tambahan atau interface yang rumit. 
                Semua bisa dilakukan langsung lewat WhatsApp yang sudah familiar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Akses Mudah</h3>
              <p className="text-gray-600 leading-relaxed">
                Bisa dicatat kapan saja, di mana saja, hanya dengan WhatsApp di ponsel. 
                Tidak perlu membuka aplikasi khusus atau login berulang kali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Siap Mengelola Keuangan dengan Lebih Mudah?
          </h2>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Bergabung dengan ribuan pengguna yang sudah merasakan kemudahan mencatat keuangan via WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="https://s.id/uwang-bot">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Coba Gratis
            </Button>
            </Link>
           <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Pilih Pro
            </Button>
          </div>
          
          <p className="text-sm opacity-75">
            Tidak perlu kartu kredit • Setup dalam 2 menit • Dukungan 24/7
          </p>
        </div>
      </section>
    </>
  );
}