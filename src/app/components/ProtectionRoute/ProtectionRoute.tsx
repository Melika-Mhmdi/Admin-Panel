"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: any) {
  let token: any =null;

  if (typeof window !== "undefined") {
     token = localStorage.getItem("token")||null
  }

  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    router.push("/dashboard/app");
  }, [token]);

  return token ? <>{children}</> : <>loading...</>;
}
