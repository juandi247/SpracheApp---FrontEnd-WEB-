import { Brain, Clock, Gamepad, SparkleIcon } from 'lucide-react';
import { Card } from '../ui/Card'; // Asegúrate de que la ruta sea la correcta

const features = [
  {
    name: "Spaced Repetition",
    description: "Master German vocabulary through scientifically proven learning methods that optimize your memory retention.",
    icon: Brain,
  },
  {
    name: "AI Functionalities",
    description: "Create personalized decks and practice your flaschards using AI.",
    icon: SparkleIcon,
  },
  {
    name: "Mini Games",
    description: "Enjoy interactive language games designed to make learning German fun and engaging.",
    icon: Gamepad,
  },
  {
    name: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and personalized insights.",
    icon: Clock,
  },
];

export function FeaturesExport() {
  return (
    <div id="features" className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Learn German Effectively
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive learning system combines multiple techniques to help you master German
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.name} className="relative overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                    <feature.icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
