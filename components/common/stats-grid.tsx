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
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-neutral-100 ${className}`}>
      {stats.map((stat, index) => (
        <div
            key={stat.title} 
            className="featured-card white-feature bg-neutral-600 rounded-lg bg-opacity-55 p-[1px]">
            <div
            className="flex flex-col items-center justify-center p-6 rounded-lg h-full bg-black bg-opacity-90"
            data-aos="fade-up"
            data-aos-delay={stat.delay || (index + 1) * 100}
            >
            <span className="text-6xl font-bold text-primary-500">{stat.value}</span>
            <h3 className="mt-2 text-xl font-semibold">{stat.title}</h3>
            <p className="text-neutral-400 mt-1">{stat.description}</p>
            </div>
        </div>
      ))}
    </div>
  );
};
