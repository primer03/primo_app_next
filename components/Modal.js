'use client';
import Image from 'next/image';

export default function Modal({ show, close, data }) {
    function closeModal(e) {
        e.preventDefault()
        close()
    }
    return (
        <dialog id="my_modal_1" className={`modal ${show}`}>
            <div className="modal-box p-3">
                <h3 className="font-bold text-lg text-center">กติกา</h3>
                <div className="">
                    <div className="modal-content flex justify-center items-center gap-2">
                        <div className={`w-2/4  ${(show != '') ? ' animate-slideInDown' : ''}`}>
                            <p>เกณการให้คะแนน</p>
                            <ul className={`list-disc flex justify-center flex-col gap-1 list-inside text-[15px]`}>
                                <li>รุ่นที่ 1 - 5 คูณ 3</li>
                                <li>รุ่นที่ 6 - 10 คูณ 2</li>
                                <li>รุ่นที่ 11 - ปัจุบัน คูณ 1</li>
                                <li>รูป 1 คะแนน</li>
                                <li>คลิป/VDO 2 คะแนน</li>
                            </ul>
                        </div>
                        <div className='w-2/4'>
                            <Image className={(show != '') ? (` animate-slideInRight`): ''} src='https://i.imgur.com/748Agbq.png' width={200} height={200} />
                        </div>
                    </div>
                    <div className=' flex justify-end'>
                        <button onClick={closeModal} className="btn" type="submit">ปิด</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}