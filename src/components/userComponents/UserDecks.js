import { Edit3, Play, Search, Trash2, Book, BarChart2, Brain } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card"; // Componente de tarjeta
import { Input } from "../../ui/Input";
import { AddDeckModalExpo } from "./modals/AddDeckModal";

import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Asegúrate de incluir el CSS
import { GenerateAIDeckModal } from "./modals/GenerateAIDeckModal";
import { useNavigate } from "react-router-dom";

export function UserDecksExpo({onEditDeck,onPlayDeck}) {
  const [userDecks, setUserDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [deckToDelete, setDeckToDelete] = useState(null);
const [isDeleting, setIsDeleting] = useState(false); // Estado para gestionar la carga}
const navigate = useNavigate(); // Hook para redirigir con React Router
// Cálculo de estadísticas generales
const totalCards = userDecks.reduce((sum, deck) => sum + (deck.totalWords || 0), 0);
const totalToReview = userDecks.reduce((sum, deck) => sum + (deck.toReview || 0), 0);
const totalLearned = userDecks.reduce((sum, deck) => sum + (deck.learnedWords || 0), 0);

const [searchTerm, setSearchTerm] = useState("");



const filteredDecks = userDecks.filter(deck => 
  deck.name.toLowerCase().includes(searchTerm.toLowerCase())
);



const handleDeleteDeck = () => {
  const token = localStorage.getItem("authToken");

  if (token && deckToDelete) {
    setIsDeleting(true); // Activa el estado de carga
    fetch("https://sprachebackend.website/deck/delete/${deckToDelete}", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          setUserDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckToDelete));
        } else {
          console.error("Error deleting deck:", response.statusText);
        }
      })
      .catch(error => console.error("Error deleting deck:", error))
      .finally(() => {
        setIsDeleting(false); // Desactiva el estado de carga
        setOpenDeleteModal(false); // Cierra el modal
      });
  }
};







const addDeck = (newDeck) => {
  setUserDecks(prevDecks => [...prevDecks, newDeck]); // Agrega el nuevo mazo al estado
};







useEffect(() => {
  const fetchDecks = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch("https://sprachebackend.website/deck/getall", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((decks) => {
          setUserDecks(decks);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching decks:", error);
          setLoading(false);
        });
    }
  };

  fetchDecks();
}, [navigate]);

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center space-x-4">

          <div className="p-3 bg-blue-100 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart2 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">To Review</p>
              <p className="text-2xl font-bold text-orange-600">{totalToReview}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Book className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Learned</p>
              <p className="text-2xl font-bold text-green-600">{totalLearned}</p>
            </div>
          </div>
        </Card>
      </div>

    {/* Search and Create */}
    <div className="flex justify-between items-center gap-4">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    <Input 
            placeholder="Search your decks..." 
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

  <div className="flex items-center gap-2"> {/* Asegura que los botones estén alineados correctamente */}
    <AddDeckModalExpo addDeck={addDeck} />  {/* El botón normal de Add Deck */}
    <GenerateAIDeckModal  addDeck={addDeck}/> {/* El botón para Add AI Deck */}
  </div>
</div>


      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton Loader mientras cargan los datos
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow"
              >
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="50%" />
                <Skeleton height={40} width="80%" />
              </div>
            ))}
          </div>
        ) : (
          filteredDecks.map((deck) => (
            <Card key={deck.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{deck.name}</h3>
                    <p className="text-sm text-gray-500">{deck.description || "No description"}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => onEditDeck(deck)}>
                    <Edit3 className="h-4 w-4 text-yellow-600" />
                  </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-50"
                      onClick={() => {
                        setDeckToDelete(deck.id); // Establece el deck a eliminar
                        setOpenDeleteModal(true);  // Abre el modal
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Total: {deck.totalWords || 0}</span>
                  <span>To Review: {deck.toReview }</span>
                  <span>Learned: {deck.learnedWords || 0 }</span>
                </div>

                <div className="flex justify-center">
                  
                  <Button className="w-auto max-w-xs bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-white"
                
                  onClick={() => onPlayDeck(deck)}
                   >
                    <Play className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>



   {/* Modal de Confirmación de Eliminación */}
   {openDeleteModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
          <p className="text-sm text-gray-500">Are you sure you want to delete this deck?</p>

          {isDeleting ? (
            <p className="text-center text-gray-600 mt-4">Deleting...</p> // Texto de carga
          ) : (
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setOpenDeleteModal(false)} // Cerrar el modal
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDeck} // Eliminar deck
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);
}
