import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SatelliteInfoOverlayProps {
  isVisible: boolean;
  title: string;
  subtitle: string;
  icon?: IconDefinition;
  corner?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export const SatelliteInfoOverlay: React.FC<SatelliteInfoOverlayProps> = ({
  isVisible,
  title,
  subtitle,
  icon = faShareNodes,
  corner = "bottom-left",
}) => {
  const cornerStyles = {
    "bottom-left": {
      position: "absolute bottom-1/4 left-0 w-full h-auto z-10",
      textPosition: "absolute left-[130px] top-0 -translate-x-1/2",
      svgTransform: "",
      svgPath: "M0 1H260 C320 1, 320 80, 420 100",
    },
    "bottom-right": {
      position: "absolute bottom-1/4 right-0 w-full h-auto z-10",
      textPosition: "absolute right-[130px] top-0 translate-x-1/2",
      svgTransform: "scale-x-[-1]",
      svgPath: "M0 1H260 C320 1, 320 80, 420 100",
    },
    "top-left": {
      position: "absolute top-1/4 left-0 w-full h-auto z-10",
      textPosition: "absolute left-[130px] bottom-0 -translate-x-1/2",
      svgTransform: "scale-y-[-1] translate-y-[-100%]",
      svgPath: "M0 1H260 C320 1, 320 80, 420 100",
    },
    "top-right": {
      position: "absolute top-1/4 right-0 w-full h-auto z-10",
      textPosition: "absolute right-[130px] bottom-0 translate-x-1/2",
      svgTransform: "scale-x-[-1] scale-y-[-1] translate-y-[-100%]",
      svgPath: "M0 1H260 C320 1, 320 80, 420 100",
    },
  };

  const styles = cornerStyles[corner];

  return (
    <div
      className={`pointer-events-none transition-opacity duration-1000 ${
        styles.position
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative w-full h-40">
        <svg
          className={`absolute top-1/2 left-0 w-full h-[101px] ${styles.svgTransform}`}
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="line-fade-gradient"
              x1="0"
              x2="1"
              y1="0.5"
              y2="0.5"
            >
              <stop offset="0%" stopColor="#404040" />
              <stop offset="50%" stopColor="#404040" />
              <stop offset="100%" stopColor="#404040" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={styles.svgPath}
            stroke="url(#line-fade-gradient)"
            strokeWidth="1"
          />
        </svg>

        <div className={`${styles.textPosition} pointer-events-auto`}>
          <div className="relative flex flex-col items-center">
            <div className="text-center">
              <p className="text-lg text-white">
                <span className="text-white mr-2">•</span>
                {title}
              </p>
              <p className="text-sm text-neutral-400">{subtitle}</p>
            </div>
            <div
              className={`absolute mt-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border border-neutral-600 ${
                corner.includes("top") ? "bottom-14" : "top-full"
              }`}
            >
              <FontAwesomeIcon className="text-white text-xl" icon={icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
