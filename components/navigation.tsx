import Link from "next/link";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <nav className="flex flex-row gap-x-2 px-4 sm:px-8">
      <Button variant={"link"} asChild>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button variant={"link"} asChild>
        <Link href={"/browse"}>Browse</Link>
      </Button>
    </nav>
  );
}
