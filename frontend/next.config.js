/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:5000/:path*'
      }
    ]
  }
}

module.exports = nextConfig
