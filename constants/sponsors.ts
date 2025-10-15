import { StaticImageData } from "next/image";

import ltarmedforces from "@/components/images/ltarmedforces.png";
import ktustartupspace from "@/components/images/ktustartupspace.png";
import jlcpcb from "@/components/images/jlc.png";
import makerspace from "@/components/images/makerspace.png";

export interface Sponsor {
  name: string;
  image: StaticImageData;
  delay?: number;
}

export const sponsors: Sponsor[] = [
  {
    name: "KTU Startup Space",
    image: ktustartupspace,
    delay: 1200,
  },
  {
    name: "LT Armed Forces",
    image: ltarmedforces,
    delay: 1400,
  },
  {
    name: "Kaunas Makerspace",
    image: makerspace,
    delay: 1200,
  },
  {
    name: "JLCPCB",
    image: jlcpcb,
    delay: 1000,
  },
];
