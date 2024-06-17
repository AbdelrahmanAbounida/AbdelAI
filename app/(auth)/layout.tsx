import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F9FAFB] h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
