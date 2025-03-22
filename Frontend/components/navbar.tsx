"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold gradient-text">MathSolveAI</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="#demo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Solver
              </Link>
              <Link
                href="#features"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                How It Works
              </Link>
              <Link href="#metrics" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Metrics
              </Link>
              <Link href="#team" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Team
              </Link>
              <Button variant="outline" size="sm" className="ml-4">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <ModeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#demo"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Solver
            </Link>
            <Link
              href="#features"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#metrics"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Metrics
            </Link>
            <Link
              href="#team"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
 <Button variant="outline" size="sm" className="w-full mt-4">
 <Github className="h-4 w-4 mr-2" />
  <Link 
    href="https://github.com/officialshivansh26/Handwritten_Math_Recogniser_Solver.git" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center"
  >
    
    GitHub
  </Link>
</Button>



          </div>
        </div>
      )}
    </nav>
  )
}

