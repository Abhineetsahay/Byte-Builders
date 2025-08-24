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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-6 pb-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 transform rotate-45"></div>
            <span className="text-xl font-semibold text-gray-800">Name</span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to Mo Sahara
            </h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Name"
              className="h-12 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="h-12 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger className="h-12 w-full text-gray-600">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white">
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
              <SelectTrigger className="h-12 w-full text-gray-600">
                <SelectValue
                  placeholder={
                    selectedState ? "Select City" : "Select State First"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
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
              className="h-12 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="h-12 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">Already have an account?</p>
          </div>

          <Link
            href="/Login"
            className="w-full flex items-center justify-center bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Login 
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">Or continue with</p>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
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
