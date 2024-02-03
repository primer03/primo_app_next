'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { end } from '@cloudinary/url-gen/qualifiers/textAlignment';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingOverlay from './LoadingOverlay';
import { io } from 'socket.io-client';
export default function Success() {
    const [inspirationalQuotes, setInspirationalQuotes] = useState([
        "ทางเดียวในการเรียนคณิตศาสตร์ก็คือ การฝึกทำโจทย์ — Paul Halmos",
        "การเดินทาง คือรางวัลอย่างหนึ่ง — สุภาษิตจีน",
        "วิธีที่ดีที่สุดในการทำนายอนาคตก็คือ การสร้างมันขึ้นมาเอง — Abraham Lincoln",
        "ความสำเร็จคือการก้าวเดินจากความล้มเหลวหนึ่งสู่อีกความล้มเหลวหนึ่ง โดยไม่สูญสิ้นซึ่งแรงศรัทธา — Winston Churchill",
        "ความสำเร็จไม่ได้มาจากความบังเอิญ แต่มาจาก ความเสียสละ ขยันหมั่นเพียร ศึกษาเรียนรู้อย่างหนัก และเหนือสิ่งอื่นใด มันมาจากความรักในสิ่งที่กำลังทำหรือเรียนรู้อยู่นั่นเอง — Pele",
        "การเพิ่มพูนความรู้เป็นสิ่งที่มีมนต์ขลัง ไม่ว่าจะเป็นการศึกษาเรียนรู้เรื่องชีวิตบนดาวอังคารหรือการกำเนิดจักรวาล การเรียนรู้แทบจะเป็นส่วนหนึ่งของการเป็นมนุษย์เลยก็ว่าได้ และฉันก็เชื่อว่ามันจะยังคงดำเนินต่อไป — Sally Ride",
        "อุปสรรคขวากหนามในชีวิตจริงย่อมมีหนทางเอาชนะ มีเพียงสิ่งที่อยู่ในจินตนาการเท่านั้นที่ไม่อาจเอาชนะได้ — Theodore N. Vail",
        "บรรดาผู้ประสบความสำเร็จมักจะมีแรงโมเมนตัมในตัว ยิ่งพวกเขาสำเร็จมากเท่าไหร่ ก็ยิ่งอยากสำเร็จมากขึ้น แล้วก็จะหาหนทางไปสู่ความสำเร็จมากขึ้นด้วย เช่นเดียวกัน คนที่ล้มเหลว ก็มักหดหู่กับมันจนส่งผลให้ล้มเหลวต่อไปเรื่อยๆ — Tony Robbins",
        "ผู้คนมักพูดว่าแรงผลักดันไม่ใช่สิ่งที่ยั่งยืน แต่มันเปรียบเหมือนกับการอาบน้ำนั่นแหละ เราถึงอยากให้คุณสร้างมันขึ้นใหม่ทุกวันไงล่ะ — Zig Ziglar",
        "ความกลัวที่ยิ่งใหญ่ที่สุดของคนเราไม่ควรมีต่อความล้มเหลว แต่ควรมีต่อความสำเร็จในเรื่องที่ไม่ได้สำคัญกับชีวิตจริงๆ — Francis Chan",
        "จงผลัดวันประกันพรุ่งแต่ในเรื่องที่คุณจะไม่เสียดาย หากว่าตายไปโดยไม่ได้ทำมัน — Pablo Picasso",
        "หากคุณมีความสุขกับสิ่งใดที่ทำ ผลกำไรจะตามมา หรือว่ากันง่าย ๆ คือ จงศึกษาสิ่งที่คุณชอบที่สุด — William Shakespeare, The Taming of the Shrew",
        "ไม่มีผลงานชั้นยอดชิ้นใด ที่ถูกสร้างโดยศิลปินผู้เกียจคร้าน — Anonymous",
        "แรงผลักดัน คือจุดเริ่มต้น และการทำจนเป็นนิสัย คือสิ่งที่ทำให้คุณไม่หยุดก้าวไปข้างหน้า — Jim Ryun",
        "การเรียนรู้เปรียบเหมือนการพายเรือทวนน้ำ การปล่อยใบพายราน้ำไม่อาจทำให้ก้าวหน้าได้ — สุภาษิตจีน",
        "เรียนรู้จากวันวาน ใช้ชีวิตเพื่อปัจจุบัน มีความหวังสำหรับวันพรุ่งนี้ — Albert Einstein",
        "การหาคำตอบเป็นหนทางที่ฉลาดกว่าการคาดเดา — Mark Twain",
        "เป้าหมายหรือสิ่งที่คุณศึกษาไม่สำคัญเท่ากับว่าคุณได้แบ่งปันอะไรให้ตัวเองและโลกใบนี้บ้าง — Santosh Kalwar",
        "นวัตกรรม คือ สิ่งที่แยกผู้นำและผู้ตามออกจากกัน — Steve Jobs",
        "รุ่นนี้ไม่มีเกียร์ถอย สับเกียร์ยกอย่างเดี๋ยว",
        "ผู้หญิงก็ซิ่งได้",
        "อย่ามัวแต่สันหาคำดูหมิ่น ทำมาหากินบ้างนะเป็นห่วง",
        "อยากสบายขึ้นรถทัวร์",
        "อยากใจเต้นรัวๆให้ขึ้นคันนี้",
        "มึงไม่สวยที่สุดในย่าน แค่มึงร่านที่สุดในซอย",
        "เบาะหลังนั่งนิ่ม..แต่เจ็บจิ๋มนิดนึงนะจ๊ะ",
        "วันไหน PCX ไม่ไปรับ โทรหาผมได้นะคับไปรับ-ส่งถึงที่",
        "ในเฟสไม่ต้องทำกร่าง แน่จริงมาลานกว้างๆกับพี่เลย",
        "ก็แค่หัวฉีด แต่ก็จี๊ดทุกเกียร์",
    ]);
    const searchParams = useSearchParams()
    const [generation, setGeneration] = useState('');
    const [score, setScore] = useState(0);
    const public_id = searchParams.get('public_id')
    const [count, setCount] = useState(0);
    const calledOnce = useRef(false);
    const [isShow, setIsShow] = useState(false);
    const [isShowLoading, setIsShowLoading] = useState(true);
    const socketRef = useRef(null);


    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    async function getpublicdata() {
        const res = await fetch('https://primo-test.onrender.com/api/messages/' + encodeURIComponent(public_id));
        const json = await res.json();
        console.log(json);
        if (json.status == "success") {
            setGeneration(json.data.generation);

            const datascore = 0;
            const grenID = parseInt(json.data.generation.split(' ')[1]);
            if (grenID <= 5) {
                updateScore(json.data.generation, setScoregen(json.data.type, 3));
            } else if (grenID <= 10) {
                updateScore(json.data.generation, setScoregen(json.data.type, 2));
            } else if (grenID >= 11) {
                updateScore(json.data.generation, setScoregen(json.data.type, 1));
            }
            setIsShowLoading(false);
            setIsShow(true);

        } else {
            window.location.href = "/";
        }
    }

    async function updateScore(generation, score) {
        try {

            const formData = new FormData();
            formData.append("name", generation);
            formData.append("score", score);
            const res = await fetch('https://primo-test.onrender.com/api/score/', {
                method: "PUT",
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function setScoregen(type, points) {
        if (type == 'image') {
            setScore(1 * points);
            return 1 * points;
        } else if (type == 'video') {
            setScore(2 * points);
            return 2 * points;
        }
    }

    useEffect(() => {
        if (!calledOnce.current) {
            getpublicdata();
            socketRef.current = io("https://primo-server.onrender.com", { transports: ['websocket'] });
            socketRef.current.on('connect', () => {
                console.log('connected');
                socketRef.current.emit('send message', { public_id: public_id, chanel: Math.floor((Math.random() * (5 - 1) + 1)) });
            });
            calledOnce.current = true;
        }
    }, []);
    return (
        <div>
            {isShowLoading && (<LoadingOverlay />)}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='w-full p-2 h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500'>
                {isShow && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className='w-full max-w-lg flex flex-col gap-4 items-center bg-white shadow-xl rounded-lg p-6'>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            <Image src="https://i.imgur.com/Cfi8FXw.png" width={200} height={200} className='rounded-full' />
                        </motion.div>
                        <motion.h1 initial={{ x: -100 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 100 }} className='text-3xl font-bold text-purple-700'>ขอบคุณสำหรับกำลังใจ</motion.h1>
                        <motion.p initial={{ y: 100 }} animate={{ y: 0 }} className='text-lg text-center text-gray-700'>{inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]}</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='text-md text-gray-600 font-semibold'>รุ่นที่ {generation.split(' ')[1]} ได้รับเพิ่ม {score} แต้ม</motion.p>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg' onClick={() => window.location.href = "/"}>กลับสู่หน้าหลัก</motion.button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}