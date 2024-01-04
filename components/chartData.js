'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

// Dynamically import the Bar component with SSR disabled
const Bar = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Bar),
  { ssr: false }
);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = React.memo((props) => {
    const [chartData, setChartData] = useState({ datasets: [] });
    const [chartOptions, setChartOptions] = useState({});
    const [isDataLoaded, setDataLoaded] = useState(false);
    let RandBgColor = Array.from({ length: 27 }, () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
    let RandBorderColor = RandBgColor.map((color) => color.replace('0.5', '1'));
    const initializeChartData = useCallback(() => {
        setChartData({
            labels: Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`),
            datasets: [{
                label: '# of Votes',
                data: Array.from({ length: 27 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(138, 43, 226, 0.7)',
                borderColor: 'rgba(138, 43, 226, 1)',
                borderWidth: 2
            }]
        });

        setChartOptions({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'คะแนนรวมของนักศึกษาทั้งหมดในแต่ละรุ่น',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              }
            }
        });

        setDataLoaded(true);
    }, []);

    useEffect(() => {
        if (!isDataLoaded) { //ถ้ายังไม่มีข้อมูลให้ทำการเรียกใช้ initializeChartData
            initializeChartData();
        }
    }, [initializeChartData, isDataLoaded]); //เมื่อมีการเปลี่ยนแปลงข้อมูลให้ทำการเรียกใช้ initializeChartData

    return (
        <div className=' h-60'>
            {/* ถ้ามีข้อมูลให้แสดง Bar แต่ถ้ายังไม่มีข้อมูลให้แสดง null */}
            {isDataLoaded && <Bar data={chartData} options={chartOptions} />} 
        </div>
    );
});

export default BarChart;
