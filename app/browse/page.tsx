import { handler } from "@/lib/handler";
import { DataTable } from "../../components/ui/data-table";
import { columnsLenses } from "./columns";

export default async function BrowsePage() {
  const { lenses } = await handler();
  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-8">
      <section>
        <DataTable columns={columnsLenses} data={lenses} />
      </section>
    </main>
  );
}
