"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DEFAULT_LOGIN_REDIRECTED } from "@/routes";
import { signIn } from "next-auth/react";

const SocialButtons = () => {
  const [loading, setloading] = useState(false);
  const handleSubmit = async (provider: "google" | "github") => {
    try {
      setloading(true);
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECTED,
      });
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  return loading ? (
    <Button className="bg-gray-400 w-full" disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <div className="flex items-center justify-between gap-3">
      <Button
        onClick={() => handleSubmit("google")}
        variant={"outline"}
        className="hover:bg-gray-50 flex-1  text-md"
      >
        <FcGoogle className="mr-2  w-5 h-5 " />
        Google
      </Button>

      <Button
        onClick={() => handleSubmit("github")}
        variant={"outline"}
        className="hover:bg-gray-50 flex-1 text-md"
      >
        <FaGithub className="mr-2  w-5 h-5" />
        Github
      </Button>
    </div>
  );
};

export default SocialButtons;
