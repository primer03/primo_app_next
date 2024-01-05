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
    const loadingContainer = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const loadingCircle = {
        display: "block",
        width: "1rem",
        height: "1rem",
        backgroundColor: "white",
        borderRadius: "0.5rem"
    };

    const loadingContainerVariants = {
        start: {
            transition: {
                staggerChildren: 0.2
            }
        },
        end: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const loadingCircleVariants = {
        start: {
            y: "50%"
        },
        end: {
            y: "150%"
        }
    };
    const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut"
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
                <motion.div
                    style={loadingContainer}
                    variants={loadingContainerVariants}
                    initial="start"
                    animate="end"
                >
                    {[...Array(3)].map((_, index) => (
                        <motion.span
                            key={index}
                            style={loadingCircle}
                            variants={loadingCircleVariants}
                            transition={loadingCircleTransition}
                        />
                    ))}
                    <p style={{ color: '#000' }}></p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingOverlay;