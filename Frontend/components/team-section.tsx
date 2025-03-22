import { Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const team = [
 {
    name: "Shivansh Singh",
    role: "Lead AI Researcher",
    bio: "Specializes in computer vision and neural networks with 2+ years of experience in AI research.",
    image: "https://res.cloudinary.com/dfqgwph6t/image/upload/v1742645315/WhatsApp_Image_2025-03-22_at_17.32.57_msqo9z.jpg",
  },
  {
    name: "Sarthak Raj",
    role: "ML Engineer",
    bio: "Expert in machine learning model optimization and deployment with a focus on OCR technologies.",
    image: "https://res.cloudinary.com/dfqgwph6t/image/upload/v1742645487/WhatsApp_Image_2025-03-22_at_17.40.43_bcpaba.jpg",
  },
  {
    name: "Saurabh Kumar(Kuntal)",
    role: "Full Stack Developer",
    bio: "Experienced in building scalable web applications and integrating AI models into user-friendly interfaces.",
    image: "https://res.cloudinary.com/dfqgwph6t/image/upload/v1742645956/WhatsApp_Image_2025-03-22_at_17.44.55_hj3jo5.jpg",
  },
  {
    name: "Prathamesh Dhote ",
    role: "Mathematics Expert",
    bio: "Applied Mathematics with expertise in computational algorithms for solving complex equations.",
    image: "https://res.cloudinary.com/dfqgwph6t/image/upload/v1742645390/WhatsApp_Image_2025-03-22_at_17.31.57_nskk4u.jpg",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-background to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the talented individuals behind our AI-powered handwritten math recognition technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-900/50 transition-colors group"
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-800 group-hover:border-blue-600 transition-colors">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Join Our Team</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals passionate about AI, mathematics, and creating innovative
            solutions. Check out our open positions or reach out to us.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}

