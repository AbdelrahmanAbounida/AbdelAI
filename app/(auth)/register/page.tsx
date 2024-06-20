"use client";
import Logo from "@/components/logo";
import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "@/actions/auth/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SocialButtons from "../_components/social-buttons";

const Register = () => {
  const [registerLoading, setregisterLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setregisterLoading(true);
      const resp = await registerUser({ ...values });
      if (resp.error) {
        toast.error(resp?.details);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setregisterLoading(false);
    }
  };
  return (
    <div className="flex bg-white rounded-[20px] flex-1 max-w-lg p-4  flex-col justify-center  lg:px-8  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-5">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create new account
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {registerLoading ? (
            <Button
              className="bg-indigo-400 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              disabled
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              // onClick={handleRegister}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Button>
          )}
        </form>
      </Form>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>

      <SocialButtons />

      <p className="mt-7 text-center text-sm text-gray-500 pb-7">
        Already a member?{" "}
        <a
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
