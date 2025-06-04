import Image from "next/image"
import { allSocialMedia } from "contentlayer/generated"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Media",
  description: "A collection of social media posts.",
}

function getImageURL(src: string): string {
  if (src.startsWith("https://res.cloudinary.com")) {
    return src
  }

  if (src.startsWith("/")) {
    return `https://res.cloudinary.com/practicaldev/image/fetch/s--${process.env.NEXT_PUBLIC_CLOUDINARY_TRANSFORMATION}--/f_auto,q_auto/https://practicaldev.cc${src}`
  }

  return `https://res.cloudinary.com/practicaldev/image/fetch/s--${process.env.NEXT_PUBLIC_CLOUDINARY_TRANSFORMATION}--/f_auto,q_auto/${src}`
}

export default function SocialMedia() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Social Media Posts</h1>
      <p>Debug: {JSON.stringify(allSocialMedia.map((item) => item.title))}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSocialMedia.map((socialMedia) => (
          <div key={socialMedia._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {socialMedia.image && (
              <Image
                src={getImageURL(socialMedia.image) || "/placeholder.svg"}
                alt={socialMedia.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{socialMedia.title}</h2>
              <p className="text-gray-700">{socialMedia.description}</p>
              <a
                href={socialMedia.url}
                className="block mt-4 text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Post
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
