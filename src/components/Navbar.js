import React from 'react';
import { BookOpen, Menu } from "lucide-react";
import { Button } from "../ui/Button";  // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom';  // Importar Link y useNavigate


export function NavarbarExported() {

  const navigate=useNavigate();


  const handleLoginClick = () => {
    navigate('/login', { replace: true });  // Redirigir a la página de login
  };

  const handleRegisterClick = () => {
    navigate('/register');  // Redirigir a la página de registro
  };
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">SpracheLearning</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-yellow-600">Features</a>
            <a href="#about" className="text-gray-700 hover:text-yellow-600">About Us</a>
            <a href="#contact" className="text-gray-700 hover:text-yellow-600">Contact</a>
             <Button
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleRegisterClick}
            >
              Register
            </Button>
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
}
