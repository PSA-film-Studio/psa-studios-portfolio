"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, CheckCircle, AlertCircle, Loader2, Cloud, Settings, ExternalLink } from "lucide-react"

interface CloudinaryUploadProps {
  onFileUploaded: (url: string) => void
  resourceType?: "image" | "video"
}

export function CloudinaryUpload({ onFileUploaded, resourceType = "image" }: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [cloudName, setCloudName] = useState("")
  const [uploadPreset, setUploadPreset] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
    url?: string
  }>({ type: null, message: "" })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Check if settings are configured
    if (!cloudName.trim() || !uploadPreset.trim()) {
      setUploadStatus({
        type: "error",
        message: "Please configure your Cloudinary settings first (Cloud Name and Upload Preset)",
      })
      setShowSettings(true)
      return
    }

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
      formData.append("upload_preset", uploadPreset.trim())
      formData.append("resource_type", resourceType)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName.trim()}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.secure_url) {
        setUploadStatus({
          type: "success",
          message: `${resourceType === "image" ? "Image" : "Video"} uploaded successfully to Cloudinary CDN! (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
          url: data.secure_url,
        })
        onFileUploaded(data.secure_url)
      } else {
        throw new Error(data.error?.message || "Upload failed")
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Upload failed. Please check your Cloudinary settings.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Settings Section */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Cloudinary Configuration</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-blue-600 hover:bg-blue-100"
            >
              {showSettings ? "Hide" : "Setup"}
            </Button>
          </div>

          {showSettings && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Cloud Name *</label>
                <Input
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="your-cloud-name"
                  className="bg-white border-blue-200"
                />
                <p className="text-xs text-blue-600 mt-1">
                  Find this in your Cloudinary Dashboard → Settings → Account
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Upload Preset *</label>
                <Input
                  value={uploadPreset}
                  onChange={(e) => setUploadPreset(e.target.value)}
                  placeholder="your-upload-preset"
                  className="bg-white border-blue-200"
                />
                <p className="text-xs text-blue-600 mt-1">
                  Create this in Settings → Upload → Upload presets (set to "Unsigned")
                </p>
              </div>
              <Button
                onClick={() => window.open("https://cloudinary.com/console", "_blank")}
                variant="outline"
                size="sm"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Open Cloudinary Console
              </Button>
            </div>
          )}

          {!showSettings && (cloudName || uploadPreset) && (
            <div className="text-sm text-blue-700">
              <p>Cloud: {cloudName || "Not set"}</p>
              <p>Preset: {uploadPreset || "Not set"}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Section */}
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
              disabled={isUploading || !cloudName.trim() || !uploadPreset.trim()}
            />
            <Button
              asChild
              variant="outline"
              disabled={isUploading || !cloudName.trim() || !uploadPreset.trim()}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <label htmlFor="cloudinary-upload" className="cursor-pointer">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading to CDN...
                  </>
                ) : !cloudName.trim() || !uploadPreset.trim() ? (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Settings First
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
            {uploadStatus.type === "success" && (
              <div className="mt-3">
                <Button onClick={() => setUploadStatus({ type: null, message: "" })} variant="outline" size="sm">
                  Upload Another File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Setup Guide */}
      {(!cloudName || !uploadPreset) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Quick Cloudinary Setup:</h4>
            <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
              <li>Create a free account at cloudinary.com</li>
              <li>Go to Settings → Account to find your Cloud Name</li>
              <li>Go to Settings → Upload → Upload presets</li>
              <li>Create a new preset, set it to "Unsigned", and save</li>
              <li>Enter both values above to start uploading</li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
