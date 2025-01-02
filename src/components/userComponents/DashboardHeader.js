import { Bell, User, LogOut } from "lucide-react"; // Asegúrate de tener los íconos
import { Button } from "../../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/Dropdown-menu";
import { useNavigate } from "react-router-dom"; // Hook para la navegación

export function DashboardHeaderExpo() {

  const username= localStorage.getItem("username")
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleLogout = () => {
    localStorage.clear(); // Limpia todos los datos de localStorage
    navigate("/login"); // Redirige al login
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Título y saludo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-yellow-600">SpracheLearning</h1>
            {/* Bandera de Alemania */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" 
              alt="Germany Flag" 
              className="w-6 h-4" // Puedes ajustar el tamaño como lo desees
            />
            <span className="text-sm text-gray-500">Welcome back, {username}!</span>
          </div>

          {/* Iconos del panel */}
          <div className="flex items-center space-x-4">
            <Button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-600 cursor-pointer hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
