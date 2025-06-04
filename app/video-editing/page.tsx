"use client"

import { useState, useEffect } from "react"
import { Image } from "@nextui-org/react"

interface VideoEditingItem {
  id: string
  type: "image" | "video"
  url: string
  alt?: string
}

const getVideoEditingItems = async (): Promise<VideoEditingItem[]> => {
  // Simulate fetching data from an API or database
  return new Promise((resolve) => {
    setTimeout(() => {
      const items: VideoEditingItem[] = [
        { id: "1", type: "image", url: "cloudinary://nextui/hero-section/hero-desktop.png", alt: "Image 1" },
        { id: "2", type: "video", url: "https://res.cloudinary.com/demo/video/upload/dog.mp4" },
        { id: "3", type: "image", url: "cloudinary://nextui/hero-section/hero-mobile.png", alt: "Image 2" },
        { id: "4", type: "video", url: "https://res.cloudinary.com/demo/video/upload/elephants.mp4" },
        { id: "5", type: "image", url: "cloudinary://nextui/showcase/showcase-desktop.png", alt: "Image 3" },
      ]
      resolve(items)
    }, 500)
  })
}

const VideoEditingPage = () => {
  const [videoEditingItems, setVideoEditingItems] = useState<VideoEditingItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true)
      const items = await getVideoEditingItems()
      setVideoEditingItems(items)
      setLoading(false)
    }

    loadItems()
  }, [])

  const cloudinaryUrl = (url: string) => {
    if (url.startsWith("cloudinary://")) {
      const publicId = url.replace("cloudinary://", "")
      return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`
    }
    return url
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Video Editing Resources</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoEditingItems.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-md overflow-hidden">
                {item.type === "image" ? (
                  <Image
                    src={cloudinaryUrl(item.url) || "/placeholder.svg"}
                    alt={item.alt || "Video Editing Resource"}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                ) : (
                  <video controls className="w-full h-48 object-cover">
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="p-4">
                  <p className="text-gray-700">Type: {item.type}</p>
                  <p className="text-gray-700">URL: {item.url}</p>
                  {item.alt && <p className="text-gray-700">Alt: {item.alt}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Debug Information:</h2>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(videoEditingItems, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoEditingPage
