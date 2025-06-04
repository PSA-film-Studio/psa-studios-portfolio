"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle, Loader2, Cloud } from "lucide-react"

interface CloudinaryUploadProps {
  onFileUploaded: (url: string) => void
  resourceType?: "image" | "video"
}

export function CloudinaryUpload({ onFileUploaded, resourceType = "image" }: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
    url?: string
  }>({ type: null, message: "" })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file size (10MB limit for Cloudinary free tier)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setUploadStatus({
        type: "error",
        message: "File size must be less than 10MB",
      })
      return
    }

    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "psa_studios_preset") // We'll create this preset
      formData.append("resource_type", resourceType)

      // Using a demo cloud name - you'll replace this with your own
      const cloudName = "db7yk3uhq" // Replace with your actual cloud name

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.secure_url) {
        setUploadStatus({
          type: "success",
          message: `${resourceType === "image" ? "Image" : "Video"} uploaded successfully! (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
          url: data.secure_url,
        })
      } else {
        throw new Error(data.error?.message || "Upload failed")
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Upload failed",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleUseFile = () => {
    if (uploadStatus.url) {
      onFileUploaded(uploadStatus.url)
      setUploadStatus({ type: null, message: "" })
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Upload className="h-12 w-12 text-blue-500" />
              <Cloud className="h-6 w-6 text-blue-600 absolute -top-1 -right-1" />
            </div>
            <div>
              <p className="text-lg font-medium text-blue-900">Upload to Cloudinary CDN</p>
              <p className="text-sm text-blue-700 mt-1">
                Fast global delivery for {resourceType === "image" ? "images" : "videos"} (max 10MB)
              </p>
              <p className="text-xs text-blue-600 mt-1">⚡ Automatic optimization • 🌍 Global CDN • 📱 Responsive</p>
            </div>
            <input
              type="file"
              accept={resourceType === "image" ? "image/*" : "video/*"}
              onChange={handleUpload}
              className="hidden"
              id="cloudinary-upload"
              disabled={isUploading}
            />
            <Button
              asChild
              variant="outline"
              disabled={isUploading}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <label htmlFor="cloudinary-upload" className="cursor-pointer">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading to CDN...
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4 mr-2" />
                    Select {resourceType === "image" ? "Image" : "Video"}
                  </>
                )}
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Status */}
      {uploadStatus.type && (
        <Card
          className={`${uploadStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {uploadStatus.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${uploadStatus.type === "success" ? "text-green-800" : "text-red-800"}`}>
                  {uploadStatus.message}
                </p>
                {uploadStatus.url && (
                  <p className="text-sm text-green-700 mt-1 font-mono truncate">CDN URL: {uploadStatus.url}</p>
                )}
              </div>
            </div>
            {uploadStatus.type === "success" && uploadStatus.url && (
              <div className="mt-3 flex space-x-2">
                <Button onClick={handleUseFile} size="sm" className="bg-green-600 hover:bg-green-700">
                  Use This CDN File
                </Button>
                <Button onClick={() => setUploadStatus({ type: null, message: "" })} variant="outline" size="sm">
                  Upload Different
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
