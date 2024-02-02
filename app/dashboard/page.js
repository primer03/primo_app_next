'use client';
import { useState, useRef, useEffect, createRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const FontAwesomeIcon = dynamic(() =>
    import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
    { ssr: true }
);
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faVideo, faPhotoFilm, faStar, faTv } from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import CryptoJS from "crypto-js";
import Link from "next/link";
import { io } from 'socket.io-client';
export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const calledOnce = useRef(false);
    const [scoreData, setScoreData] = useState([]);
    const [countData, setCountData] = useState([]);
    const inputRefs = useRef([]);
    const [setOpenModal, setModal] = useState("");
    const [Dashboard, setDashboard] = useState(false);
    const socketRef = useRef(null);
    const [chanels, setChanels] = useState([]);
    const [borderOtp, setBorderOtp] = useState("border-gray-400");
    inputRefs.current = Array(4).fill().map((_, i) => inputRefs.current[i] ?? createRef());

    async function getScore() {
        try {
            const res = await fetch('https://primo-test.onrender.com/api/score');
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

    async function getCount() {
        try {
            const res = await fetch('https://primo-test.onrender.com/api/messages/count');
            if (res.ok) {

                const data = await res.json();
                setCountData(data.data);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching countimages data:', error);
        }
    }

    function encryptData(data) {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'primohee').toString();
        return ciphertext;
    }

    function decryptData(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, 'primohee');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }

    async function LoadVerify() {
        const encryptedOtp = localStorage.getItem("otp");
        if (encryptedOtp) {
            var strotp = decryptData(encryptedOtp);
            if (strotp === '2303') {
                setModal("");
                setDashboard(true);
            } else {
                setModal("modal-open");
                setDashboard(false);
            }
        } else {
            setModal("modal-open");
            setDashboard(false);
        }
    }

    const handleInputChange = (index, event) => {
        const value = event.target.value;
        const isNumber = /^[0-9]$/; // Regular expression to check if the value is a number

        // Check if the input is a number before processing
        if (isNumber.test(value) || value === '') {
            // Move to next input on input
            if (index < 3 && inputRefs.current[index].current.value.length === 1) {
                inputRefs.current[index + 1].current.focus();
            }
            var strotp = inputRefs.current.map((item) => item.current.value).join('');
            if (strotp.length === 4 && inputRefs.current[index].current.value.length === 1) {
                if (strotp === '2303') {
                    setModal("");
                    setDashboard(true);
                    localStorage.setItem("otp", encryptData(strotp));
                } else {
                    setBorderOtp("border-red-500");
                   setTimeout(() => {
                    inputRefs.current.map((item) => item.current.value = '');
                    inputRefs.current[0].current.focus();
                    setBorderOtp("border-gray-400");
                   }, 1000);
                }
            }
            // Move to previous input on delete/backspace
            if (event.key === 'Backspace' && index > 0 && inputRefs.current[index].current.value.length === 0) {
                inputRefs.current[index - 1].current.focus();
            }


        } else {
            event.target.value = '';
        }
    };


    useEffect(() => {
        if (!calledOnce.current) {
            LoadVerify();
            getScore();
            getCount();
            socketRef.current = io("https://primo-server.onrender.com/", { transports: ['websocket'] });
            socketRef.current.on("connect", () => {
                socketRef.current.emit('send message', 'Welcome to Dashboard.')
            });
            socketRef.current.on("getChanel", (data) => {
                setChanels(data);
            });
            socketRef.current.on("chanel", (data) => {
                setChanels(data);
            });
            socketRef.current.on("chanelDis", (data) => {
                setChanels(data);
            });
            calledOnce.current = true;
        }
    });

    return (
        <div>
            <dialog id="my_modal_1" className={`modal ${setOpenModal}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">ใส่รหัส</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                    <div className="modal-action">
                        <div className="flex gap-7 w-full">
                            {Array.from(Array(4).keys()).map((item, index) => (
                                <input
                                    ref={inputRefs.current[index]}
                                    className={`border ${borderOtp} rounded-md p-1.5 h-20 w-full text-center text-3xl caret-transparent`}
                                    type="text"
                                    maxLength="1"
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyDown={(e) => handleInputChange(index, e)}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </dialog>
            {Dashboard ? <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main>
                            {scoreData.length == 0 ? <LoadingOverlay /> : <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {/* <p><FontAwesomeIcon icon={faImage} className="mr-2" />อัพโหลด</p> */}
                                <p className="text-2xl mb-3 font-bold text-black dark:text-white">อัพโหลด</p>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                                    <div className="rounded-sm flex flex-col gap-3 border animate-zoomIn border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className=" w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                                            <FontAwesomeIcon icon={faImage} className="text-blue-700 text-2xl" />
                                        </div>
                                        <p className="text-start text-xl text-black font-bold">{countData.image} รูป</p>
                                        <p className="text-start text-sm">จำนวนรูปทั้งหมด</p>
                                    </div>
                                    <div className="rounded-sm flex flex-col gap-3 border animate-zoomIn border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className=" w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                                            <FontAwesomeIcon icon={faVideo} className="text-blue-700 text-2xl" />
                                        </div>
                                        <p className="text-start text-xl text-black font-bold">{countData.video} วีดีโอ</p>
                                        <p className="text-start text-sm">จำนวนวีดีโอทั้งหมด</p>
                                    </div>
                                    <div className="rounded-sm flex flex-col gap-3 border animate-zoomIn border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className=" w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                                            <FontAwesomeIcon icon={faPhotoFilm} className="text-blue-700 text-2xl" />
                                        </div>
                                        <p className="text-start text-xl text-black font-bold">{countData.total} ครั้ง</p>
                                        <p className="text-start text-sm">จำนวนการอัพโหลดทั้งหมด</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-3">
                                    <div className="col-span-2">
                                        <p className="text-2xl my-3 font-bold text-black dark:text-white">คะแนน</p>
                                        <div className=" w-full h-[30rem] overflow-auto scorebox">
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3 xl:grid-cols-3 2xl:grid-cols-3 2xl:gap-3">
                                                {scoreData.map((score, index) => (
                                                    <div key={index} className="rounded-sm font-bold flex gap-3 border animate-zoomIn border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
                                                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
                                                        <p>{score.name}: </p>
                                                        <p className="text-green-500">{score.score}</p>
                                                        <p>คะแนน</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="text-2xl my-3 font-bold text-black dark:text-white">ช่องส่งข้อความ</p>
                                        <div className=" w-full h-[30rem] overflow-auto scorebox">
                                            <div className=" flex flex-col gap-3">
                                                {chanels.map((chanel, index) => (
                                                   <Link href={`/chanel/${index + 1}`} target="_blank" key={index}>
                                                   <div className="rounded-sm font-bold flex items-center justify-between gap-3 border animate-zoomIn border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
                                                       <div className=" flex gap-3">
                                                           <FontAwesomeIcon icon={faTv} className="text-blue-700 text-2xl" />
                                                           <p> {index + 1}</p>
                                                       </div>
                                                       <div className={`w-5 h-5 rounded-full ${chanel.connect ? 'bg-green-500' : 'bg-red-600'}`}></div>
                                                   </div>
                                               </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </main>
                    </div>
                </div>
            </div> : <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"></div>}
        </div>
    );
}