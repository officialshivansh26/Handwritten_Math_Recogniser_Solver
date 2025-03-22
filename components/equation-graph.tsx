"use client"

import type React from "react"

import { useEffect, useRef, useState, useMemo } from "react"
import { RefreshCw, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EquationGraphProps {
  equation: string
}

type EquationType = "function" | "implicit" | "parametric" | "xInTermsOfY" | "unknown"

export function EquationGraph({ equation }: EquationGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [equationType, setEquationType] = useState<EquationType>("unknown")
  const [parametricRange, setParametricRange] = useState({ min: 0, max: 2 * Math.PI })

  // Detect equation type
  const detectEquationType = (eq: string): EquationType => {
    const cleanEq = eq.replace(/\s+/g, "").toLowerCase()

    if (cleanEq.includes("t") && (cleanEq.includes("x=") || cleanEq.includes("y="))) {
      return "parametric"
    }

    if (cleanEq.includes("x") && cleanEq.includes("y")) {
      if (cleanEq.match(/^y\s*=/) || cleanEq.split("=")[0].includes("y")) {
        return "function"
      }
      if (cleanEq.match(/^x\s*=/) || cleanEq.split("=")[0].includes("x")) {
        return "xInTermsOfY"
      }
      return "implicit"
    }

    if (cleanEq.includes("x") && !cleanEq.includes("y")) {
      return "function"
    }
    if (!cleanEq.includes("x") && cleanEq.includes("y")) {
      return "xInTermsOfY"
    }

    return "unknown"
  }

  const parseEquation = (eq: string, type: EquationType) => {
    let cleanEq = eq.replace(/\s+/g, "").replace(/\^/g, "**")

    switch (type) {
      case "function":
      case "xInTermsOfY":
        return cleanEq.includes("=") ? cleanEq.split("=")[1] : cleanEq
      case "implicit":
        if (cleanEq.includes("=")) {
          const [left, right] = cleanEq.split("=")
          cleanEq = `${left}-(${right})`
        }
        return cleanEq
      case "parametric":
        const xMatch = cleanEq.match(/x\s*=\s*([^,;]+)/)
        const yMatch = cleanEq.match(/y\s*=\s*([^,;]+)/)
        return {
          x: xMatch ? xMatch[1] : "cos(t)",
          y: yMatch ? yMatch[1] : "sin(t)",
        }
      default:
        return cleanEq
    }
  }

  const detectedType = useMemo(() => detectEquationType(equation), [equation])

  useEffect(() => {
    setEquationType(detectedType)
  }, [detectedType])

  useEffect(() => {
    const drawGraph = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const functionPlot = (await import("function-plot")).default
        if (!containerRef.current) return
        containerRef.current.innerHTML = ""
        const parsedEquation = parseEquation(equation, equationType)

        const plotConfig: any = {
          target: containerRef.current,
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
          grid: true,
          yAxis: { domain: [-10, 10] },
          xAxis: { domain: [-10, 10] },
          disableZoom: false,
          tip: { xLine: true, yLine: true },
          annotations: [
            { x: 0, color: "rgba(100, 100, 100, 0.2)" },
            { y: 0, color: "rgba(100, 100, 100, 0.2)" },
          ],
        }

        switch (equationType) {
          case "function":
            plotConfig.data = [{ fn: parsedEquation, color: "#3b82f6" }]
            break
          case "xInTermsOfY":
            plotConfig.data = [{ fn: parsedEquation, fnType: "implicit", implicit: `x - (${parsedEquation})`, color: "#3b82f6" }]
            break
          case "implicit":
            plotConfig.data = [{ fn: parsedEquation, fnType: "implicit", color: "#3b82f6" }]
            break
          case "parametric":
            if (typeof parsedEquation === "object") {
              plotConfig.data = [{ x: parsedEquation.x, y: parsedEquation.y, fnType: "parametric", graphType: "polyline", color: "#3b82f6", range: [parametricRange.min, parametricRange.max], samples: 500 }]
            }
            break
          default:
            plotConfig.data = [{ fn: parsedEquation, color: "#3b82f6" }]
        }
        functionPlot(plotConfig)
      } catch (err) {
        console.error("Error rendering graph:", err)
        setError("Could not render graph for this equation. Try simplifying or reformatting.")
      } finally {
        setIsLoading(false)
      }
    }
    drawGraph()
    window.addEventListener("resize", drawGraph)
    return () => window.removeEventListener("resize", drawGraph)
  }, [equation, equationType, parametricRange])

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-2 right-2 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-800/70">
                <Info className="h-4 w-4 text-blue-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detected as: {equationType}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}

