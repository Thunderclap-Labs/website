'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Progress } from '@heroui/react';

const FundingChartSection = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null); // To hold the chart instance for cleanup

  // Funding variables
  const targetAmount = 8000;
  const raisedAmount = 1000;
  const fundingPercentage = Math.round((raisedAmount / targetAmount) * 100);

  // Simple number formatter to avoid hydration issues
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#d4d4d4', // text-neutral-300
                  font: {
                    size: 12, // smaller font for mobile
                  },
                  boxWidth: 15,
                  padding: 10, // less padding for mobile
                },
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
    <section id="funding-section" className="text-neutral-100">
      <div className="container max-w-2xl md:max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:pb-16">
          {/* Chart Column */}
          <div
            className="w-full flex flex-col items-center justify-center md:mb-0 md:col-span-4"
            style={{
              minHeight: 320,
              height: 'auto',
              maxHeight: 'none',
            }}
            data-aos="fade-right"
          >
          {/* Pie chart */}
            <div className="relative w-full">
              <canvas
                ref={chartRef}
                width={500}
                className="block bg-transparent"
              ></canvas>
            </div>
          </div>
          {/* Milestones Column */}
          <div className="w-full px-4 md:px-8 mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-blue-400" data-aos="fade-up">
              Seeking Strategic Investors
            </h3>
            <div className="text-base md:text-lg text-neutral-400 mb-4" data-aos="fade-up" data-aos-delay="100">
              We are seeking strategic investors to help us scale
              operations, finalize critical R&D, and bring these transformative
              solutions to the global market.
            </div>
            <p className="text-base md:text-lg text-neutral-400 mb-6" data-aos="fade-up" data-aos-delay="200">
              With funding, we will achieve these critical milestones within 4-6 months:
            </p>
            <ul className="space-y-4 text-neutral-200">
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">Fully Operational System:</strong> Complete and launch our proprietary fuel manufacturing system.</span>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="400">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">Successful Test Flights:</strong> Conduct rigorous test flights to validate performance and safety.</span>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="500">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span><strong className="font-semibold">First Commercial Deployment:</strong> Secure and execute our first pilot program with a key partner.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Funding Progress Section */}
        <div className="pt-8 border-t border-neutral-700 px-4" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-white text-center">
            Funding Progress
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between gap-2 items-center mb-4">
              <span className="text-lg font-semibold text-neutral-300">€{formatNumber(raisedAmount)} Raised - <span className="text-sm text-neutral-600">By Lithuanian Armed Forces & European Union (EUDIS)</span></span>
              <span className="text-lg text-nowrap font-semibold text-blue-400">Target: €{formatNumber(targetAmount)}</span>
            </div>
            <Progress
              size="lg"
              value={fundingPercentage}
              maxValue={100}
              color="primary"
              className="mb-4"
              classNames={{
                base: "max-w-full",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-blue-500 to-blue-600",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
            />
            <div className="flex justify-between items-center text-sm text-neutral-400">
              <span>Currently Building: Rocket Fuel Automation</span>
              <span>{fundingPercentage}% funded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingChartSection;