"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { signInAction } from "@/app/(signin)/signin/actions";
import { toast } from "../ui/use-toast";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "password" },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    signInAction(data)
      .then((data) => {
        console.log("good?: ", data);
        router.push("/");
      })
      .catch((error) => {
        console.log("error: ", error);
        toast({
          variant: "destructive",
          title: "Auth Error",
        });
      })
      .finally(() => {});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
