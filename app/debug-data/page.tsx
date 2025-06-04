"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function DebugDataPage() {
  const [mediaData, setMediaData] = useState("")
  const [projectData, setProjectData] = useState("")
  const [githubData, setGithubData] = useState("")

  useEffect(() => {
    // Load all data from localStorage
    const media = localStorage.getItem("psaStudiosMedia")
    const projects = localStorage.getItem("psaStudiosProjects")
    const github = localStorage.getItem("psaStudiosGithubConfig")

    setMediaData(media || "No media data found")
    setProjectData(projects || "No project data found")
    setGithubData(github || "No GitHub config found")
  }, [])

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear ALL data? This cannot be undone!")) {
      localStorage.removeItem("psaStudiosMedia")
      localStorage.removeItem("psaStudiosProjects")
      localStorage.removeItem("psaStudiosGithubConfig")
      window.location.reload()
    }
  }

  const restoreMediaData = () => {
    try {
      const parsed = JSON.parse(mediaData)
      localStorage.setItem("psaStudiosMedia", JSON.stringify(parsed))
      alert("Media data restored!")
      window.dispatchEvent(new CustomEvent("localStorageUpdate"))
    } catch (error) {
      alert("Invalid JSON data!")
    }
  }

  const addTestData = () => {
    const testData = [
      {
        id: "test-" + Date.now(),
        type: "image",
        title: "Test Cinematography Image",
        description: "Test image for debugging",
        src: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        category: "cinematography",
        sourceType: "url",
        layout: {
          colSpan: "md:col-span-1",
          rowSpan: "md:row-span-1",
          aspectRatio: "aspect-square",
        },
      },
    ]

    const existing = localStorage.getItem("psaStudiosMedia")
    const existingData = existing ? JSON.parse(existing) : []
    const newData = [...existingData, ...testData]

    localStorage.setItem("psaStudiosMedia", JSON.stringify(newData))
    alert("Test data added!")
    window.dispatchEvent(new CustomEvent("localStorageUpdate"))
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Debug Data Page</h1>

        <div className="flex gap-4">
          <Button onClick={() => (window.location.href = "/studio-management")} variant="outline">
            Back to Admin
          </Button>
          <Button onClick={() => (window.location.href = "/cinematography")} variant="outline">
            View Cinematography
          </Button>
          <Button onClick={addTestData} className="bg-green-600 hover:bg-green-700">
            Add Test Data
          </Button>
          <Button onClick={clearAllData} variant="destructive">
            Clear All Data
          </Button>
        </div>

        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle>Media Data (localStorage)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={mediaData}
              onChange={(e) => setMediaData(e.target.value)}
              className="bg-white/10 border-white/20 text-white font-mono text-xs"
              rows={10}
            />
            <Button onClick={restoreMediaData} className="mt-2">
              Restore Media Data
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle>Project Data (localStorage)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={projectData}
              onChange={(e) => setProjectData(e.target.value)}
              className="bg-white/10 border-white/20 text-white font-mono text-xs"
              rows={6}
            />
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle>GitHub Config (localStorage)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={githubData}
              onChange={(e) => setGithubData(e.target.value)}
              className="bg-white/10 border-white/20 text-white font-mono text-xs"
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
