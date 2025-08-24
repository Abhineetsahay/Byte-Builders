"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianStates, citiesByState } from "@/lib/india-data";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/auth";

export default function Page() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(""); 
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const availableCities = selectedState
    ? citiesByState[selectedState] || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-yellow-200 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-6 pb-6">

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to City Pulse
            </h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Name"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger className="h-12 w-full text-gray-600 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-yellow-200">
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select
              value={selectedCity}
              onValueChange={handleCityChange}
              disabled={!selectedState}
            >
              <SelectTrigger className="h-12 w-full text-gray-600 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                <SelectValue
                  placeholder={
                    selectedState ? "Select City" : "Select State First"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-yellow-200">
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="h-12 text-gray-600 placeholder:text-gray-400 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">Already have an account?</p>
          </div>

          <Link
            href="/Login"
            className="w-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-yellow-200 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 py-3 px-4 rounded-md"
          >
            Signup 
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">Or continue with</p>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 bg-white/80 backdrop-blur-sm border-yellow-200 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
          >
            <div className="flex items-center space-x-2" onClick={() => signIn()}>
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
