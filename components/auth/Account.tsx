"use client"

import Link from "next/link";
import GoogleIcon from "../Icons/GoogleIcon";

export default function GoogleSignIn() {

  function googleRedirect() {
    const CALLBACKURL = process.env.NEXT_PUBLIC_CALLBACKURL;
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

    if (!CALLBACKURL || !CLIENT_ID) {
      console.error("Missing Google OAuth environment variables");
      return;
    }

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${CALLBACKURL}&response_type=code&scope=email profile`;
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center px-4">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Everything in one place...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in with your Google account to continue to our service and enjoy
          all the features we offer.
        </p>

        <button
          onClick={googleRedirect}
          className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <GoogleIcon />
          </span>
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-gray-500">
          By continuing, you agree to our
          <Link href="/terms">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};
