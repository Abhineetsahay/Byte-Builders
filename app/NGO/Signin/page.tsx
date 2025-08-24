"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  organizationName: string;
  email: string;
  state: string;
  city: string;
  password: string;
  confirmPassword: string;
  description: string;
}

export default function Page() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity("");
    setValue("state", state);
    setValue("city", "");
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setValue("city", city);
  };

  const validateState = () => {
    return selectedState ? true : "Please select a state";
  };

  const validateCity = () => {
    return selectedCity ? true : "Please select a city";
  };

  const availableCities = selectedState
    ? citiesByState[selectedState] || []
    : [];

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data);
      const ap = await axios.post("/api/org/signin",data);
      console.log(ap.data());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                {...register("organizationName", {
                  required: "Organization name is required",
                  minLength: {
                    value: 2,
                    message: "Organization name must be at least 2 characters",
                  },
                })}
                type="text"
                placeholder="Name of the Organization"
                className="h-12 text-gray-600 placeholder:text-gray-400"
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm">
                  {errors.organizationName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email of the Organization"
                className="h-12 text-gray-600 placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
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
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
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
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="h-12 text-gray-600 placeholder:text-gray-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value: string) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="h-12 text-gray-600 placeholder:text-gray-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                placeholder="Description of the Organization"
                className="h-24 text-gray-600 placeholder:text-gray-400 resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
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
              type="button"
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
        </form>
      </Card>
    </div>
  );
}
