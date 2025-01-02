import React from 'react';
import { Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Gamepad2 } from "lucide-react"; // Asegúrate de tener este ícono o cámbialo si prefieres otro
import { useNavigate } from 'react-router-dom';



export function HeroExported() {
  const navigate=useNavigate();
  const gotoRegister = () => {
    navigate('/register');  // Redirigir a la página de login
  };



  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 to-white" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Master German with
          <span className="text-yellow-500"> Smart Learning </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Accelerate your German language journey through flashcards, AI and spaced repetition. 
          Learn smarter, not harder.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button onClick={gotoRegister}
         className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg font-semibold rounded-lg flex items-center gap-2">
    Start Learning Free
    <Sparkles className="h-6 w-6" /> {/* Ícono del mismo tamaño */}
  </Button>
  
  <Button 
  onClick={gotoRegister}
    variant="outline" 
    className="flex items-center gap-2 px-8 py-6 text-lg font-semibold text-yellow-600 border-2 border-yellow-500 rounded-lg hover:bg-yellow-100 transition-colors"
  >
    <Gamepad2 className="h-6 w-6 text-yellow-500" /> {/* Ícono del mismo tamaño */}
    Try Mini Games
  </Button>
        </div>
      </div>
    </div>
  );
}
