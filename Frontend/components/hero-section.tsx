"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, Brain } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const equations = [
    { handwritten: "2x + 3 = 7", digital: "2x + 3 = 7", solution: "x = 2" },
    { handwritten: "x^2 - 4 = 0", digital: "x² - 4 = 0", solution: "x = ±2" },
    { handwritten: "\\frac{dy}{dx} = 2x", digital: "dy/dx = 2x", solution: "y = x² + C" },
    { handwritten: "\\int_0^1 x^2 dx", digital: "∫₀¹ x² dx", solution: "1/3" },
  ]

  const currentEquation = equations[currentStep]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 hero-gradient"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 border border-blue-700/50">
              <Brain className="h-4 w-4 mr-1" />
              AI-Powered Math Recognition
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-6 glow-text">
            <span className="gradient-text">Handwritten Math</span> Recognition & Solving
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our advanced AI model recognizes and solves handwritten mathematical expressions with high accuracy, making
            complex math accessible to everyone.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Try Solver <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950/50">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 glow-border"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl"></div>
              <div className="absolute h-1/4 w-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-md animate-scan"></div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="bg-gray-800/80 rounded-lg p-4 flex items-center justify-center min-h-[100px]">
                  <div className="font-mono text-lg equation-animation">{currentEquation.handwritten}</div>
                </div>

                <div className="flex justify-center">
                 
                </div>

                <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
                  <div className="font-mono text-lg mb-2 equation-animation">{currentEquation.digital}</div>
                  <div className="text-green-400 font-mono equation-animation">{currentEquation.solution}</div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {equations.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentStep === index ? "bg-blue-500" : "bg-gray-600"}`}
                      onClick={() => setCurrentStep(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

