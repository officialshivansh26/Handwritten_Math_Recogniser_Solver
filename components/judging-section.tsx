import { CheckCircle, Zap, Lightbulb, Users, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const criteria = [
  {
    icon: CheckCircle,
    title: "Accuracy",
    description: "Precision in recognizing and solving handwritten mathematical expressions.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Fast processing time and optimal resource utilization.",
    color: "blue",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Novel approaches to mathematical recognition and solving challenges.",
    color: "purple",
  },
  {
    icon: Users,
    title: "User Experience",
    description: "Intuitive interface and helpful presentation of results.",
    color: "orange",
  },
  {
    icon: Code,
    title: "Technical Implementation",
    description: "Clean, maintainable code and robust architecture.",
    color: "cyan",
  },
]

export function JudgingSection() {
  return (
    <section id="judging" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Project Deliverables</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our Project Delivers these parameters with output giving
            math recognised image and solved values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {criteria.map((criterion, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-900/50 transition-colors group"
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-${criterion.color}-900/20 flex items-center justify-center mb-4 group-hover:bg-${criterion.color}-900/30 transition-colors`}
                >
                  <criterion.icon className={`h-8 w-8 text-${criterion.color}-400`} />
                </div>
                <h3 className="text-lg font-medium mb-2">{criterion.title}</h3>
                <p className="text-sm text-gray-400">{criterion.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}

