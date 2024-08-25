import { SignInForm } from "@/components/form/form-signin";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="grid place-content-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
        </CardContent>
        {/* <CardFooter>
          <Button className="w-full">Sign in</Button>
        </CardFooter> */}
      </Card>
    </main>
  );
}
