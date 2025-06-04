"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video, CloudIcon, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ExternalServiceUploadProps {
  onMediaSelected: (data: {
    url: string
    type: "image" | "video" | "external-link"
    thumbnailUrl?: string
  }) => void
}

export function ExternalServiceUpload({ onMediaSelected }: ExternalServiceUploadProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [externalUrl, setExternalUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<"image" | "video" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUrlSubmit = () => {
    if (!imageUrl) {
      setError("Please enter an image URL")
      return
    }

    setError(null)
    onMediaSelected({
      url: imageUrl,
      type: "image",
    })
    setImageUrl("")
    setPreviewUrl(null)
  }

  const handleVideoUrlSubmit = () => {
    if (!videoUrl) {
      setError("Please enter a video URL")
      return
    }

    setError(null)
    onMediaSelected({
      url: videoUrl,
      type: "video",
      thumbnailUrl: thumbnailUrl || undefined,
    })
    setVideoUrl("")
    setThumbnailUrl("")
    setPreviewUrl(null)
  }

  const handleExternalUrlSubmit = () => {
    if (!externalUrl) {
      setError("Please enter an external URL")
      return
    }

    setError(null)
    onMediaSelected({
      url: externalUrl,
      type: "external-link",
      thumbnailUrl: thumbnailUrl || undefined,
    })
    setExternalUrl("")
    setThumbnailUrl("")
    setPreviewUrl(null)
  }

  const handleImagePreview = () => {
    if (imageUrl) {
      setPreviewUrl(imageUrl)
      setPreviewType("image")
      setError(null)
    }
  }

  const handleVideoPreview = () => {
    if (thumbnailUrl) {
      setPreviewUrl(thumbnailUrl)
      setPreviewType("image")
      setError(null)
    } else if (videoUrl) {
      setPreviewUrl(videoUrl)
      setPreviewType("video")
      setError(null)
    }
  }

  const handleExternalPreview = () => {
    if (thumbnailUrl) {
      setPreviewUrl(thumbnailUrl)
      setPreviewType("image")
      setError(null)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="image" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image URL
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <Video className="w-4 h-4 mr-2" />
            Video URL
          </TabsTrigger>
          <TabsTrigger value="external" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <ExternalLink className="w-4 h-4 mr-2" />
            External Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-white/10 border-white/20 text-white flex-1"
              />
              <Button
                type="button"
                onClick={handleImagePreview}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Preview
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-1">Direct link to an image (JPG, PNG, WebP, etc.)</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleImageUrlSubmit} className="bg-white text-black hover:bg-white/90">
              <CloudIcon className="w-4 h-4 mr-2" />
              Use Image URL
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Video URL</label>
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="bg-white/10 border-white/20 text-white"
            />
            <p className="text-xs text-white/60 mt-1">Direct link to a video file (MP4, WebM, etc.)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail URL (Optional)</label>
            <div className="flex gap-2">
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-white/10 border-white/20 text-white flex-1"
              />
              <Button
                type="button"
                onClick={handleVideoPreview}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Preview
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-1">Image to display before the video plays</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleVideoUrlSubmit} className="bg-white text-black hover:bg-white/90">
              <CloudIcon className="w-4 h-4 mr-2" />
              Use Video URL
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="external" className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">External URL</label>
            <Input
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="bg-white/10 border-white/20 text-white"
            />
            <p className="text-xs text-white/60 mt-1">YouTube, Vimeo, or any external website</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail URL (Optional)</label>
            <div className="flex gap-2">
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-white/10 border-white/20 text-white flex-1"
              />
              <Button
                type="button"
                onClick={handleExternalPreview}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Preview
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-1">Image to represent the external link</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleExternalUrlSubmit} className="bg-white text-black hover:bg-white/90">
              <CloudIcon className="w-4 h-4 mr-2" />
              Use External Link
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {error && <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md text-sm text-white">{error}</div>}

      {previewUrl && (
        <div className="border border-white/20 rounded-lg overflow-hidden">
          <div className="aspect-video relative bg-black/40">
            {previewType === "image" && (
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-contain"
                onError={() => {
                  setError("Could not load preview. The URL might be invalid or the image is not accessible.")
                  setPreviewUrl(null)
                }}
              />
            )}
            {previewType === "video" && (
              <video
                src={previewUrl}
                className="w-full h-full object-contain"
                controls
                onError={() => {
                  setError("Could not load preview. The URL might be invalid or the video is not accessible.")
                  setPreviewUrl(null)
                }}
              />
            )}
          </div>
          <div className="p-2 bg-white/5 text-xs text-white/60 text-center">Preview</div>
        </div>
      )}
    </div>
  )
}
