'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Progressbar(props) {
    const progress = ((parseInt(props.progress) / (props.progress*5))*100) || 0;
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
            <motion.div 
                className="bg-violet-600 h-4 rounded-full dark:bg-violet-300"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                    duration: 3,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
            />
        </div>
    );
}
