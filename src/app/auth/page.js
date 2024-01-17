"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getToken } from "../actions/getToken";
import { useEffect, useState } from "react";

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    getToken(code)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return <div>loading...</div>;
}
