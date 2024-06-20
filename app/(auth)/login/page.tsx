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
import { LoginSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth/login";

const Login = () => {
  const [loginLoading, setloginLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setloginLoading(true);
      const resp = await loginUser({ ...values });
      if (resp.error) {
        toast.error(resp?.details);
      } else {
        toast.success("User Logedin successfully");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setloginLoading(false);
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
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
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

          {loginLoading ? (
            <Button
              className="bg-indigo-400 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              disabled
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
          )}
        </form>
      </Form>
      <p className="mt-7 text-center text-sm text-gray-500 pb-7">
        Not a member?
        <a
          href="/register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline"
        >
          Create account
        </a>
      </p>
    </div>
  );
};

export default Login;
