'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const FontAwesomeIcon = dynamic(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: true }
);
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
export default function Home() {
  const [data, setData] = useState(Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`));
  let [image, setImage] = useState("https://i.imgur.com/UTAtyis.jpg");
  let [isImage, setIsImage] = useState(false);
  function ChangeImage(e) {
    //check ว่าเป็นรูปหรือวิดีโอ
    if (e.target.files[0].type.includes("image")) {
      let url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      setIsImage(false);
    } else {
      //เอาไฟล์มาแปลงเป็น url
      let url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      setIsImage(true);
    }
  }
  useEffect(() => {
    console.log(data);
  }
    , [data]);
  return (
    <div>
      <div className=" flex h-screen w-full justify-center items-center">
        <div className=" w-full max-w-[30rem] p-3 mx-auto">
          <div className=" flex w-full flex-col gap-3 items-center">
            <div className="w-full h-40 rounded-md overflow-hidden relative">
              {!isImage ? <Image src={image} layout="fill" objectFit="cover" /> : <video className="w-full h-full object-cover" src={image} muted controls autoPlay></video>}
            </div>
            <select className=" w-full border-2 border-gray-300 p-2 rounded-md">
              {data.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            <div className=" flex flex-col gap-3 border shadow-md p-3 w-full rounded-lg">
              <p className=" font-bold text-2xl">Upload Image</p>
              <div className="border-dashed overflow-hidden border-[2px] cursor-pointer rounded-lg relative border-gray-400 p-3 bg-gray-100 w-full flex flex-col items-center gap-3">
                <p className="text-4xl text-gray-500"> <FontAwesomeIcon icon={faCloudArrowUp} /></p>
                <p className="text-lg text-gray-700"> Drop File here</p>
                <p className="text-lg text-gray-400 text-center">Supported format: PNG JPG GIF MP4</p>
                <p className="text-lg text-gray-400 font-bold">OR</p>
                <p className="text-lg text-indigo-600 font-semibold">Browse files</p>
                <input onChange={ChangeImage} accept="image/*,video/mp4" className="opacity-0 cursor-pointer absolute top-0 left-0 w-full h-full" type="file" id="fileInput" name="fileInput" required />
              </div>
            </div>
            <Link href='/upload'>
              <button className='bg-violet-500 active:scale-90 animate-heartBeat duration-150 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>Upload</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
