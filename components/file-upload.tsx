"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FileUploadProps {
  onFileUploaded: (filePath: string) => void
  accept?: string
}

export function FileUpload({ onFileUploaded, accept = "image/*,video/*" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
    filePath?: string
  }>({ type: null, message: "" })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })

    // Client-side validation
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setUploadStatus({
        type: "error",
        message: "File size must be less than 10MB",
      })
      setIsUploading(false)
      return
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setUploadStatus({
        type: "error",
        message: "Only image and video files are allowed",
      })
      setIsUploading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus({
          type: "success",
          message: `File uploaded successfully! (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
          filePath: result.filePath,
        })
      } else {
        setUploadStatus({
          type: "error",
          message: result.error || "Upload failed",
        })
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Network error during upload",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleUseFile = () => {
    if (uploadStatus.filePath) {
      onFileUploaded(uploadStatus.filePath)
      setUploadStatus({ type: null, message: "" })
    }
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <CardContent
          className="p-8 text-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <Upload className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium">{isDragging ? "Drop your file here" : "Drag & drop your file here"}</p>
              <p className="text-sm text-gray-500 mt-1">Or click to browse (Images & Videos, max 10MB)</p>
            </div>
            <input
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <Button asChild variant="outline" disabled={isUploading}>
              <label htmlFor="file-upload" className="cursor-pointer">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Browse Files"
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
                {uploadStatus.filePath && (
                  <p className="text-sm text-green-700 mt-1 font-mono">File URL: {uploadStatus.filePath}</p>
                )}
              </div>
            </div>
            {uploadStatus.type === "success" && uploadStatus.filePath && (
              <div className="mt-3 flex space-x-2">
                <Button onClick={handleUseFile} size="sm" className="bg-green-600 hover:bg-green-700">
                  Use This File
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
