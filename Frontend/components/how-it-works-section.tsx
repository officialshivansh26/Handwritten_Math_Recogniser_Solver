"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, ScanLine, Binary, BrainCircuit, Calculator, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Camera,
    title: "Image Capture",
    description: "Upload an image of a handwritten equation or draw directly in the browser.",
    color: "blue",
  },
  {
    icon: ScanLine,
    title: "Preprocessing",
    description: "The image is preprocessed to enhance features and remove noise for better recognition.",
    color: "cyan",
  },
  {
    icon: Binary,
    title: "Segmentation",
    description: "The equation is segmented into individual symbols and their spatial relationships.",
    color: "teal",
  },
  {
    icon: BrainCircuit,
    title: "Recognition",
    description: "Our neural network identifies each symbol and understands the equation structure.",
    color: "green",
  },
  {
    icon: Calculator,
    title: "Solving",
    description: "The recognized equation is parsed and solved using mathematical algorithms.",
    color: "yellow",
  },
  {
    icon: CheckCircle,
    title: "Result",
    description: "The solution is presented with step-by-step explanations for better understanding.",
    color: "orange",
  },
]

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState("process")

  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 gradient-text">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our advanced AI system uses a multi-stage process to recognize and solve handwritten mathematical
            expressions with high accuracy.
          </p>
        </div>

        <Tabs defaultValue="process" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="process">Process Flow</TabsTrigger>
            <TabsTrigger value="architecture">Model Architecture</TabsTrigger>
            <TabsTrigger value="technology">Technology Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="mt-0">
            <div className="relative">
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-orange-500 transform -translate-y-1/2 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.slice(0, 3).map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute top-12 left-1/2 w-8 h-8 rounded-full bg-gray-800 border-4 border-gray-900 transform -translate-x-1/2 z-10 hidden md:block"></div>
                    <Card className="bg-gray-800/50 border-gray-700 mt-8">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-14 h-14 rounded-full bg-${step.color}-900/20 flex items-center justify-center mb-4`}
                          >
                            <step.icon className={`h-7 w-7 text-${step.color}-400`} />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {steps.slice(3).map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute top-12 left-1/2 w-8 h-8 rounded-full bg-gray-800 border-4 border-gray-900 transform -translate-x-1/2 z-10 hidden md:block"></div>
                    <Card className="bg-gray-800/50 border-gray-700 mt-8">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-14 h-14 rounded-full bg-${step.color}-900/20 flex items-center justify-center mb-4`}
                          >
                            <step.icon className={`h-7 w-7 text-${step.color}-400`} />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="mt-0">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-3xl">
                    <div className="bg-gray-900 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-center">Project Workflow</h3>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-blue-400">Input Layer</h4>
                          <p className="text-sm text-gray-400">Preprocessed image data</p>
                        </div>

                        <div className="bg-cyan-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-cyan-400">Image OCR</h4>
                          <p className="text-sm text-gray-400">Qwen Vision Language LLM</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-purple-400">Math Solver</h4>
                          <p className="text-sm text-gray-400">Deepseek distill llama LLM Model</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-green-400">Output</h4>
                          <p className="text-sm text-gray-400">Recognised equation and solution</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Handwritten Image Parsing</h4>
                          <p className="text-sm text-gray-400">
                            Our model utilizes Qwen LLM to process handwritten equations, extracting and converting mathematical symbols into a structured digital format with high accuracy.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Mathematical Equation Solving</h4>
                          <p className="text-sm text-gray-400">
                            We leverage DeepSeek Distill LLaMA, a powerful language model, to interpret and solve the parsed equations efficiently, ensuring precise mathematical computations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-center">Mathematical Parser</h3>
                      <p className="text-gray-400 mb-4">
                        After recognition, a specialized mathematical parser converts the recognized symbols into a
                        structured representation that can be solved algorithmically.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-yellow-400">Syntax Analysis</h4>
                          <p className="text-sm text-gray-400">Parsing mathematical syntax</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-orange-400">Semantic Analysis</h4>
                          <p className="text-sm text-gray-400">Understanding mathematical meaning</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-4 text-center">
                          <h4 className="font-medium mb-2 text-red-400">Solver Engine</h4>
                          <p className="text-sm text-gray-400">Computing solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technology" className="mt-0">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">AI & Machine Learning</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">TensorFlow & PyTorch</span>
                          <p className="text-sm text-gray-400 mt-1">
                            Deep learning frameworks for model training and inference
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">LLM Models</span>
                          <p className="text-sm text-gray-400 mt-1">For Image Parsing and Solving</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">Langchain</span>
                          <p className="text-sm text-gray-400 mt-1">For Proper Pipelining of models</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Web & Cloud Infrastructure</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-purple-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">Next.js & React</span>
                          <p className="text-sm text-gray-400 mt-1">Frontend framework for the web application</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-purple-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">RestFul API & Cloudfare</span>
                          <p className="text-sm text-gray-400 mt-1">
                            High-performance API framework for backend services and making api for public server
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-purple-900/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-400 text-xs">•</span>
                        </div>
                        <div>
                          <span className="font-medium">Vercel & Cloudinary</span>
                          <p className="text-sm text-gray-400 mt-1">
                            For deployment purpose and image upload
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

