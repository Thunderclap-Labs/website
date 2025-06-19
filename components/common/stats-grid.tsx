interface StatItem {
  value: string;
  title: string;
  description: string;
  delay?: number;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, className = "" }) => {
  return (
    <>
      {stats.map((stat, index) => (
        <div
            key={stat.title} 
            className="featured-card white-feature bg-neutral-600 rounded-lg bg-opacity-55 p-[1px]"
            data-aos="fade-up"
            data-aos-delay={stat.delay || (index + 1) * 100}>
            <div
            className="flex flex-col items-center justify-center p-6 rounded-lg h-full bg-black bg-opacity-90"
            >
            <span className="text-6xl font-bold text-primary-500">{stat.value}</span>
            <h3 className="mt-2 text-xl font-semibold">{stat.title}</h3>
            <p className="text-neutral-400 mt-1">{stat.description}</p>
            </div>
        </div>
      ))}
    </>
  );
};
