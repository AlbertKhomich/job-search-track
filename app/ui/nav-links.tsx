"use client";

import { NavbarLink } from "flowbite-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Report", href: "/" },
  { name: "Add", href: "/action/create" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}
