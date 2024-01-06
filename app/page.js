'use client';
import Image from 'next/image';
import BarChart from '@/components/chartData';
import { useState, useEffect,useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Progressbar from '@/components/Progressbar';
import Modal from '@/components/Modal';
export default function Home() {
  const calledOnce = useRef(false);
  const [show, setShow] = useState('');
  const [scoreData, setScoreData] = useState([]);
  const containerVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  async function getScore() {
    try {
      const res = await fetch('/api/score');
      if (res.ok) {
        const data = await res.json();
        setScoreData(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching score data:', error);
    }
  }

  useEffect(() => {
    if (!calledOnce.current) {
      getScore();
      calledOnce.current = true;
    }
  });

  function openModal(e) {
    e.preventDefault()
    setShow('modal-open')
  }

  return (
    <div className=' w-full h-screen flex justify-start items-center overflow-auto '>
      <Modal show={show} close={() => setShow('')} />
      <div className=" w-full max-w-[40rem] p-3 mx-auto">
            <div className=" flex w-full flex-col gap-3 items-center">
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
          <Progressbar />
          <div className={`w-full ${scoreData.length > 0 ? '': 'flex justify-center'} max-w-[300rem] border-2 p-3 h-[17rem]`}>
            {scoreData.length > 0 ? <BarChart scoreData={scoreData} /> : <span className="loading loading-ring loading-lg"></span>}
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
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95, backgroundColor: "#7e22ce" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-all duration-150 ease-in-out'
            >
              Let's go
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <div className='w-full fixed bottom-0'>
        <div className='text-center p-3'>
          <p onClick={openModal} className='text-xl text-gray-600 font-bold'>กติกา</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}