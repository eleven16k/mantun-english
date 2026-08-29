"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Root redirects to /chat (Gizmo's home). */
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/chat");
  }, [router]);
  return null;
}
