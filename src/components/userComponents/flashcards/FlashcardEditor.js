import { Button } from "../../../ui/Button";
import { Card } from "../../../ui/Card";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { FlashcardList } from "./FlashcardList";
import { AddFlashcardForm } from "./AddFlashcardForm";
import { useEffect } from "react";
import { UnsavedChangesModal } from "../modals/UnsavedChangesModal";

export function FlashcardEditor({ deckId, deckName, onClose }) {
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading]= useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoading(true); // Asegúrate de activar el estado de carga aquí
    fetch(`https://sprachebackend.website/flashcard/getByDeck/${deckId}`, {
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
        setIsLoading(false); // Detén la carga
        setFlashcards(data); // Actualiza el estado con los datos del API
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
        setIsLoading(false); // Detén la carga
      });
  }, [deckId]);




  const handleAddCard = (newCard) => {
    setFlashcards([
      ...flashcards,
      { id: flashcards.length + 1, ...newCard, isNew: true },
    ]);
    setHasUnsavedChanges(true);
  };




  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    handleSaveChanges();
    setIsSaving(false);
    setHasUnsavedChanges(false);
    onClose();
  };



  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      onClose();
    }
  };


  const handleDiscard = () => {
    console.log('Changes discarded');
    onClose();
  };

  const handleDeleteCard = async (id, isNew) => {
    if (isNew) {
      // Si es una flashcard nueva, simplemente la eliminamos del estado local
      setFlashcards(flashcards.filter((card) => card.id !== id));
    } else {
      // Si es una flashcard obtenida de la API, debemos eliminarla del servidor
      const token = localStorage.getItem("authToken");
  
      try {
        const response = await fetch(`https://sprachebackend.website/flashcard/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Error al eliminar la flashcard desde el servidor");
        }
  
        // Eliminamos la flashcard del estado local después de que se haya eliminado en el servidor
        setFlashcards(flashcards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Error eliminando flashcard:", error);
      }
    }
  };
  



  const handleEditCard = async (editedCard) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === editedCard.id ? { ...editedCard, isNew: false } : card
      )
    );

    const token = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(`https://sprachebackend.website/flashcard/edit/${editedCard.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCard), // Envías solo los campos editados
      });
  
      if (!response.ok) {
        throw new Error("Error al editar la flashcard");
      }
  
      console.log("Flashcard actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la flashcard:", error);
    }
  
    
  
  };






  const handleSaveChanges = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("authToken");
    const newFlashcards = flashcards.filter((card) => card.isNew);

    // Crear la estructura esperada por el API
    const flashcardsMap = newFlashcards.reduce((map, card, index) => {
      map[card.front] = {
        reverse: card.reverse,
        audio: card.audio || "",
      };
      return map;
    }, {});

    const payload = {
      deck_id: deckId,
      flashcardsmap: flashcardsMap,
    };

    try {
      const response = await fetch(
        "https://sprachebackend.website/flashcard/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar las flashcards");
      }
       setIsSaving(false)
      
      onClose(); // Cerrar el modal
      setFlashcards(
        flashcards.map((card) =>
          card.isNew ? { ...card, isNew: false } : card
        )
      );
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  };


  const hasNewCards = flashcards.some(card => card.isNew);



  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleBack}>
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
          <FlashcardList
            flashcards={flashcards}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
            isload={isLoading}
          />
          {hasNewCards && (
           <div className="mt-4 flex justify-end">
           <Button
             className="bg-yellow-500 hover:bg-yellow-600"
             onClick={handleSaveChanges}
             disabled={isSaving}
           >
             {isSaving ? (
               <>
                 <div className="flex items-center">
                   <div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin mr-2" />
                   Loading...
                 </div>
               </>
             ) : (
               <>
                 <Save className="h-4 w-4 mr-2" />
                 Save New Flashcards
               </>
             )}
           </Button>
         </div>
         
        )}
      </Card>

      {/* Right side: Add New Flashcard */}
      <Card className="p-6">
        <AddFlashcardForm onAdd={handleAddCard} />
      </Card>
    </div>

    <UnsavedChangesModal 
        isOpen={showUnsavedModal}
        onClose={() => setShowUnsavedModal(false)}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
  </div>
);
}