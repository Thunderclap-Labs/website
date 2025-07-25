"use client";

import { Link, Accordion, AccordionItem } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faMapMarkerAlt,
  faPhoneAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/button";
import AOS from "aos";

import {
  title as titleStyle,
  subtitle as subtitleStyle,
} from "@/components/primitives";
import "aos/dist/aos.css";
import { useFeaturedCardMouseEffect } from "@/lib/featured-card";
import MovingStars from "@/components/ui/moving-stars";
import { Heading } from "@/components/common/heading";

const contactMethods = [
  {
    icon: faComments,
    title: "Chat with us",
    description: "Speak to our team.",
    link: "mailto:thunderclaplabs@gmail.com",
    linkText: "thunderclaplabs@gmail.com",
  },
  {
    icon: faMapMarkerAlt,
    title: "Visit us",
    description: "Studentų g. 65, Kaunas, Lithuania",
    link: "https://www.google.com/maps/place/Student%C5%B3+g.+65,+Kaunas,+51369+Kauno+m.+sav./@54.9039583,23.9568993,609m/data=!3m2!1e3!4b1!4m6!3m5!1s0x46e7186332d1fd0d:0xf3e05e748e2ef3f3!8m2!3d54.9039583!4d23.9594796!16s%2Fg%2F11bw40l_h6?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D", // Placeholder link
    linkText: "View on Google Maps",
  },
  {
    icon: faPhoneAlt,
    title: "Call us",
    description: "Always open for a chat.",
    link: "tel:+37062480682",
    linkText: "+370 624 80 682",
  },
];

const faqItems = [
  {
    key: "1",
    title: "Are you an official business?",
    content:
      "We are a dedicated team of students, primarily from Kaunas University of Technology in Lithuania. While we are not yet a registered business entity, we are actively seeking initial funding to establish one and transition into a formal organization.",
  },
  {
    key: "2",
    title: "Are you incubated by KTU?",
    content:
      "Yes, we are currently incubated by the Kaunas University of Technology Startup Space, which provides us with workspace, mentorship, and institutional support as we develop our venture.",
  },
  {
    key: "3",
    title: "Are you looking for new team members?",
    content:
      "Yes, we are always looking for passionate and talented individuals to join our team. Our recruitment process is highly selective — we strive to bring in only the most driven and capable people. If you're interested in joining us, please reach out through our social media channels.",
  },
  {
    key: "4",
    title: "Can I visit your office?",
    content:
      "Yes, you can visit our office at Studentų g. 65, Kaunas, Lithuania. However, you should contact us beforehand to ensure someone is available to meet with you.",
  },
  {
    key: "5",
    title:
      "What are the companies and organisations listed on the landing page?",
    content:
      "The companies and organizations featured on our landing page are valued partners, collaborators, and supporters. We work closely with them to deliver innovative solutions and mutual value. If you're interested in exploring a partnership, feel free to reach out through our official channels.",
  },
];

export default function ContactPage() {
  const cardGridRef = useRef<HTMLDivElement>(null);

  useFeaturedCardMouseEffect();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background bg-radial-gradient-layers text-foreground">
      <MovingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Heading
          subtitle="Let us know how we can help."
          title="Contact our team"
        />

        <div
          ref={cardGridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24"
          id="contact-card-grid"
        >
          {contactMethods.map((method, index) => (
            <div
              key={method.title}
              className="bg-secondary/5 rounded-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-black/5 border border-gray-800 featured-card backdrop-blur-sm shadow-xl rounded-lg overflow-hidden">
                <div className="text-left p-6">
                  <div className="flex items-center justify-center w-fit p-3 border-gray-800 bg-secondary/5 border mb-4 shadow-xl rounded-lg">
                    <FontAwesomeIcon
                      className="h-6 w-6 mx-auto text-secondary"
                      icon={method.icon}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    {method.description}
                  </p>
                  <Link
                    isExternal
                    className="text-secondary font-medium text-sm hover:underline"
                    href={method.link}
                  >
                    {method.linkText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className={titleStyle({ class: "text-3xl sm:text-4xl" })}>
              Frequently asked questions
            </h2>
          </div>
          <div data-aos="fade-up">
            <Accordion
              className="text-foreground bg-secondary/5 backdrop-blur-sm shadow-xl"
              selectionMode="multiple"
              variant="bordered"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  className=""
                  title={<span className="text-foreground">{item.title}</span>}
                >
                  <span className="text-sm text-foreground">
                    {item.content}
                  </span>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex flex-col text-center mb-12" data-aos="fade-up">
          <h2 className={titleStyle({ class: "text-3xl sm:text-4xl mb-4" })}>
            Ready to reach the stars together?
          </h2>
          <p
            className={subtitleStyle({
              class: "max-w-2xl mx-auto text-lg sm:text-xl",
            })}
            data-aos-delay="100"
          >
            We’d love to hear from you!
          </p>
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
      </div>
    </div>
  );
}
