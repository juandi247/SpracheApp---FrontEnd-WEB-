import { BookOpen, Brain, Users } from "lucide-react";

export function WelcomeHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-8">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          Willkommen zurück! 👋
        </h1>
        <p className="text-yellow-50 max-w-2xl mb-6">
          Learning German opens doors to rich culture, vibrant communities, and new opportunities. 
          We're here to make your journey engaging and effective.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-yellow-900">
          <div className="bg-yellow-50/90 rounded-lg p-4">
            <BookOpen className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">Structured Learning</h3>
            <p className="text-sm">Progress through a different variety of methods</p>
          </div>
          
          <div className="bg-yellow-50/90 rounded-lg p-4">
            <Brain className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">Smart Practice </h3>
            <p className="text-sm">Reinforce learning with spaced repetition</p>
          </div>
          
          <div className="bg-yellow-50/90 rounded-lg p-4">
            <Users className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">AI Functionalities</h3>
            <p className="text-sm">Learn together with brand new incorporated AI</p>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="80" cy="20" r="15" className="fill-current" />
          <circle cx="70" cy="70" r="20" className="fill-current" />
          <circle cx="30" cy="50" r="10" className="fill-current" />
        </svg>
      </div>
    </div>
  );
}