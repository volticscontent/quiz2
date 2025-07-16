import dotenv from 'dotenv'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    TIKTOK_ACCESS_TOKEN: process.env.TIKTOK_ACCESS_TOKEN,
    TIKTOK_PIXEL_ID_1: process.env.TIKTOK_PIXEL_ID_1,
    TIKTOK_PIXEL_ID_2: process.env.TIKTOK_PIXEL_ID_2,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    UTMIFY_PIXEL_ID: process.env.UTMIFY_PIXEL_ID,
  }
}

export default nextConfig
