"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return token ? <div>{children}</div> : <div>loading...</div>;
}
