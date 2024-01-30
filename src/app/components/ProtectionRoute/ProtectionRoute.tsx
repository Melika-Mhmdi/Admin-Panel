"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading/Loading"

export default function ProtectedRoute({ children }: any) {
  let token: any =null;

  if (typeof window !== "undefined") {
     token = localStorage.getItem("token")||null
  }

  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      console.log(token)
      router.push("/login");
    }
    else {router.push("/dashboard/app");}
  }, [token]);

  if (token === null){
    return <Loading/>
  }else {
    return<>{children}</>
  }

}
