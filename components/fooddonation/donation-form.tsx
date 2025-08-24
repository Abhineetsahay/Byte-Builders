"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, X, MapPin, Camera, Heart } from "lucide-react"

interface DonationFormProps {
  onSuccess?: () => void
}

export function DonationForm({ onSuccess }: DonationFormProps) {
  const [selectedFoodType, setSelectedFoodType] = useState<string>("")
  
  const foodTypes = [
    "Cooked Food",
    "Raw Vegetables",
    "Fruits",
    "Grains & Cereals",
    "Dairy Products",
    "Packaged Food",
    "Beverages",
    "Other",
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-sans text-2xl flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Donate Food
        </CardTitle>
        <p className="text-muted-foreground">Help feed those in need by donating surplus food</p>
        <Badge variant="secondary" className="w-fit">
          Earn 50 Impact Points on successful collection
        </Badge>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Food Type */}
          <div className="space-y-2">
            <Label htmlFor="foodType">Food Type *</Label>
            <Select value={selectedFoodType} onValueChange={setSelectedFoodType}>
              <SelectTrigger>
                <SelectValue placeholder="Select food type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]" position="popper" side="bottom" align="start">
                {foodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="text"
              placeholder="e.g., 10 kg, 50 servings, 20 packets"
              className="w-full"
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label>Expiry Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Select expiry date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[9999]">
                <Calendar
                  mode="single"
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Pickup Address */}
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="pickupAddress"
                placeholder="Enter complete pickup address with landmarks"
                className="pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Additional details about the food (optional)"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload photos (0/5)</p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
          >
            Post Donation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
