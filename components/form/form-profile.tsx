"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { User } from "@prisma/client";
import { UserProfileSchema } from "@/lib/zod";
import { updateProfileAction } from "@/app/(dashboard)/account/actions";

export function ProfileForm({ email, name }: Pick<User, "email" | "name">) {
  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      email: email || "",
      name: name || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UserProfileSchema>) => {
    try {
      updateProfileAction(data)
        .then(() => {
          toast({
            title: "Your profile was updated",
          });
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Error updating profile",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>Name</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Email cannot be changed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button
            className=""
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
