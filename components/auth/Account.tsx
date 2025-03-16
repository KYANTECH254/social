"use client";
import Link from "next/link";
import GoogleIcon from "../Icons/GoogleIcon";
import { useState } from "react";
import ErrorComponent from "./Error";
import SpinLoader from "../SpinLoader";

export default function GoogleSignIn() {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function googleRedirect() {
    setIsLoading(true);
    const CALLBACKURL = process.env.NEXT_PUBLIC_CALLBACKURL;
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

    if (!CALLBACKURL || !CLIENT_ID) {
      setIsLoading(false);
      setError("An error occured on our side, please try again later");
      return;
    }

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${CALLBACKURL}&response_type=code&scope=email profile`;
    window.location.href = GOOGLE_AUTH_URL;
  }

  if (error) {
    return (
      <ErrorComponent error={error} />
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="max-w-md w-full space-y-8 text-center px-4">
        <div className="flex justify-center">
          <h1 className="text-4xl font-extrabold text-blue-500 tracking-tight">
            MyLogo
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Sign in with your Google account to continue to our service.
        </p>

        <button
          onClick={googleRedirect}
          className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {isloading ? (<SpinLoader type="loader" color="white" />) : (<GoogleIcon />)}

          </span>
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-gray-500">
          By continuing, you agree to our
          <Link href="/terms" className="text-blue-400 font-semibold ml-1 mr-1">
            Terms of Service
          </Link>
          and
          <Link href="/privacy-policy" className="text-blue-400 font-semibold ml-1 mr-1">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
