"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import logo from "@/components/images/logo.png";
import { siteConfig } from "@/config/site";
import { HeartFilledIcon } from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroUINavbar
      className="fixed z-50"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-4" href="/">
            <Image alt="Thunderclap Labs" height={32} src={logo} />
            <p className="font-bold text-inherit">Thunderclap Labs</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/3 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <FontAwesomeIcon
              className="text-default-500 text-lg md:text-xl"
              icon={faGithub}
            />
          </Link>
          <Link isExternal aria-label="YouTube" href={siteConfig.links.youtube}>
            <FontAwesomeIcon
              className="text-default-500 text-lg md:text-xl"
              icon={faYoutube}
            />
          </Link>
          <Link
            isExternal
            aria-label="Instagram"
            href={siteConfig.links.instagram}
          >
            <FontAwesomeIcon
              className="text-default-500 text-lg md:text-xl"
              icon={faInstagram}
            />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-primary-600" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <FontAwesomeIcon
            className="text-default-500 text-lg md:text-xl"
            icon={faGithub}
          />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="overflow-hidden">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "text-xl py-3 px-4 rounded-lg hover:bg-neutral-800 transition-colors block w-full",
                )}
                href={item.href}
                onClick={handleMenuItemClick}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
