'use client';
import Image from 'next/image';
import BarChart from '@/components/chartData';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';

export default function Home() {
  // Define your animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto"
    >
      <div className='mt-3 flex flex-col w-full p-2 justify-center items-center gap-3'>
        <motion.p
          className='text-2xl font-bold'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          ส่งกำลังใจ
        </motion.p>

        <motion.h5
          className=' w-full text-center'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
        >
          จำนวนรูปภาพและวิดีโอทั้งหมด 500 รูป/วิดิโอ
        </motion.h5>

        <div className=' w-full max-w-[300rem] border-2 p-3'>
          <BarChart />
        </div>

        <motion.p
          className=' text-3xl font-bold text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.9 } }}
        >
          ร่วมส่งภาพในความทรงจำเพื่อเป็นกำลังใจ
        </motion.p>

        <Link href='/upload'>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            className='bg-violet-500 active:scale-90 duration-150 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'
          >
            Let's go
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}