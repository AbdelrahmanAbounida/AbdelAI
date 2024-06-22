"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toast } from "sonner";
import { updateUser } from "@/actions/user/update-user";
import { useRouter } from "next/navigation";
import LoadingButton from "../loading-button";
import { useEffect, useState } from "react";
import { usePrismaUser } from "@/hooks/useCurrentPrismaUser";
import { Skeleton } from "@/components/ui/skeleton";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email().optional(),
  bio: z.string().max(160).min(4),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

function ProfileForm() {
  const { user: currentuser } = useCurrentUser();
  const { data: prismaUser, isLoading } = usePrismaUser(currentuser?.email!);

  const [updateLoading, setupdateLoading] = useState(false);
  const router = useRouter();
  const defaultValues: Partial<ProfileFormValues> = {
    bio: prismaUser?.bio!,
    email: currentuser?.email,
    username: prismaUser?.username!,
  };
  const [formValues, setFormValues] =
    useState<Partial<ProfileFormValues>>(defaultValues);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    ...formValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      setupdateLoading(true);
      const res = await updateUser(data);
      if (res?.error) {
        toast.error(res?.details);
      } else {
        toast.success("Profile updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setupdateLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      setFormValues({
        bio: prismaUser?.bio!,
        email: currentuser?.email,
        username: prismaUser?.username!,
      });
    }
  }, [isLoading, prismaUser]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          defaultValue={prismaUser?.username}
          control={form.control}
          name="username"
          disabled={updateLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@abdelai" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} value={currentuser?.email!} disabled />
              </FormControl>
              <FormDescription>
                You can't modify this email manually
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={prismaUser?.bio}
          control={form.control}
          name="bio"
          disabled={updateLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>update your bio</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {updateLoading ? (
          <LoadingButton />
        ) : (
          <Button
            className="bg-violet-700 hover:bg-violet-600 text-white"
            type="submit"
          >
            Update profile
          </Button>
        )}
      </form>
    </Form>
  );
}
export default ProfileForm;

const LoadingSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((item, index) => (
      <div key={index} className="flex flex-col spacy-y-4 gap-1">
        <Skeleton className="w-[90px] h-4" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-3/4 h-5" />
      </div>
    ))}
    <Skeleton className="w-1/4 h-10" />
  </div>
);
