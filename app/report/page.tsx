"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, Users, FileText } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        {/* Page Title and Search */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Laporan Transaksi
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Ringkasan transaksi Anda berdasarkan semua data.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Rp 19.515.153</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Rp 11.627.941</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">Rp 24.590.886</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tabungan</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Rp 50.000.000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utang</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-Rp 28.000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Piutang</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Rp 528.000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">252</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Visualization Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Bulanan</CardTitle>
              <CardDescription>Pemasukan dan pengeluaran per bulan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Jun 2025</div>
                    <div className="text-sm text-gray-500">Bulan lalu</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">+Rp 1.098.141</div>
                    <div className="text-red-600 font-medium">-Rp 10.732.244</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div>
                    <div className="font-medium text-gray-900">Jul 2025</div>
                    <div className="text-sm text-gray-500">Bulan ini</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">+Rp 10.529.800</div>
                    <div className="text-red-600 font-medium">-Rp 13.858.642</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori Pengeluaran</CardTitle>
              <CardDescription>Pengeluaran terbesar berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rent / Mortgage</span>
                    <span className="text-sm font-medium">Rp 4.600.000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Food & Beverage</span>
                    <span className="text-sm font-medium">Rp 4.380.222</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Doctor / Hospital Visits</span>
                    <span className="text-sm font-medium">Rp 2.079.700</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Daftar transaksi terbaru Anda</CardDescription>
            </div>
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari transaksi..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Akun</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead>Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Beras, Mochi</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Food & Beverage</Badge>
                  </TableCell>
                  <TableCell>CC Mandiri</TableCell>
                  <TableCell className="text-right text-red-600 font-medium">-Rp 88.700</TableCell>
                  <TableCell>23 Jul 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sayur</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Food & Beverage</Badge>
                  </TableCell>
                  <TableCell>CC Mandiri</TableCell>
                  <TableCell className="text-right text-red-600 font-medium">-Rp 8.000</TableCell>
                  <TableCell>23 Jul 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mie goreng</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Food & Beverage</Badge>
                  </TableCell>
                  <TableCell>Blu by BCA</TableCell>
                  <TableCell className="text-right text-red-600 font-medium">-Rp 8.000</TableCell>
                  <TableCell>23 Jul 2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}