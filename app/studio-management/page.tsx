"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Link,
  ImageIcon,
  Video,
  ExternalLink,
  ChevronDown,
  Upload,
  Globe,
  CloudIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
import { ExternalServiceUpload } from "@/components/external-service-upload"

interface MediaItem {
  id: string
  type: "image" | "video" | "external-link"
  title: string
  description: string
  src: string
  thumbnail?: string
  category: "cinematography" | "video-editing" | "social-media"
  isExternal?: boolean
  externalUrl?: string
  sourceType: "file" | "url" // New field to distinguish between file upload and URL
}

interface Project {
  id: string
  title: string
  category: string
  description: string
  thumbnail: string
  url?: string
  isExternal?: boolean
  sourceType: "file" | "url"
}

export default function AdminPanel() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showAddMedia, setShowAddMedia] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)

  // Simple authentication
  const handleLogin = () => {
    if (password === "PSA.website.@#!") {
      setIsAuthenticated(true)
      loadData()
    } else {
      alert("Incorrect password")
    }
  }

  // Load data from localStorage
  const loadData = () => {
    const savedMedia = localStorage.getItem("psaStudiosMedia")
    const savedProjects = localStorage.getItem("psaStudiosProjects")

    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia))
    } else {
      // Default data with mixed media types
      setMediaItems([
        {
          id: "1",
          type: "image",
          title: "Cinematic Portrait",
          description: "Dramatic lighting cinematography",
          src: "/images/cinematography-1.jpeg",
          category: "cinematography",
          sourceType: "file",
        },
        {
          id: "2",
          type: "video",
          title: "Behind the Scenes",
          description: "Video editing process showcase",
          src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          thumbnail: "/images/video-thumb-1.jpeg",
          category: "video-editing",
          sourceType: "url",
        },
        {
          id: "3",
          type: "external-link",
          title: "YouTube Showcase",
          description: "Our latest video editing reel",
          src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          thumbnail: "/images/youtube-thumbnail.jpeg",
          category: "social-media",
          isExternal: true,
          externalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          sourceType: "url",
        },
      ])
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Default projects
      setProjects([
        {
          id: "1",
          title: "Corporate Brand Film",
          category: "Commercial",
          description: "Professional corporate video production",
          thumbnail: "/images/project-1.jpeg",
          sourceType: "file",
        },
        {
          id: "2",
          title: "Music Video",
          category: "Entertainment",
          description: "Creative music video production",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
          sourceType: "url",
        },
      ])
    }
  }

  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem("psaStudiosMedia", JSON.stringify(mediaItems))
    localStorage.setItem("psaStudiosProjects", JSON.stringify(projects))
  }

  useEffect(() => {
    saveData()
  }, [mediaItems, projects])

  const handleAddMediaItem = (newItem: Omit<MediaItem, "id">) => {
    const item: MediaItem = {
      ...newItem,
      id: Date.now().toString(),
    }
    setMediaItems([...mediaItems, item])
    setShowAddMedia(false)
  }

  const handleEditMediaItem = (updatedItem: MediaItem) => {
    setMediaItems(mediaItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setEditingItem(null)
  }

  const handleDeleteMediaItem = (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      setMediaItems(mediaItems.filter((item) => item.id !== id))
    }
  }

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    }
    setProjects([...projects, project])
    setShowAddProject(false)
  }

  const handleEditProject = (updatedProject: Project) => {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 max-w-md w-full mx-4"
        >
          <h1 className="text-2xl font-bold text-white mb-6 text-center">PSA Studios Admin</h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button onClick={handleLogin} className="w-full bg-white text-black hover:bg-white/90">
              Login
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">PSA Studios Admin Panel</h1>
            <div className="flex gap-4">
              <Button
                onClick={() => window.open("/", "_blank")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Site
              </Button>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="media" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Media Gallery ({mediaItems.length})
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Projects ({projects.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="media" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Media Gallery Management</h2>
                <Button onClick={() => setShowAddMedia(true)} className="bg-white text-black hover:bg-white/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Media
                </Button>
              </div>

              {/* Uniform 3-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <MediaItemCard key={item.id} item={item} onEdit={setEditingItem} onDelete={handleDeleteMediaItem} />
                ))}
              </div>

              {mediaItems.length === 0 && (
                <div className="text-center py-12 text-white/60">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                  <p>No media items yet. Add your first image, video, or external link!</p>
                </div>
              )}

              {/* Add Media Dialog */}
              <Dialog open={showAddMedia} onOpenChange={setShowAddMedia}>
                <DialogContent className="bg-black border-white/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Media Item</DialogTitle>
                  </DialogHeader>
                  <MediaItemForm onSubmit={handleAddMediaItem} onCancel={() => setShowAddMedia(false)} />
                </DialogContent>
              </Dialog>

              {/* Edit Media Dialog */}
              {editingItem && (
                <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
                  <DialogContent className="bg-black border-white/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Media Item</DialogTitle>
                    </DialogHeader>
                    <MediaItemForm
                      item={editingItem}
                      onSubmit={handleEditMediaItem}
                      onCancel={() => setEditingItem(null)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects Management</h2>
                <Button onClick={() => setShowAddProject(true)} className="bg-white text-black hover:bg-white/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {/* Uniform 3-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={setEditingProject}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>

              {projects.length === 0 && (
                <div className="text-center py-12 text-white/60">
                  <Video className="w-12 h-12 mx-auto mb-4" />
                  <p>No projects yet. Add your first project!</p>
                </div>
              )}

              {/* Add Project Dialog */}
              <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
                <DialogContent className="bg-black border-white/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm onSubmit={handleAddProject} onCancel={() => setShowAddProject(false)} />
                </DialogContent>
              </Dialog>

              {/* Edit Project Dialog */}
              {editingProject && (
                <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
                  <DialogContent className="bg-black border-white/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    <ProjectForm
                      project={editingProject}
                      onSubmit={handleEditProject}
                      onCancel={() => setEditingProject(null)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

function MediaItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: MediaItem
  onEdit: (item: MediaItem) => void
  onDelete: (id: string) => void
}) {
  const getMediaIcon = () => {
    switch (item.type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "external-link":
        return <ExternalLink className="w-4 h-4" />
      default:
        return <Link className="w-4 h-4" />
    }
  }

  const getSourceIcon = () => {
    return item.sourceType === "url" ? <Globe className="w-3 h-3" /> : <Upload className="w-3 h-3" />
  }

  return (
    <Card className="bg-white/10 border-white/20 text-white h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getMediaIcon()}
            <CardTitle className="text-sm truncate">{item.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getSourceIcon()}
            <Badge variant="outline" className="border-white/20 text-white text-xs">
              {item.category.replace("-", " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col">
        {/* Media Preview */}
        <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative">
          {item.type === "image" ? (
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
          ) : item.type === "video" ? (
            item.thumbnail ? (
              <Image
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/60">
                <Video className="w-8 h-8" />
              </div>
            )
          ) : item.thumbnail ? (
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/60">
              <ExternalLink className="w-8 h-8" />
            </div>
          )}

          {/* Type indicator overlay */}
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
            {getMediaIcon()}
            {item.type.replace("-", " ")}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs text-white/70 line-clamp-2 mb-2">{item.description}</p>
          {(item.isExternal || item.sourceType === "url") && (
            <div className="text-xs text-blue-400 break-all mb-2">{item.externalUrl || item.src}</div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(item)}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(item.id)}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}) {
  return (
    <Card className="bg-white/10 border-white/20 text-white h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm truncate">{project.title}</CardTitle>
          <div className="flex items-center gap-2">
            {project.sourceType === "url" ? <Globe className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
            <Badge variant="outline" className="border-white/20 text-white text-xs">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative">
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
        </div>

        <div className="flex-1">
          <p className="text-xs text-white/70 line-clamp-2 mb-2">{project.description}</p>
          {project.url && <div className="text-xs text-blue-400 break-all">{project.url}</div>}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(project)}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(project.id)}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom Select Component
function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder,
  className = "",
}: {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-left flex items-center justify-between hover:bg-white/20 transition-colors"
      >
        <span>{value ? options.find((opt) => opt.value === value)?.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-white/20 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MediaItemForm({
  item,
  onSubmit,
  onCancel,
}: {
  item?: MediaItem
  onSubmit: (item: MediaItem | Omit<MediaItem, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    type: item?.type || ("image" as "image" | "video" | "external-link"),
    title: item?.title || "",
    description: item?.description || "",
    src: item?.src || "",
    thumbnail: item?.thumbnail || "",
    category: item?.category || ("cinematography" as "cinematography" | "video-editing" | "social-media"),
    isExternal: item?.isExternal || false,
    externalUrl: item?.externalUrl || "",
    sourceType: item?.sourceType || ("file" as "file" | "url"),
  })

  const [uploadMethod, setUploadMethod] = useState<"file-upload" | "url">("file-upload")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!formData.description.trim()) {
      alert("Please enter a description")
      return
    }

    if (!formData.src.trim()) {
      alert("Please enter a source (file path or URL)")
      return
    }

    // Set external properties for external-link type
    const finalData = {
      ...formData,
      isExternal: formData.type === "external-link",
      externalUrl: formData.type === "external-link" ? formData.src : formData.externalUrl,
    }

    if (item) {
      onSubmit({ ...item, ...finalData })
    } else {
      onSubmit(finalData)
    }
  }

  const handleFileUploaded = (filePath: string) => {
    setFormData({
      ...formData,
      src: filePath,
      sourceType: "file",
    })
  }

  const handleExternalMediaSelected = (data: {
    url: string
    type: "image" | "video" | "external-link"
    thumbnailUrl?: string
  }) => {
    setFormData({
      ...formData,
      type: data.type,
      src: data.url,
      thumbnail: data.thumbnailUrl || formData.thumbnail,
      sourceType: "url",
      isExternal: data.type === "external-link",
      externalUrl: data.type === "external-link" ? data.url : "",
    })
  }

  const typeOptions = [
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "external-link", label: "External Link" },
  ]

  const categoryOptions = [
    { value: "cinematography", label: "Cinematography" },
    { value: "video-editing", label: "Video Editing" },
    { value: "social-media", label: "Social Media" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Media Type *</label>
            <CustomSelect
              value={formData.type}
              onValueChange={(value: "image" | "video" | "external-link") => setFormData({ ...formData, type: value })}
              options={typeOptions}
              placeholder="Select type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <CustomSelect
              value={formData.category}
              onValueChange={(value: "cinematography" | "video-editing" | "social-media") =>
                setFormData({ ...formData, category: value })
              }
              options={categoryOptions}
              placeholder="Select category"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Describe this media item"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Media Source */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Media Source</h3>

        <div className="bg-white/5 rounded-lg p-4">
          <Tabs defaultValue="file-upload" onValueChange={(value) => setUploadMethod(value as "file-upload" | "url")}>
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="file-upload" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Upload className="w-4 h-4 mr-2" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="url" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <CloudIcon className="w-4 h-4 mr-2" />
                URL / External
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file-upload" className="mt-4">
              <FileUpload onFileUploaded={handleFileUploaded} />
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <ExternalServiceUpload onMediaSelected={handleExternalMediaSelected} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Manual URL/Path Entry */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {uploadMethod === "file-upload" ? "File Path" : "URL"} *
          </label>
          <Input
            value={formData.src}
            onChange={(e) => setFormData({ ...formData, src: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder={
              uploadMethod === "file-upload"
                ? "/images/your-file.jpg or /videos/your-video.mp4"
                : "https://example.com/image.jpg or https://youtube.com/watch?v=..."
            }
            required
          />
          <p className="text-xs text-white/60 mt-1">
            {uploadMethod === "file-upload" ? "Path to your uploaded file" : "URL to external media"}
          </p>
        </div>

        {(formData.type === "video" || formData.type === "external-link") && (
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
            <Input
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder={
                uploadMethod === "file-upload" ? "/images/thumbnail.jpg" : "https://example.com/thumbnail.jpg"
              }
            />
            <p className="text-xs text-white/60 mt-1">Optional: Add a thumbnail image for videos and external links</p>
          </div>
        )}
      </div>

      {/* Preview */}
      {formData.src && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Preview</h3>
          <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative max-w-md">
            {formData.type === "image" ? (
              <Image
                src={formData.src || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            ) : formData.thumbnail ? (
              <Image
                src={formData.thumbnail || "/placeholder.svg"}
                alt="Thumbnail Preview"
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/60">
                {formData.type === "video" ? <Video className="w-8 h-8" /> : <ExternalLink className="w-8 h-8" />}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-white/20">
        <Button type="submit" className="flex-1 bg-white text-black hover:bg-white/90">
          <Save className="w-4 h-4 mr-2" />
          Save Media Item
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project?: Project
  onSubmit: (project: Project | Omit<Project, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    category: project?.category || "",
    description: project?.description || "",
    thumbnail: project?.thumbnail || "",
    url: project?.url || "",
    isExternal: project?.isExternal || false,
    sourceType: project?.sourceType || ("file" as "file" | "url"),
  })

  const [uploadMethod, setUploadMethod] = useState<"file-upload" | "url">("file-upload")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!formData.category.trim()) {
      alert("Please enter a category")
      return
    }

    if (!formData.description.trim()) {
      alert("Please enter a description")
      return
    }

    if (project) {
      onSubmit({ ...project, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  const handleFileUploaded = (filePath: string) => {
    setFormData({
      ...formData,
      thumbnail: filePath,
      sourceType: "file",
    })
  }

  const handleExternalMediaSelected = (data: {
    url: string
    type: "image" | "video" | "external-link"
    thumbnailUrl?: string
  }) => {
    if (data.type === "image") {
      setFormData({
        ...formData,
        thumbnail: data.url,
        sourceType: "url",
      })
    } else if (data.thumbnailUrl) {
      setFormData({
        ...formData,
        thumbnail: data.thumbnailUrl,
        sourceType: "url",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Project Information</h3>

        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Project title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Commercial, Entertainment, Documentary, etc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Project description"
            rows={3}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Thumbnail Image</h3>

        <div className="bg-white/5 rounded-lg p-4">
          <Tabs defaultValue="file-upload" onValueChange={(value) => setUploadMethod(value as "file-upload" | "url")}>
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="file-upload" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Upload className="w-4 h-4 mr-2" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="url" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <CloudIcon className="w-4 h-4 mr-2" />
                URL / External
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file-upload" className="mt-4">
              <FileUpload onFileUploaded={handleFileUploaded} accept="image/*" />
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <ExternalServiceUpload onMediaSelected={handleExternalMediaSelected} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail Path/URL</label>
          <Input
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder={
              uploadMethod === "file-upload" ? "/images/project-thumbnail.jpg" : "https://example.com/thumbnail.jpg"
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project URL (Optional)</label>
          <Input
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value, isExternal: !!e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="https://example.com or leave empty"
          />
          <p className="text-xs text-white/60 mt-1">Link to live project, case study, or external portfolio</p>
        </div>
      </div>

      {/* Preview */}
      {formData.thumbnail && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Preview</h3>
          <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative max-w-md">
            <Image
              src={formData.thumbnail || "/placeholder.svg"}
              alt="Thumbnail Preview"
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-white/20">
        <Button type="submit" className="flex-1 bg-white text-black hover:bg-white/90">
          <Save className="w-4 h-4 mr-2" />
          Save Project
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
