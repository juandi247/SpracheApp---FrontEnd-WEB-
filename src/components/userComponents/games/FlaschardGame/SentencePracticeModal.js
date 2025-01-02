import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/Dialog";
import { Button } from "../../../../ui/Button";
import { Input } from "../../../../ui/Input";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

export function SentencePracticeModal({ isOpen, onClose, word }) {
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState(null);

  const token= localStorage.getItem("authToken")
  const handleCheck = async () => {
    try {
        const response = await fetch("https://sprachebackend.website/ai/correct-sentence", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pasa el token de autenticación
          },
          body: JSON.stringify({ sentence }), // Enviar la frase como body
        });
    
        // Verificar si la respuesta es exitosa (código de estado 2xx)
        if (!response.ok) {
          throw new Error(`Error fetching data from API: ${response.statusText}`);
        }
    
        // Leer el cuerpo de la respuesta como texto
        const data = await response.text(); 
    
    
        setFeedback(data); // La respuesta es un texto, no un JSON, así que simplemente lo asignamos
      } catch (error) {
        console.error("Error:", error);
        setFeedback("You surpassed the AI functionalities use. Please try again later.");
      }
  };

  const handleReset = () => {
    setSentence("");
    setFeedback(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        handleReset();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Practice with AI: {word}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Write a sentence using the flashcard "{word}":
            </p>
            <Input
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Enter your sentence..."
              className="w-full"
            />
          </div>

          {!feedback ? (
            <Button
              onClick={handleCheck}
              className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 px-4 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!sentence}
            >
              <Check className="h-5 w-5 mr-2" />
              <span>Check Sentence</span>
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">{feedback}</p>
              </div>
              <Button onClick={handleReset} className="w-full" variant="outline">
                Try Another Sentence
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
