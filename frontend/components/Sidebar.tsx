"use client"

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBook,
  IconHome,
  IconSearch,
  IconSettings
} from "@tabler/icons-react";
import { useState } from "react";
import { ModeToggle } from "./ThemeToggle";

export default function SidebarComp() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Discover",
      href: "#",
      icon: (
        <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Library",
      href: "#",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <>
            hi
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <ModeToggle/>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
