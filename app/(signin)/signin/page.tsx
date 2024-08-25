import { SignInForm } from "@/components/form/form-signin";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Camera } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="grid place-content-center min-h-screen">
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-row items-center gap-x-2 justify-center">
          <div className="group flex w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:size-10 md:text-base">
            <Camera className="w-5 transition-all group-hover:scale-110" />
          </div>

          <h1 className="text-2xl  tracking-tight">Photokit</h1>
        </div>
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
      </div>
    </main>
  );
}
