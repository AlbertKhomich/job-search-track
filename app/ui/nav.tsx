"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import { usePathname } from "next/navigation";
import { TbReportSearch } from "react-icons/tb";

const links = [
  { name: "Report", href: "/" },
  { name: "Add", href: "/create" },
];

export function NavbarMain() {
  const pathname = usePathname();

  return (
    <Navbar fluid rounded className="w-full mb-8">
      <NavbarBrand as={Link} href="/">
        <TbReportSearch className="w-10 h-10 mr-3" />
        Job Report
      </NavbarBrand>
      <div className="flex md:order-2">
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {links.map((link) => {
          return (
            <NavbarLink
              key={link.name}
              href={link.href}
              active={pathname === link.href ?? true}
            >
              {link.name}
            </NavbarLink>
          );
        })}
      </NavbarCollapse>
    </Navbar>
  );
}
