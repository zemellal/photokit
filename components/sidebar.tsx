import { Camera, Compass, Home, Settings, Vault } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-mode-toggle";
import { NavLink } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Camera className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">PhotoKit</span>
        </Link>

        <NavLink label="Home" path="/">
          <Home className="h-5 w-5" />
        </NavLink>

        <NavLink label="Browse Products" path="/browse">
          <Compass className="h-5 w-5" />
        </NavLink>

        <NavLink label="My Gear" path="/bag">
          <Vault className="h-5 w-5" />
        </NavLink>
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
