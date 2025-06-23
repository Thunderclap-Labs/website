'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const FundingChartSection = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null); // To hold the chart instance for cleanup

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists to prevent memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const fundingData = {
        labels: [
          'Rocket Assembly & Testing (50%)',
          'Complete Fuel Manufacturing System (20%)',
          'Operational Infrastructure (15%)',
          'Scale-Up Silver Iodide Payload Integration (10%)',
          'Pilot Programs & Market Development (5%)'
        ],
        data: [50, 20, 15, 10, 5],
      };

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: fundingData.labels,
          datasets: [
            {
              label: 'Funding %',
              data: fundingData.data,
              backgroundColor: [
                'rgba(56, 189, 248, 0.8)',   // Sky Blue
                'rgba(59, 130, 246, 0.8)',   // Standard Blue
                'rgba(99, 102, 241, 0.8)',   // Indigo
                'rgba(139, 92, 246, 0.8)',   // Violet
                'rgba(168, 85, 247, 0.8)',   // Purple
                'rgba(217, 70, 239, 0.8)'    // Fuchsia/Magenta
              ],
              borderColor: '#171717', // bg-neutral-900
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#d4d4d4', // text-neutral-300
                font: {
                  size: 14,
                },
                boxWidth: 15,
                padding: 20
              },
              align: 'start',   // Align text to the start
              maxWidth: 2,    // Maximum width of the legend
            },
            // title: {
            //   display: true,
            //   text: 'Funding Ask: 8000 EUR - Allocation Breakdown',
            //   position: 'top',
            //   color: '#ffffff',
            //   font: {
            //     size: 30,
            //     weight: 'bold',
            //   },
            //   padding: {
            //     bottom: 30
            //   }
            // },
          },
        },
      });
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }}, []); // Empty dependency array ensures this effect runs only once

  return (
    <section id="funding-section" className="pt-8 text-neutral-100">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Add chart title as h3 above the grid */}
        <h3 className="text-3xl font-bold mb-10 tracking-tight text-white text-center pb-8">
          Funding Ask: <span className="text-blue-400">8000 EUR</span> - Allocation Breakdown
        </h3>
        <div className="pb-4"></div>
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Chart Column */}
          <div className="md:col-span-3 w-full h-[400px] md:h-[500px]" data-aos="fade-right">
            <canvas ref={chartRef}></canvas>
          </div>
          {/* Milestones Column */}
          <div className="md:col-span-2 bg-neutral-800/60 rounded-xl px-8 py-10 mx-auto mb-8" data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-3xl font-bold mb-6 tracking-tight text-blue-400">
              Expected Milestones
            </h3>
            <p className="text-lg text-neutral-400 mb-6">
              With funding, we will achieve these critical milestones within 4-6 months:
            </p>
            <ul className="space-y-4 text-neutral-200">
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">Fully Operational System:</strong> Complete and launch our proprietary fuel manufacturing system.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">Successful Test Flights:</strong> Conduct rigorous test flights to validate performance and safety.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">First Commercial Deployment:</strong> Secure and execute our first pilot program with a key partner.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingChartSection;