import { useState ,useEffect} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/Table";
import { Edit2, Trash2, X } from "lucide-react";
import { ScrollArea } from "../../../ui/Scroll-area";
import { toast } from "react-hot-toast"; 

export function GenerateDeckPreview({ isOpen, onClose, onConfirm, flashcards, name, description}) {
 const [loading, setLoading] = useState(false); // Estado para el cargador

  const [cards, setCards] = useState(flashcards || []);
  const [editingCard, setEditingCard] = useState(null);
   // Este useEffect actualizará el estado `cards` cuando `flashcards` cambie
   useEffect(() => {
    setCards(flashcards || []); // Actualiza el estado `cards` cuando `flashcards` cambien
}, [flashcards]); // Solo se ejecuta cuando `flashcards` cambia




  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleSaveEdit = (updatedCard) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
  };






  const handleConfirm = async () => {
    setLoading(true); // Activar el cargador

    const token = localStorage.getItem("authToken") // Reemplaza con el token de autenticación adecuado

    const formattedFlashcards = cards.reduce((acc, card) => {
      acc[card.front] = { reverse: card.back, audio: card.audio || "string" };
      return acc;
    }, {});

    const payload = {
      name,
      description,
      flashcardsmap: formattedFlashcards,
    };

    try {
      const response = await fetch(`https://sprachebackend.website/ai/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("hhhh")
      console.log(JSON.stringify(payload))
      console.log(payload + "hashah")

      if (!response.ok) {
        throw new Error("Failed to create deck");
      }
      
      toast.success("Deck created succesfully");
      onConfirm(cards); // Notifica que las flashcards se han confirmado

      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el deck:", error);
      console.log(JSON.stringify(payload))
      console.log(payload)
      toast.error("Error creating deck");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview Deck: {name}</DialogTitle>
          <p className="text-sm text-gray-500">{description}</p>
        </DialogHeader>

        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Front</TableHead>
                <TableHead>Back</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card, index) => (
                <TableRow key={index}>
                  <TableCell>{card.front}</TableCell>
                  <TableCell>{card.back}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(card)}
                      >
                        <Edit2 className="h-4 w-4 text-yellow-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(card.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        {editingCard && (
          <div className="p-4 border rounded-lg bg-gray-50 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Edit Flashcard</h3>
              <Button variant="ghost" size="icon" onClick={() => setEditingCard(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Front Side</Label>
                <Input
                  value={editingCard.front}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      front: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Back Side</Label>
                <Input
                  value={editingCard.back}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      back: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                onClick={() => handleSaveEdit(editingCard)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={handleConfirm}
            disabled={loading} // Desactivar botón mientras se está cargando
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></div>
            ) : (
              "Create Deck"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
