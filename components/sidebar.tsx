import { Backpack, Camera, Compass, Home, Vault } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-mode-toggle";
import { NavLink } from "./nav-links";

const navs = [
  { id: "home", name: "Home", href: "/", icon: Home },
  { id: "browse", name: "Browse", href: "/browse", icon: Compass },
  { id: "mygear", name: "My Gear", href: "/bag", icon: Vault },
  { id: "kits", name: "Kits", href: "/kits", icon: Backpack },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Camera className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">PhotoKit</span>
        </Link>

        {navs.map((nav) => (
          <NavLink key={nav.id} label={nav.name} path={nav.href}>
            <nav.icon className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>
      <section className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <ModeToggle />
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip> */}
      </section>
    </aside>
  );
}
