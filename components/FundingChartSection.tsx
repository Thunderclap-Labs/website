'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCogs, faFlask, faRobot, faRecycle, faCloudRain, faShieldAlt, faEye, faSeedling, faTint, faSmog, faBullseye, faBolt, faBatteryHalf, faRocket, faSatelliteDish, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

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
          'Scale-Up Silver Iodide Payload Integration (10%)',
          'Operational Infrastructure (10%)',
          'Pilot Programs & Market Development (5%)',
          'Unallocated (5%)'
        ],
        data: [50, 20, 10, 10, 5, 5],
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
    <section id="funding-section" className="py-20 text-neutral-100 relative overflow-hidden">
      {/* Star background, behind content */}
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Add chart title as h3 above the grid */}
        <h3 className="text-3xl font-bold mb-10 tracking-tight text-white text-center pb-8">
          Funding Ask: <span className="text-blue-400">8000 EUR</span> - Allocation Breakdown
        </h3>
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Chart Column */}
          <div
            className="md:col-span-3 w-full h-[400px] md:h-[500px] bg-transparent relative z-10 flex items-center justify-center"
            data-aos="fade-right"
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <canvas
                ref={chartRef}
                className="!bg-transparent relative z-10"
                style={{ background: "transparent" }}
                width={500}
                height={500}
              ></canvas>
            </div>
          </div>
          {/* Milestones Column */}
          <div className="md:col-span-2" data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-3xl font-bold mb-6 tracking-tight text-blue-400 text-left">
              Expected Milestones
            </h3>
            <p className="text-lg text-neutral-400 mb-6 text-left">
              With funding, we will achieve these critical milestones within 4-6 months:
            </p>
            <ul className="space-y-4 text-neutral-200 text-left pl-0">
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong className="font-semibold">Fully Operational System:</strong> Complete and launch our proprietary fuel manufacturing system.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong className="font-semibold">Successful Test Flights:</strong> Conduct rigorous test flights to validate performance and safety.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong className="font-semibold">First Commercial Deployment:</strong> Secure and execute our first pilot program with a key partner.
                </span>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="flex gap-4 justify-center" data-aos="fade-up">
                      <Button
                        as={Link}
                        className="mt-4 bg-secondary/5 text-secondary hover:bg-secondary/10 border-gray-800 shadow-xl"
                        href="mailto:thunderclaplabs@gmail.com"
                        target="_blank"
                        variant="bordered"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Contact Us
                      </Button>
                      <Button
                        as={Link}
                        className="mt-4 bg-secondary/50 text-white border-gray-800 shadow-xl"
                        href="/team"
                        variant="bordered"
                      >
                        Our Team
                      </Button>
                    </div>
      </div>
    </section>
  );
};

export default FundingChartSection;