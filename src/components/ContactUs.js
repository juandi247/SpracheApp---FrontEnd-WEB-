import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/Button";

export function Contact() {
  return (
    <div id="contact" className="relative bg-yellow-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Título y descripción */}
        <div className="mx-auto max-w-2xl text-center"> {/* Centrado de texto */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions? We're here to help you on your German learning journey.
          </p>
        </div>

        {/* Información de contacto */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {[ 
            { icon: Mail, text: "juand.diaza@gmail.com" },
            { icon: Phone, text: "+57 3014444608" },
            { icon: MapPin, text: "Berlin, Germany" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-x-4 rounded-2xl bg-white p-6 shadow-xl hover:shadow-2xl transition-shadow"> {/* Centrado en cada card */}
              <Icon className="h-8 w-8 text-yellow-500" />
              <div className="text-base leading-7 text-gray-700">{text}</div>
            </div>
          ))}
        </div>

        {/* Botón de contacto */}
        <div className="mt-16 flex justify-center">
          <Button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-lg">
            Send us a message
          </Button>
        </div>
      </div>
    </div>
  );
}
