import { PageHeader, PageTitle } from "@/components/headings";
import { ProfileCard, AccountsCard } from "@/components/user-account";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AccountPage() {
  return (
    <div className="main-padded main-col-gap">
      <PageHeader>
        <PageTitle>Account Settings</PageTitle>
      </PageHeader>

      <section className="flex flex-col max-w-lg gap-4">
        <ProfileCard />
        <AccountsCard />

        <div className="flex flex-row w-full pt-8">
          <Button className="" variant={"outline"} asChild>
            <Link href={"/api/auth/signout"}>Sign Out</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
