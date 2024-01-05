'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingOverlay = () => {
    const tiltTransition = {
        loop: Infinity, // Loop the animation sequence infinitely
        ease: "easeInOut", // Smooth the motion
        duration: 1, // Duration for one tilt cycle; adjust as needed
    };

    const tiltVariants = {
        tiltSequence: {
            rotate: [-10, 10, -10], // Sequence: tilt left, then right, then left
        },
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                zIndex: 9999,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Image src="https://i.imgur.com/PvMBQHk.png" className=' animate-SequenceLeftRight' alt="Logo" width={100} height={100} />
                <p style={{ color: '#fff' }}>กำลังโหลด...</p>
            </div>
        </motion.div>
    );
};

export default LoadingOverlay;