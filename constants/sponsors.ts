import { StaticImageData } from "next/image";

import lemona_logo_baltas from "@/components/images/lemona_logo_baltas.png";
import ktustartupspace from "@/components/images/ktustartupspace.png";
import kaunas_in from "@/components/images/kaunasStartups.png";
import inovacijuagentura from "@/components/images/InovacijuAgentura.png";
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
    name: "Lemona",
    image: lemona_logo_baltas,
    delay: 1400,
  },
  {
    name: "Kaunas Makerspace",
    image: makerspace,
    delay: 1200,
  },
  {
    name: "Lithuanian Innovation Agency",
    image: inovacijuagentura,
    delay: 1000,
  },
  {
    name: "JLCPCB",
    image: jlcpcb,
    delay: 1000,
  },
  {
    name: "Kaunas IN Startups",
    image: kaunas_in,
    delay: 1000,
  },
];
