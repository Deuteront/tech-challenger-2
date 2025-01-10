import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export function ComponentChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 15, 25, 30],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: 'origin',
          },
          {
            label: 'Dataset 2',
            data: [5, 15, 10, 20, 25],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: '-1',
          },
        ],
      },
      options: {
        plugins: {
          filler: {
            propagate: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
}
