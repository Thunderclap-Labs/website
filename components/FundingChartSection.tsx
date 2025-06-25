'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const FundingChartSection = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null); // To hold the chart instance for cleanup

  const fundingData = {
    labels: [
      'Rocket Assembly & Testing (50%)',
      'Complete Fuel Manufacturing System (20%)',
      'Operational Infrastructure (15%)',
      'Scale-Up Silver Iodide Payload Integration (10%)',
      'Pilot Programs & Market Development (5%)'
    ],
    data: [50, 20, 15, 10, 5],
    colors: [
      'rgba(56, 189, 248, 0.8)',   // Sky Blue
      'rgba(59, 130, 246, 0.8)',   // Standard Blue
      'rgba(99, 102, 241, 0.8)',   // Indigo
      'rgba(139, 92, 246, 0.8)',   // Violet
      'rgba(168, 85, 247, 0.8)'    // Purple
    ]
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists to prevent memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

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
                backgroundColor: fundingData.colors,
                borderColor: '#171717',
                borderWidth: 2,
                
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            // START: Added section to create space between chart and legend
            layout: {
              padding: {
                bottom: 30 // This adds 30px of space at the bottom of the chart area
              }
            },
            // END: Added section
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
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <section id="funding-section" className="pt-8 text-neutral-100">
      <div className="container max-w-2xl md:max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Add chart title as h3 above the grid */}
        <h3 className="text-3xl font-bold mb-10 tracking-tight text-white text-center pb-8">
          Funding Ask: <span className="text-blue-400">8000 EUR</span> - Allocation Breakdown
        </h3>
        <div className="pb-4"></div>
        <div className="flex flex-col md:grid md:grid-cols-7 gap-8 md:gap-16 items-center md:pb-16">
          {/* Chart Column */}
          <div
            className="w-full flex flex-col items-center justify-center mb-8 md:mb-0 md:col-span-4"
            style={{
              minHeight: 320,
              height: 'auto',
              maxHeight: 'none',
            }}
            data-aos="fade-right"
          >
            {/* Pie chart */}
            <div className="w-full flex items-center justify-center">
              <canvas
                ref={chartRef}
                width={500}
                height={500}
                style={{
                  width: 'min(95vw, 500px)',
                  height: 'min(95vw, 500px)',
                  maxWidth: '500px',
                  maxHeight: '500px',
                  display: 'block',
                  background: 'transparent',
                }}
              ></canvas>
            </div>
            {/* Spacer for legend */}
            <div style={{ height: 40 }} />
          </div>
          {/* Milestones Column */}
          <div className="w-full md:col-span-3 bg-neutral-800/60 rounded-xl px-4 py-6 md:px-8 md:py-10 mx-auto mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-blue-400">
              Expected Milestones
            </h3>
            <p className="text-base md:text-lg text-neutral-400 mb-6">
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