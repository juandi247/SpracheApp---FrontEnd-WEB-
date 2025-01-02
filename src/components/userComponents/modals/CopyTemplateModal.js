import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { Copy } from "lucide-react";

export function CopyTemplateModal({ isOpen, onClose, template }) {
  const [isLoading, setIsLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyTemplate = async () => {
    const token = localStorage.getItem("authToken");

    setIsLoading(true); // Activar estado de carga
    setCopyMessage(""); // Limpiar cualquier mensaje previo

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/deck/copy/${template.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCopyMessage("Template copied successfully!"); // Mensaje de éxito
      } else {
        setCopyMessage("There was an error copying the template. Please try again."); // Mensaje de error
      }
    } catch (error) {
      setCopyMessage("Network or server error. Please try again."); // Error de red o servidor
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy Template to My Decks</DialogTitle>
          <DialogDescription>
            This will create a new deck with {template.cardCount} flashcards from "{template.name}"
          </DialogDescription>
        </DialogHeader>

        {/* Mostrar mensaje de carga o éxito/error */}
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : copyMessage ? (
          <div className={`text-center mt-4 ${copyMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {copyMessage}
          </div>
        ) : null}

        {/* Mostrar los botones solo si no hay mensaje de éxito */}
        {!copyMessage.includes("success") && (
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={handleCopyTemplate}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-white rounded-full"></span>
                  Processing...
                </span>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to My Decks
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
