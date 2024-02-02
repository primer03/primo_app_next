'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Progressbar(props) {
    let currentProgress = parseInt(props.progress);
    let maxProgress = 50;
    while (currentProgress > maxProgress) {
        maxProgress += 50;
    }
    const progressPercentage = (currentProgress / maxProgress) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
            <motion.div
                className="bg-violet-600 h-4 rounded-full dark:bg-violet-300"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{
                    duration: 3,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
            />
        </div>
    );
}
