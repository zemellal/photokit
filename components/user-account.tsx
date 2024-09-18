import { getProfileDTO } from "@/data/user-dto";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { ProfileForm } from "./form/form-profile";
import { getAccounts } from "@/data/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export async function ProfileCard() {
  const profile = await getProfileDTO();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Edit your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm email={profile.email} name={profile.name} />
      </CardContent>
    </Card>
  );
}

export async function AccountsCard() {
  const accounts = await getAccounts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>Linked accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.provider}</TableCell>
                <TableCell>{account.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
