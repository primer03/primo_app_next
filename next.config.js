// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // เปิดใช้งาน Strict Mode สำหรับ React
    images: {
      domains: ['i.imgur.com','res.cloudinary.com'], // ระบุ domains ที่อนุญาตสำหรับรูปภาพ
    },
    publicRuntimeConfig: {
      // ใส่ URL ของเว็บไซต์ของคุณที่นี่
      // ตัวอย่างเช่น 'https://yourwebsite.com'
      // หรือถ้าเป็น development, คุณอาจใช้ 'http://localhost:3000'
      metadataBase: 'https://primo-app-next.vercel.app/',
    },
  };
  
  module.exports = nextConfig; // ส่งออกการตั้งค่า
  