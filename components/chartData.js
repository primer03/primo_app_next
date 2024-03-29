'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

// Dynamically import the Bar component with SSR disabled
const Bar = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Bar),
  { ssr: false }
);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = React.memo((props) => {

  const [chartData, setChartData] = useState({
    datasets: [{
      labels: Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`),
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: 'rgba(138, 43, 226, 0.7)',
        borderColor: 'rgba(138, 43, 226, 1)',
        borderWidth: 2
      }]
    }]
  });
  const [chartOptions, setChartOptions] = useState({});
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [scoreData, setScoreData] = useState([]);
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!calledOnce.current) {
      // console.log(props.scoreData)
      setScoreData(props.scoreData)
      calledOnce.current = true;
    }

    if (scoreData.length > 0 && !isDataLoaded) {
      let sortScoreID = scoreData.sort((a, b) => a.id - b.id);
      setChartData({
        labels: Array.from({ length: 27 }, (_, i) => `รุ่น ${i + 1}`),
        datasets: [{
          label: '# of Votes',
          data: sortScoreID.map((score) => score.score),
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
    }
  }, [scoreData]); // Depend only on scoreData

  return (
    <div className=' h-60'>
      {isDataLoaded && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
});

export default BarChart;
