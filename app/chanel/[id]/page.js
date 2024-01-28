'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import LoadingOverlay from '@/components/LoadingOverlay';
const FontAwesomeIcon = dynamic(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: true }
);
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client';
export default function Home({ params }) {
  const socketRef = useRef(null);
  const calledOnce = useRef(false);
  const [balloons, setBalloons] = useState([]);
  const router = useRouter();

  function random(num) {
    return Math.floor(Math.random() * num);
  }
   function randomminmax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }  

  function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = randomminmax(30, 40);
    const  style = {
      backgroundColor: `rgba(${r},${g},${b},0.7)`,
      color: `rgba(${r},${g},${b},0.7)`,
      boxShadow: `inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7)`,
      margin: `${mt}px 0 0 ${ml}px`,
      animation: `float ${dur}s ease-in infinite`
    }
    return style;
  }

  function createBalloons(num) {
    return Array.from({ length: num }, (_, index) => ({
      id: index,
      style: getRandomStyles()
    }));
  }

  useEffect(() => {
    if (!calledOnce.current) {
      const regex = new RegExp('^[0-5]+$');
      if (!regex.test(params.id)) {
        router.push('/');
        return;
      }
      socketRef.current = io("http://localhost:8000", { transports: ['websocket'] });
      socketRef.current.on("connect", () => {
        console.log(`ID: ${socketRef.current.id}`);
        socketRef.current.emit('send chanel', params.id);
        socketRef.current.emit('send message', 'Hello there from React.')
      });
      setBalloons(createBalloons(30));
      const handleBeforeUnload = () => {
        socketRef.current.emit('chanel disconnect', params.id);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
      calledOnce.current = true;
    }
  }, [params.id]);
  return (
    <div id="balloon-container">
       {balloons.map((balloon) => (
        <div key={balloon.id} className="balloon" style={balloon.style}></div>
      ))}
    </div>
  );
}