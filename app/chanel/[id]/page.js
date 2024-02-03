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
import { Position } from '@cloudinary/url-gen/qualifiers';
export default function Home({ params }) {
  const socketRef = useRef(null);
  const calledOnce = useRef(false);
  const [balloons, setBalloons] = useState([]);
  const [balloonsDATA, setBalloonsDATA] = useState([]);
  const router = useRouter();

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomStyles(type) {
    // const r = random(255);
    // const g = random(255);
    // const b = random(255);
    const mt = random(200);
    const ml = random(50);
    const dur = type == 'image' ? randomMinMax(30, 40) :randomMinMax(50, 60);;
    return {
      // backgroundColor: `rgba(${r},${g},${b},0.7)`,
      // color: `rgba(${r},${g},${b},0.7)`,
      // boxShadow: `inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7)`,
      margin: `${mt}px 0 0 ${ml}px`,
      animation: `float ${dur}s ease-in forwards`,
    };
  }

  function addBalloon(data) {
    console.log('addBalloon');
    console.log(data);
    const newBalloon = {
      id: Date.now(), // Using current timestamp for a unique ID
      style: getRandomStyles(data.type),
      url: data.url,
      type: data.type
    };
    console.log(newBalloon);
    if (balloons.length == 0) {
      setBalloons([newBalloon]);
    } else {
      setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
    }
  }


  function createBalloons(num) {
    return Array.from({ length: num }, (_, index) => ({
      id: index,
      style: getRandomStyles()
    }));
  }

  // async function getpublicdata(public_id) {
  //   try{
  //     const res = await fetch('https://primo-test.onrender.com/api/messages/' + encodeURIComponent(public_id));
  //     const json = await res.json();
  //     console.log(json);
  //     return json.data
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    if (!calledOnce.current) {
      const regex = new RegExp('^[0-5]+$');
      if (!regex.test(params.id)) {
        router.push('/');
        return;
      }
      socketRef.current = io("https://primo-server.onrender.com", { transports: ['websocket'] });
      socketRef.current.on("connect", () => {
        console.log(`ID: ${socketRef.current.id}`);
        socketRef.current.emit('send chanel', params.id);
        // socketRef.current.emit('send message', 'Hello there from React.')
      });
      socketRef.current.on('message', (message) => {
        console.log(message);
        if (message.chanel != 0) {
          if (message.chanel == params.id) {
            addBalloon(message.data);
          }
        }
      });
      setBalloons(createBalloons(1));
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
  }, [balloonsDATA]);
  return (
    <div id="balloon-container">
      {balloons.map((balloon) => (
        balloon.url != undefined ? <div key={balloon.id} className="balloon" style={balloon.style}>
          {balloon.type == 'image' ? <Image src={balloon.url} width={300} height={300} className='rounded-full' alt=''  objectFit='cover' style={{ position: 'absolute', bottom: '0' }} /> : <video src={balloon.url} className='absolute bottom-0 rounded-md' width={200} height={200} autoPlay loop muted></video>}
        </div> : ''
      ))}
    </div>
  );
}