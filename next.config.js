/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    reactStrictMode: true, //เปิดใช้งาน Strict Mode สำหรับ React
    images: {
        domains: ['i.imgur.com'],
    },
    ...nextConfig,
}
