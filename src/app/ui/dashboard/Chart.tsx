// Chart.tsx
// @ts-nocheck
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartComponent = () => {
    const chartData = {
        labels: ['0', '0.2', '0.4', '0.6', '0.8', '1.0'],
        datasets: [
            {
                label: 'Your Result (Normal)',
                data: [
                    { x: 0, y: 100 },
                    { x: 0.1, y: 110 },
                    { x: 0.3, y: 125 },
                    { x: 0.5, y: 120 },
                    { x: 0.7, y: 105 },
                    { x: 1.0, y: 90 },
                ],
                borderColor: '#FF7BAC',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                fill: {
                    target: "origin",
                    above: "rgba(255, 0, 0, 0.3)"
                }
            },
            {
                label: 'Pre-Diabetic',
                data: [
                    { x: 0, y: 130 },
                    { x: 0.2, y: 150 },
                    { x: 0.4, y: 160 },
                    { x: 0.6, y: 140 },
                    { x: 0.8, y: 120 },
                    { x: 1.0, y: 110 },
                ],
                borderColor: '#6598FA',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                fill: {
                    target: "origin",
                    above: "rgba(0,123,255,0.3)"
                }
            },
            {
                label: 'Diabetic',
                data: [
                    { x: 0, y: 180 },
                    { x: 0.2, y: 200 },
                    { x: 0.4, y: 210 },
                    { x: 0.6, y: 190 },
                    { x: 0.8, y: 170 },
                    { x: 1.0, y: 160 },
                ],
                borderColor: '#034BD7',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                fill: {
                    target: "origin", // Set the fill options
                    above: "rgba(0,51,255,0.3)"
                }
            },
        ],
    };

    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    stepSize: 50,
                    max: 400,
                },
                title: {
                    display: true,
                    text: 'mg/dl',
                },
            },
            x: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    stepSize: 0.2,
                    max: 1,
                },
                title: {
                    display: true,
                    text: 'Hours after meal',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'black',
                },
            },
            filler: {
                propagate: false
            }
        },
    };


    return (
        <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg">
            <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-semibold">Latest Results</p>
            </div>
            <p className="text-xl font-semibold">Blood sugar</p>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
