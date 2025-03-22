"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartLineSeries,
  ChartYAxis,
  ChartXAxis,
  ChartBarSeries,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for charts
const accuracyData = [
  { month: "Jan", accuracy: 91.2 },
  { month: "Feb", accuracy: 92.5 },
  { month: "Mar", accuracy: 93.1 },
  { month: "Apr", accuracy: 93.8 },
  { month: "May", accuracy: 94.2 },
  { month: "Jun", accuracy: 94.7 },
  { month: "Jul", accuracy: 95.3 },
  { month: "Aug", accuracy: 95.8 },
  { month: "Sep", accuracy: 96.2 },
  { month: "Oct", accuracy: 96.5 },
  { month: "Nov", accuracy: 96.8 },
  { month: "Dec", accuracy: 97.1 },
]

const performanceData = [
  { category: "Arithmetic", recognition: 98.5, solution: 99.2 },
  { category: "Algebra", recognition: 96.8, solution: 97.5 },
  { category: "Calculus", recognition: 94.2, solution: 95.1 },
  { category: "Trigonometry", recognition: 95.3, solution: 96.0 },
  { category: "Fractions", recognition: 93.7, solution: 94.5 },
  { category: "Exponents", recognition: 95.9, solution: 96.8 },
]

const processingTimeData = [
  { complexity: "Simple", time: 0.3 },
  { complexity: "Medium", time: 0.7 },
  { complexity: "Complex", time: 1.2 },
  { complexity: "Very Complex", time: 1.8 },
]

export function MetricsSection() {
  return (
    <section id="metrics" className="py-20 bg-gradient-to-b from-gray-900 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Performance Metrics</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI model achieves industry-leading accuracy and performance across various mathematical expressions and
            complexity levels.
          </p>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-400">99%</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Recognition Accuracy</h3>
              <p className="text-sm text-gray-400">Overall accuracy in recognizing handwritten mathematical symbols.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-400">99%</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Solution Accuracy</h3>
              <p className="text-sm text-gray-400">Accuracy in providing correct solutions to recognized equations.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-purple-400">8s</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Average Processing Time</h3>
              <p className="text-sm text-gray-400">Average time to recognize and solve a mathematical expression.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

