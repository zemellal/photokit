import { auth } from "@/auth";
import { findUserByID } from "@/lib/queries/users";

export default async function AccountPage() {
  const session = await auth();

  if (!session) return null;
  if (!session.user) return null;

  const user = await findUserByID(session.user.id as string);

  return (
    <div className="main-padded main-col-gap">
      <section className="">
        <h1 className="text-xl font-semibold tracking-tight">Account</h1>
      </section>

      <section className="">
        <div>
          <p>Email: {user?.email}</p>
          <p>Name: {user?.name}</p>
          {/* <p>ID: {user?.id}</p> */}
        </div>
      </section>
    </div>
  );
}
