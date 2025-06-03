"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

const DEV_ONLY_EMAIL = "sellers@paddle.com";
const DEV_ONLY_CODE = "000000";

export default function PaddleDevLoginPage() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_ENABLE_PADDLE_OVERRIDE !== "true"
    ) {
      console.warn("❌ Paddle override is disabled in production.");
      router.replace("/sign-in");
      return;
    }

    const login = async () => {
      if (!isLoaded) return;

      try {
        await signIn.create({
          identifier: DEV_ONLY_EMAIL,
          strategy: "email_code",
        });

        await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: DEV_ONLY_CODE,
        });

        router.push("/u/PDL001");
      } catch (err) {
        console.error("Dev login failed:", err);
      }
    };

    login();
  }, [isLoaded, signIn, router]);

  return (
    <main className="p-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        🔐 Logging in Paddle test user...
      </p>
    </main>
  );
}
