import { Gamepad } from "lucide-react";
import { Card } from "../../ui/Card"; // Componente de tarjeta
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: 1,
    name: "Simple Articles - Easy",
    description: "Practice identifying the correct article ('der', 'die', 'das') with basic German words.",
    difficulty: "Easy",
    timeEstimate: "10 min",
    type: "articles",
    gameDifficulty: "easy"
  },
  {
    id: 2,
    name: "Challenging Articles - Medium",
    description: "Test your knowledge of German articles with more complex vocabulary and sentences.",
    difficulty: "Medium",
    timeEstimate: "10 min",
    type: "articles",
    gameDifficulty: "medium"
  },
  {
    id: 3,
    name: "Advanced Articles - Hard",
    description: "Master German articles ('der', 'die', 'das') with a wide range of complex vocabulary and sentence structures.",
    difficulty: "Hard",
    timeEstimate: "10 min",
    type: "articles",
      gameDifficulty: "hard"
  },
];

// Función para determinar el color según la dificultad
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600"; // Verde para fácil
    case "Medium":
      return "text-yellow-600"; // Amarillo para medio
    case "Hard":
      return "text-red-600"; // Rojo para difícil
    default:
      return "text-gray-500"; // Gris por defecto
  }
};


export function MiniGamesExpo() {
  const navigate = useNavigate(); // Para navegar a la ruta con el parámetro de dificultad
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame) {
    // Aquí estamos redirigiendo al usuario a la ruta dinámica
    navigate(`/articlegame/${selectedGame.difficulty}`);
    setSelectedGame(null); // Limpiar el estado después de la navegación
    return null; // Evitar el renderizado de la vista actual mientras redirigimos
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mini Games</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedGame({
              difficulty: game.gameDifficulty // Establecer dificultad
            })}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Gamepad className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                  <p className="text-sm text-gray-500">{game.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className={`font-medium ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</span>
                <span className="text-gray-500">{game.timeEstimate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}