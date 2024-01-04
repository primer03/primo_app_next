'use client';
import Image from 'next/image';
import BarChart from '@/components/chartData';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <div className='mt-3 flex flex-col w-full p-2 justify-center items-center gap-3'>
          <p className='text-2xl font-bold'>ส่งกำลังใจ</p>
          <h5 className=' w-full text-center'>จำนวนรูปภาพและวิดีโอทั้งหมด 500 รูป/วิดิโอ</h5>
          <div className=' w-full max-w-[300rem] border-2 p-3'>
            <BarChart />
          </div>
          <p className=' text-3xl font-bold text-center'>ร่วมส่งภาพในความทรงจำเพื่อเป็นกำลังใจ</p>
          <Link href='/upload'>
            <button className='bg-violet-500 active:scale-90 animate-heartBeat duration-150 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>Let's go</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
