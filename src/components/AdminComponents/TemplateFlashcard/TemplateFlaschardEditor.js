import { Button } from "../../../ui/Button";
import { Card } from "../../../ui/Card";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { TemplateFlashcardList } from "./TemplateFlashcardList";
import { AddTemplateFlashcardForm } from "./AddTemplateFlashcardForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TemplateFlashcardEditor({ deckId, deckName, onClose }) {
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir con React Router

  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.REACT_APP_API_URL}/admin/getByTemplate/${deckId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las flashcards");
        }
        return response.json();
      })
      .then((data) => {
        setFlashcards(data); // Actualiza el estado con los datos del API
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [deckId]);




//CAMBIAR ACA LA PARTE DEL API PARA MODIFICAR; PERO QUEDA IGUAL AL DEL USER





  const handleAddCard = (newCard) => {
    setFlashcards([
      ...flashcards,
      { id: flashcards.length + 1, ...newCard, isNew: true },
    ]);
  };




  const handleDeleteCard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };




  const handleEditCard = (editedCard) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === editedCard.id ? { ...editedCard, isNew: false } : card
      )
    );
  };




  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");
    const newFlashcards = flashcards.filter((card) => card.isNew);
  
    // Crear la estructura esperada por el API
    const flashcardsMap = newFlashcards.reduce((map, card, index) => {
      map[card.front] = {
        reverse: card.reverse,
        audio: card.audio || "", // Si no hay audio, se pone un string vacío
      };
      return map;
    }, {});
  
    const payload = {
      id_template: deckId,
      template_flashcards: flashcardsMap, // Corregir el nombre de la propiedad
    };
  
    console.log(payload); // Verifica si la estructura es la correcta
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/flashcard/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Verifica si la respuesta tiene un estado ok
      if (!response.ok) {
        throw new Error("Error al guardar las flashcards: " + response.statusText);
      }
  
      // Intenta leer la respuesta como JSON, si es posible
      const data = await response.json().catch(() => null);
  
     
        console.log("Flashcards guardadas con éxito:", data);
        navigate("/admin"); // Redirige después de guardar
        setFlashcards(
          flashcards.map((card) =>
            card.isNew ? { ...card, isNew: false } : card
          )
        );
      
    } catch (error) {
      console.error("Error saving flashcards:", error.message);
    }
  };
  
  

  const hasNewCards = flashcards.some(card => card.isNew);



  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Decks
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 ml-4">
          Editing: {deckName}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Current Flashcards */}
        <Card className="p-6">
          <TemplateFlashcardList
            flashcards={flashcards}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
          />
          {hasNewCards && (
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                Save New flashcards
              </Button>
            </div>
          )}
        </Card>

        {/* Right side: Add New Flashcard */}
        <Card className="p-6">
          <AddTemplateFlashcardForm onAdd={handleAddCard} />
        </Card>
      </div>
    </div>
  );
}