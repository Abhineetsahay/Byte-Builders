"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-yellow-200 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-6 pb-6">
          <div className="flex items-center space-x-2">
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to City Pulse
            </h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">Don't have an account?</p>
          </div>

          <Link
            href="/Signin"
            className="w-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-yellow-200 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 py-3 px-4 rounded-md"
          >
            Signin
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">Or continue with</p>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 bg-white/80 backdrop-blur-sm border-yellow-200 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
          >
            <div
              className="flex items-center space-x-2"
              onClick={() => signIn("google")}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                G
              </div>
              <span>Continue with Google</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
