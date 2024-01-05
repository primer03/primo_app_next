'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CloudinaryVideo from '@/components/cloudinaryVideo';
const FontAwesomeIcon = dynamic(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: true }
);
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
export default function Home() {
  const [data, setData] = useState(Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`));
  let [image, setImage] = useState("https://i.imgur.com/euHKMYG.png");
  let [isImage, setIsImage] = useState(false);
  let [selectData, setSelectData] = useState(data[0]);
  let [file, setFile] = useState(null);
  let [isUpload, setIsUpload] = useState(false);
  let [publicId, setPublicId] = useState('');
  let [widthHeight, setWidthHeight] = useState({ width: 0, height: 0 });
  let [Blockwidth, setBlockwidth] = useState('w-full');
  let [imagObj, setImagObj] = useState('cover');
  function ChangeImage(e) {
    if (e.target.files[0] != undefined) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        setFile(file);
        let url = URL.createObjectURL(file);
        let img = new window.Image();
        img.onload = function () {
          if (this.width > this.height) {
            setBlockwidth('w-full');
            setImagObj('cover');
          } else {
            setBlockwidth('w-48');
            setImagObj('contain');
          }
        }
        img.src = url;
        setImage(url);
        setIsImage(false);
        console.log(file);
      } else {
        setFile(file);
        let url = URL.createObjectURL(file);
        let video = document.createElement('video');
        video.onloadedmetadata = function () {
          console.log('Metadata loaded');
          console.log(this.videoWidth, this.videoHeight)
          if (this.videoWidth > this.videoHeight) {
            setBlockwidth('w-full');
            setImagObj('cover');
          } else {
            setBlockwidth('w-48');
            setImagObj('contain');
          }
        };
        video.src = url;
        setImage(url);
        setIsImage(true);
      }
    }
  }
  async function uploadImage() {
    // 'use server'
    try {
      // use Cloudinary API to upload image
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-upload");
      let cloudinaryurl = file.type.includes("image") ? "image" : "video";
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/djncj31nj/${cloudinaryurl}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      setWidthHeight([data.width, data.height]);
      setPublicId(data.public_id);
      setIsUpload(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(selectData);
  }
    , [selectData]);
  return (
    <div>
      <div className=" flex h-screen w-full justify-center items-center">
        <div className=" w-full max-w-[30rem] p-3 mx-auto">
          <div className=" flex w-full flex-col gap-3 items-center">
            <div className={`${Blockwidth} h-56 rounded-md overflow-hidden relative`}>
              {!isImage ? <Image src={image} layout="fill" alt='image' objectFit={imagObj} /> : <video src={image} className={`w-full h-full object-${imagObj}`} controls autoPlay loop />}
            </div>
            <select onChange={(e) => { setSelectData(e.target.value) }} className=" w-full border-2 border-violet-600 active:border-violet-500 focus:border-violet-500 p-2 rounded-md">
              {data.map((item, index) => (
                <option key={index} value={item}>{item}</option>
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
            <button onClick={uploadImage} className='bg-violet-500 active:scale-90 animate-heartBeat duration-150 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}
