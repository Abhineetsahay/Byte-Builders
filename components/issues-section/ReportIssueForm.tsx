"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Upload, FileText, AlertCircle } from "lucide-react"
import { LocationMap } from "../LocationMap"

interface ReportIssueFormProps {
  onSubmit?: (data: IssueFormData) => void
}
interface IssueFormData {
  title: string
  description: string
  media: File[]
  location: string
  coordinates?: { lat: number; lng: number }
}
export function ReportIssueForm({ onSubmit }: ReportIssueFormProps) {
  const [formData, setFormData] = useState<IssueFormData>({
    title: "",
    description: "",
    media: [],
    location: "",
  })
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof IssueFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    const newFiles = Array.from(files)
    if (formData.media.length + newFiles.length > 5) {
      alert("Maximum 5 files allowed")
      return
    }
    
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...newFiles]
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    console.log("Issue reported:", formData)
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            Report an Issue
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Details Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="issueTitle" className="text-base font-semibold">
                  Issue Title
                </Label>
                <Input
                  id="issueTitle"
                  placeholder="Issue Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issueDescription" className="text-base font-semibold">
                  Describe the issue in detail
                </Label>
                <Textarea
                  id="issueDescription"
                  placeholder="Describe the issue in detail"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-32 text-base resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Upload Media</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? "border-blue-400 bg-blue-50" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop or browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Upload images or videos related to the issue. Max 5 files.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Browse Files
                  </Button>
                </label>
              </div>

              {formData.media.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.media.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Section */}
            <div className="space-y-4">               
                  <LocationMap/>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className ="px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700"
                disabled={!formData.title || !formData.description}
              >
                Submit Issue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
