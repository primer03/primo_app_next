'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Progressbar(props) {
    const progress = props.progress || 45;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <motion.div 
                className="bg-violet-600 h-2.5 rounded-full dark:bg-violet-300"
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
