import { Zap, Sparkles, Layers, Cpu, LineChart, Upload, Code, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Real-time Recognition",
    description: "Instantly recognize handwritten mathematical expressions with high accuracy.",
  },
  {
    icon: Sparkles,
    title: "Step-by-step Solutions",
    description: "Get detailed step-by-step solutions to understand the solving process.",
  },
  {
    icon: Layers,
    title: "Multi-level Complexity",
    description: "Handles simple arithmetic to complex calculus and algebraic expressions.",
  },
  {
    icon: Cpu,
    title: "Advanced AI Model",
    description: "Powered by state-of-the-art Large Language Models trained on diverse datasets.",
  },
  {
    icon: LineChart,
    title: "High Accuracy",
    description: "99%+ recognition accuracy even with messy or stylized handwriting.",
  },
  {
    icon: Upload,
    title: "Multiple Input Methods",
    description: "Upload images or draw equations directly in the browser.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "Integrate our math recognition capabilities into your own applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works seamlessly across desktop and mobile devices.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Key Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform offers a comprehensive set of features to recognize and solve handwritten
            mathematical expressions with precision and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-900/50 transition-colors group"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-900/20 flex items-center justify-center mb-4 group-hover:bg-blue-900/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

