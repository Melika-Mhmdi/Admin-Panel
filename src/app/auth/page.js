"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getToken } from "../actions/getToken";
import { useEffect, useState } from "react";
import useEnterToNeshan from "../hooks/useEnterToNeshan";
import Loading from "../components/Loading/Loading";

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const {getToken}= useEnterToNeshan()

  useEffect(() => {
    getToken(code)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return <Loading/>;
}
