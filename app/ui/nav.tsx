import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Flowbite, DarkThemeToggle } from "flowbite-react";
import { TbReportSearch } from "react-icons/tb";
import { auth, signOut } from "@/auth";
import NavLinks from "./nav-links";

export default async function NavbarMain() {
  const session = await auth();

  return (
    <Navbar fluid rounded className="w-full mb-8">
      <NavbarBrand as={Link} href="/">
        <TbReportSearch className="w-10 h-10 mr-3" />
        Job Report
      </NavbarBrand>
      <div className="flex md:order-2">
        <Flowbite>
          <DarkThemeToggle className="mr-3" />
        </Flowbite>
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <Button href="/login">Sign In</Button>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLinks />
      </NavbarCollapse>
    </Navbar>
  );
}
