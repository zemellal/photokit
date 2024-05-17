// import { PrismaClient } from "@prisma/client";
// export const runtime = "edge";

import { Button } from "@/components/ui/button";

// import { handler } from "@/prisma/handler";

// const prisma = new PrismaClient();

export default function Home() {
  // const lenses = await prisma.lenses.findMany({
  //   orderBy: [{ mount_id: "asc" }, { min_fl: "asc" }],
  // });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <section className="">
        <h1>Home Page</h1>
        <Button>Primary Button</Button>
      </section>
    </main>
  );
}
