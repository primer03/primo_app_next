'use client';
import Image from 'next/image';
import BarChart from '@/components/chartData';
import { useState, useEffect } from 'react';
export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <div className='mt-3 flex flex-col w-full p-2 justify-center items-center gap-3'>
          <p className='text-2xl font-bold'>ส่งกำลังใจ</p>
          <h5 className=''>จำนวนรูปภาพและวิดีโอทั้งหมด 500 รูป/วิดิโอ</h5>
          <div className=' w-full max-w-[300rem] border-2 p-3'>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
