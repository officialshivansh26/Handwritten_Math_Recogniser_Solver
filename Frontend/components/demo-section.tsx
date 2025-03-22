"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Upload, X, RefreshCw, Check, AlertCircle, Maximize2, Minimize2, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EquationGraph } from "./equation-graph"

interface SolverResponse {
  explanation: string
  extracted_equation: string
  solution: string
  solution_status: string
  status: string
}

export function DemoSection() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<SolverResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [showGraph, setShowGraph] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize canvas context with high-quality settings
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return null

    // High quality settings
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#3b82f6"

    // Enable anti-aliasing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    return ctx
  }, [])

  // Get precise canvas coordinates
  const getCanvasCoordinates = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      // Apply scaling to account for any CSS transformations
      const x = (clientX - rect.left) * scaleX
      const y = (clientY - rect.top) * scaleY

      return { x, y }
    },
    [],
  )

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    setShowGraph(false)

    // Create image preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("https://shopping-planets-tn-cradle.trycloudflare.com/extract_solve/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsUploading(false)
    }
  }

  const processImage = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError("Please upload an image first")
      return
    }

    setIsProcessing(true)
    setError(null)
    setShowGraph(false)

    const formData = new FormData()
    formData.append("file", fileInputRef.current.files[0])

    try {
      const response = await fetch("https://shopping-planets-tn-cradle.trycloudflare.com/extract_solve/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const updateCursorPosition = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !canvasContainerRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      // Calculate position relative to the container
      const x = clientX - rect.left
      const y = clientY - rect.top

      // Use requestAnimationFrame for smoother cursor updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setCursorPosition({ x, y })
      })
    },
    [],
  )

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const ctx = initializeCanvas()
      if (!ctx) return

      setIsDrawing(true)
      setShowCursor(false)

      const { x, y } = getCanvasCoordinates(e)

      setLastPoint({ x, y })

      // Start the path
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y)
      ctx.stroke()
    },
    [getCanvasCoordinates, initializeCanvas],
  )

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      updateCursorPosition(e)

      if (!isDrawing) return

      const ctx = initializeCanvas()
      if (!ctx) return

      const { x, y } = getCanvasCoordinates(e)

      // Use requestAnimationFrame for smoother drawing
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)
        ctx.lineTo(x, y)
        ctx.stroke()

        setLastPoint({ x, y })
      })
    },
    [getCanvasCoordinates, initializeCanvas, isDrawing, lastPoint, updateCursorPosition],
  )

  const endDrawing = useCallback(() => {
    setIsDrawing(false)
    setShowCursor(true)

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setResult(null)
    setError(null)
    setShowGraph(false)
  }, [])

  const recognizeDrawing = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsProcessing(true)
    setError(null)
    setShowGraph(false)

    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else throw new Error("Could not convert canvas to image")
        }, "image/png")
      })

      // Create a File object from the blob
      const file = new File([blob], "equation.png", { type: "image/png" })

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("https://shopping-planets-tn-cradle.trycloudflare.com/extract_solve/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded)

    // Give the DOM time to update before resizing the canvas
    setTimeout(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (ctx) {
          // Save the current drawing
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

          // Adjust canvas size if needed
          if (isExpanded) {
            canvas.width = 600
            canvas.height = 200
          } else {
            canvas.width = 800
            canvas.height = 300
          }

          // Restore drawing with appropriate scaling
          ctx.putImageData(imageData, 0, 0)

          // Reset drawing settings
          initializeCanvas()
        }
      }
    }, 100)
  }, [isExpanded, initializeCanvas])

  // Handle cursor visibility
  useEffect(() => {
    const handleMouseEnter = () => setShowCursor(true)
    const handleMouseLeave = () => {
      setShowCursor(false)
      endDrawing()
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("mouseenter", handleMouseEnter)
      canvas.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        canvas.removeEventListener("mouseenter", handleMouseEnter)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [endDrawing])

  // Clean up animation frames on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Initialize canvas on mount
  useEffect(() => {
    initializeCanvas()
  }, [initializeCanvas])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.section
      id="demo"
      className="py-20 bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Try It Yourself</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload an image of a handwritten equation or draw one directly in our interactive demo. Our AI will
            recognize and solve it in seconds.
          </p>
        </motion.div>

        <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
          <Tabs defaultValue="upload" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="draw">Draw Equation</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="upload" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Upload an Image</CardTitle>
                      <CardDescription>Upload a clear image of a handwritten mathematical equation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <motion.div
                          className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            isUploading
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-gray-700 hover:border-blue-500 hover:bg-blue-500/5"
                          }`}
                          onClick={() => fileInputRef.current?.click()}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {isUploading ? (
                            <div className="flex flex-col items-center">
                              <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                              <p className="text-blue-400">Uploading...</p>
                            </div>
                          ) : imagePreview ? (
                            <div className="relative w-full h-full">
                              <motion.img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Uploaded equation"
                                className="object-contain w-full h-full p-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                              <motion.button
                                className="absolute top-2 right-2 bg-gray-800/80 rounded-full p-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setImagePreview(null)
                                  if (fileInputRef.current) fileInputRef.current.value = ""
                                  setResult(null)
                                  setShowGraph(false)
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="h-5 w-5 text-gray-300" />
                              </motion.button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-10 w-10 text-gray-500 mb-4" />
                              <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                              <p className="text-gray-500 text-sm">PNG, JPG or JPEG (max. 5MB)</p>
                            </>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileUpload}
                            disabled={isUploading || isProcessing}
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="default"
                          onClick={processImage}
                          disabled={isUploading || isProcessing || !imagePreview}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Recognize Equation</>
                          )}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="draw" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${isExpanded ? "fixed inset-0 z-50 m-4 max-w-none" : ""}`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Draw an Equation</CardTitle>
                        <CardDescription>Draw a mathematical equation using your mouse or touch screen</CardDescription>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleExpand}
                          className="h-8 w-8 rounded-full bg-gray-800/50 hover:bg-gray-700"
                        >
                          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div ref={canvasContainerRef} className="relative w-full">
                          <canvas
                            ref={canvasRef}
                            width={isExpanded ? 800 : 600}
                            height={isExpanded ? 300 : 200}
                            className={`w-full border border-gray-700 rounded-lg bg-gray-800/50 touch-none transition-all duration-300 ${
                              isExpanded ? "h-[60vh]" : "h-64"
                            }`}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={endDrawing}
                            onMouseLeave={endDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={endDrawing}
                          />

                          {/* Custom cursor */}
                          <AnimatePresence>
                            {showCursor && !isDrawing && (
                              <motion.div
                                ref={cursorRef}
                                className="absolute pointer-events-none w-4 h-4 rounded-full border-2 border-blue-500 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                style={{
                                  left: `${cursorPosition.x}px`,
                                  top: `${cursorPosition.y}px`,
                                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                                  boxShadow: "0 0 4px rgba(59, 130, 246, 0.8)",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              />
                            )}
                          </AnimatePresence>

                          <motion.div
                            className="absolute bottom-3 right-3 flex space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="bg-gray-800/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-gray-300">
                              Draw your equation here
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" onClick={clearCanvas} className="border-gray-700">
                          <X className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="default"
                          onClick={recognizeDrawing}
                          disabled={isProcessing}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Recognize Equation</>
                          )}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mt-6 bg-red-950/50 border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mt-6 border-blue-900/50 bg-blue-950/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Recognition Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="space-y-4"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Recognized Equation:</h3>
                        <p className="text-xl font-mono bg-gray-800/50 p-3 rounded-md">{result.extracted_equation}</p>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Solution:</h3>
                        <p className="text-xl font-mono text-green-400 bg-gray-800/50 p-3 rounded-md">
                          {result.solution}
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Explanation:</h3>
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="font-mono">{result.explanation}</p>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Status:</h3>
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="font-mono">
                            Solution Status: {result.solution_status}
                            <br />
                            Overall Status: {result.status}
                          </p>
                        </div>
                      </motion.div>

                      {/* Graph toggle button */}
                      {result.extracted_equation && (
                        <motion.div className="flex justify-center mt-4" variants={itemVariants}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={() => setShowGraph(!showGraph)}
                              className="border-blue-700 text-blue-400 hover:bg-blue-900/20"
                            >
                              {showGraph ? "Hide Graph" : "Show Graph"}
                              <motion.div animate={{ rotate: showGraph ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Equation graph */}
                      <AnimatePresence>
                        {showGraph && result.extracted_equation && (
                          <motion.div
                            className="mt-4 bg-gray-800/50 p-4 rounded-lg"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Equation Visualization:</h3>
                            <div className="h-64 w-full">
                              <EquationGraph equation={result.extracted_equation} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}

