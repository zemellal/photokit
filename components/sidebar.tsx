import {
  Backpack,
  Camera,
  Compass,
  Home,
  Menu,
  User,
  Vault,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-mode-toggle";
import { NavLink } from "./nav-links";
import { AccountMenu } from "./account-menu";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ReactNode } from "react";

const navs = [
  { id: "home", name: "Home", href: "/", Icon: Home },
  { id: "browse", name: "Browse", href: "/browse", Icon: Compass },
  { id: "mygear", name: "My Gear", href: "/bag", Icon: Vault },
  { id: "kits", name: "Kits", href: "/kits", Icon: Backpack },
];
const accountNavs = [
  { id: "account", name: "Profile", href: "/account", Icon: User },
];

export function Sidebar() {
  return (
    <>
      {/* Mobile view */}
      <header className="fixed top-0 z-20 inset-x-0 flex sm:hidden flex-row items-center py-2 px-4 gap-2 justify-between bg-background">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group flex size-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Camera className="size-5 transition-all group-hover:scale-110" />
            <span className="sr-only">PhotoKit</span>
          </Link>
          <h2>PhotoKit</h2>
        </div>

        <SheetNav
          trigger={
            <Button variant={"secondary"} className="" size={"icon"}>
              <Menu className="size-5" />
            </Button>
          }
        />
      </header>
      {/* Tablet - Desktop view */}
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
              <nav.Icon className="h-5 w-5" />
            </NavLink>
          ))}
        </nav>
        <section className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <AccountMenu />
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
    </>
  );
}

const SheetNav = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <Sheet
    // open={ } onOpenChange={ }
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate the PhotoKit app</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-y-4 pt-8 pb-4">
          {[...navs, ...accountNavs].map((nav) => (
            <Link
              key={nav.id}
              href={nav.href}
              className="flex flex-row items-center gap-x-2"
            >
              <nav.Icon className="h-5 w-5" />
              {nav.name}
            </Link>
          ))}
        </nav>
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
};
