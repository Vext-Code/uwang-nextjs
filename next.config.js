/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- Konfigurasi yang sudah ada ---
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // --- ↓↓↓ Tambahkan blok untuk CORS di sini ↓↓↓ ---
  async headers() {
    return [
      {
        // Terapkan aturan ini ke semua rute di aplikasi
        source: "/:path*",
        headers: [
          { key: "Access-control-allow-origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Authorization" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;