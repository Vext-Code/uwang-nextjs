'use client';

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, Users, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
// --- HAPUS --- Impor Recharts tidak lagi diperlukan
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// INTERFACES
interface Transaction {
  row_number: number;
  Kind: string;
  Date: string;
  Nominal: number;
  Category: string;
  Budget: string;
  Wallet: string;
  "Transfer In": string;
  Detail: string;
  Row: string;
  Exclude: boolean;
}

interface DashboardData {
  Balance: number;
}

interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalSaving: number;
  totalDebt: number;
  totalLoan: number;
  totalTransactions: number;
}

// FUNGSI FETCH DATA
async function fetchTransactions(id: string): Promise<Transaction[]> {
  try {
    const response = await fetch(`https://n8n.lamdi.id/webhook/uwang-reports/?sheet=${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch transactions: ${response.status}`);
    const data: Transaction[] = await response.json();
    return data.filter(transaction => !transaction.Exclude);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

async function fetchBalance(id: string): Promise<number> {
  try {
    const response = await fetch(`https://n8n.lamdi.id/webhook/uwang-dashboard/?sheet=${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch balance: ${response.status}`);
    }
    
    const data: any[] = await response.json(); 
    
    if (data && data.length > 0) {
      return data[0].Balance; 
    }
    
    return 0;

  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

// FUNGSI KALKULASI & FORMAT
function calculateSummary(transactions: Transaction[], balance: number): FinancialSummary {
  let totalIncome = 0, totalExpense = 0, totalSaving = 0, debtTaken = 0, debtRepayment = 0, loanGiven = 0, loanReceived = 0;
  transactions.forEach(t => {
    const a = t.Nominal;
    switch (t.Kind.toLowerCase()) {
      case 'income': totalIncome += a; break;
      case 'expense': case 'bills': totalExpense += a; break;
      case 'saving': totalSaving += a; break;
      case 'debt': debtTaken += a; break;
      case 'debt repayment': debtRepayment += a; break;
      case 'loan': loanGiven += a; break;
      case 'loan received': loanReceived += a; break;
    }
  });
  return {
    totalBalance: balance,
    totalIncome,
    totalExpense,
    totalSaving,
    totalDebt: debtTaken - debtRepayment,
    totalLoan: loanGiven - loanReceived,
    totalTransactions: transactions.length
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('IDR', 'Rp');
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// --- BARU --- Fungsi untuk mendapatkan label waktu relatif (Bulan ini, Bulan lalu)
function getRelativeMonth(monthStr: string): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (0 = Jan, 11 = Des)

  const [trendYear, trendMonth] = monthStr.split('-').map(Number);
  const trendDate = new Date(trendYear, trendMonth - 1); // Buat tanggal dari tren

  const monthDiff = (currentYear - trendDate.getFullYear()) * 12 + (currentMonth - trendDate.getMonth());

  if (monthDiff === 0) return "Bulan ini";
  if (monthDiff === 1) return "Bulan lalu";
  return ""; // Kembali kosong jika lebih dari sebulan yang lalu
}

function getKindColor(kind: string): string {
  switch (kind.toLowerCase()) {
    case 'income': return 'text-green-600';
    case 'expense': case 'bills': return 'text-red-600';
    case 'saving': return 'text-blue-600';
    case 'debt': case 'debt repayment': return 'text-red-600';
    case 'loan': case 'loan received': return 'text-green-600';
    default: return 'text-gray-600';
  }
}

function getKindPrefix(kind: string): string {
  switch (kind.toLowerCase()) {
    case 'income': case 'loan': case 'loan received': return '+';
    case 'expense': case 'bills': case 'debt': case 'debt repayment': return '-';
    case 'saving': return '';
    default: return '';
  }
}

const categoryColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-purple-400",
];

// --- KOMPONEN UTAMA ---
export default function UserReportPage({ params }: { params: { id: string } }) {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactionsData, balanceData] = await Promise.all([fetchTransactions(params.id), fetchBalance(params.id)]);
        setAllTransactions(transactionsData.sort((a, b) => b.row_number - a.row_number));
        setBalance(balanceData);
      } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred'); }
    }
    fetchData();
  }, [params.id]);

  useEffect(() => { setCurrentPage(1); }, [selectedMonth, searchTerm]);

  // --- UBAH --- Logika di dalam useMemo diperbarui untuk `trendData`
  const { paginatedTransactions, summary, availableMonths, totalPages, trendData, topCategories } = useMemo(() => {
    const monthlyTrends = allTransactions.reduce((acc, t) => {
      const month = t.Date.substring(0, 7);
      if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
      const kind = t.Kind.toLowerCase();
      if (kind === 'income') acc[month].income += t.Nominal;
      else if (kind === 'expense' || kind === 'bills') acc[month].expense += t.Nominal;
      return acc;
    }, {} as Record<string, { month: string; income: number; expense: number }>);

    // Diurutkan dari yang terbaru (descending) dan tambahkan data `relativeTime`
    const trendData = Object.values(monthlyTrends)
      .sort((a, b) => b.month.localeCompare(a.month)) // Urutkan dari terbaru
      .map(d => ({
        ...d,
        formattedMonth: new Date(d.month + '-02').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        relativeTime: getRelativeMonth(d.month) // Panggil fungsi baru
      }));

    const monthFiltered = selectedMonth === 'all' ? allTransactions : allTransactions.filter(t => t.Date.startsWith(selectedMonth));

    const expenseByCategory = monthFiltered
      .filter(t => ['expense', 'bills'].includes(t.Kind.toLowerCase()))
      .reduce((acc, t) => {
        const category = t.Category;
        acc[category] = (acc[category] || 0) + t.Nominal;
        return acc;
      }, {} as Record<string, number>);

    const topCategories = Object.entries(expenseByCategory)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
      
    const searchFiltered = monthFiltered.filter(t => t.Detail.toLowerCase().includes(searchTerm.toLowerCase()) || t.Category.toLowerCase().includes(searchTerm.toLowerCase()) || t.Wallet.toLowerCase().includes(searchTerm.toLowerCase()));
    const calculatedSummary = calculateSummary(monthFiltered, balance);
    const totalPages = Math.ceil(searchFiltered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = searchFiltered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const months = [...new Set(allTransactions.map(t => t.Date.substring(0, 7)))];

    return {
      paginatedTransactions: paginated,
      summary: calculatedSummary,
      availableMonths: months.sort().reverse(),
      totalPages,
      trendData,
      topCategories
    };
  }, [allTransactions, selectedMonth, searchTerm, currentPage, balance]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Link href="/report">
            <Button>Kembali ke Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/report">
            <Button variant="ghost" className="mb-4 p-0 h-auto text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Laporan Transaksi</h1>
          <p className="text-lg text-gray-600 mb-6">Ringkasan transaksi Anda berdasarkan semua data dari Google Sheets.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Filter per Bulan</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedMonth === 'all' ? 'default' : 'outline'} onClick={() => setSelectedMonth('all')} className={selectedMonth === 'all' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}>Semua</Button>
            {availableMonths.map(month => (
              <Button key={month} variant={selectedMonth === month ? 'default' : 'outline'} onClick={() => setSelectedMonth(month)} className={selectedMonth === month ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}>
                {new Date(month + '-02').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Saldo</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalBalance)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle><TrendingDown className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalExpense)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Tabungan</CardTitle><PiggyBank className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalSaving)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Utang</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">-{formatCurrency(summary.totalDebt)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Piutang</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalLoan)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Transaksi</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-gray-900">{summary.totalTransactions}</div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* --- UBAH --- Card Tren Bulanan diganti dengan tampilan list --- */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tren Bulanan</CardTitle>
              <CardDescription>Pemasukan dan pengeluaran per bulan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.length > 0 ? (
                  trendData.map((item) => (
                    <div
                        key={item.month}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                          item.relativeTime === 'Bulan ini'
                            ? 'bg-teal-50 ring-2 ring-teal-200' // <-- Style khusus untuk bulan ini
                            : 'bg-gray-50' // <-- Style default untuk bulan lainnya
                        }`}
                      >
                        <div>
                          <div className="font-medium text-gray-900">{item.formattedMonth}</div>
                          {item.relativeTime && (
                            <div className="text-sm text-gray-500">{item.relativeTime}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-medium">
                            {`+${formatCurrency(item.income)}`}
                          </div>
                          <div className="text-red-600 font-medium">
                            {`-${formatCurrency(item.expense)}`}
                          </div>
                        </div>
                      </div>
                  ))
                ) : (
                  <p className="text-sm text-center text-gray-500 py-4">Belum ada data tren bulanan.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Top 5 Pengeluaran</CardTitle><CardDescription>Kategori dengan pengeluaran terbanyak.</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.length > 0 ? topCategories.map((item, index) => (
                  <div key={item.category} className="flex flex-col space-y-1">
                    <div className="flex justify-between text-sm"><span className="font-medium text-gray-700">{item.category}</span><span className="font-bold text-gray-800">{formatCurrency(item.total)}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className={`${categoryColors[index % categoryColors.length]} h-2 rounded-full`} style={{ width: `${(item.total / topCategories[0].total) * 100}%` }}></div></div>
                  </div>
                )) : (<p className="text-sm text-center text-gray-500 py-4">Belum ada data pengeluaran.</p>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Semua Transaksi</CardTitle>
            <CardDescription>Cari dan lihat semua transaksi Anda.</CardDescription>
            <div className="pt-4">
              <Input placeholder="Cari berdasarkan deskripsi, kategori, atau akun..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Deskripsi</TableHead><TableHead>Kategori</TableHead><TableHead>Akun</TableHead><TableHead className="text-right">Jumlah</TableHead><TableHead>Tanggal</TableHead></TableRow></TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.row_number}>
                      <TableCell className="font-medium max-w-xs truncate" title={transaction.Detail}>{transaction.Detail}</TableCell>
                      <TableCell><Badge variant="secondary">{transaction.Category}</Badge></TableCell>
                      <TableCell>{transaction.Wallet}</TableCell>
                      <TableCell className={`text-right font-medium ${getKindColor(transaction.Kind)}`}>{getKindPrefix(transaction.Kind)}{formatCurrency(transaction.Nominal)}</TableCell>
                      <TableCell>{formatDate(transaction.Date)}</TableCell>
                    </TableRow>
                  ))
                ) : (<TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">Tidak ada transaksi yang ditemukan.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex items-center justify-between p-4 border-t">
            <span className="text-sm text-muted-foreground">Halaman {currentPage} dari {totalPages}</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage <= 1}>Sebelumnya</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage >= totalPages}>Selanjutnya</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}