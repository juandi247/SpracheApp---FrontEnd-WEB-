import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/Dialog"; 
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/Select";
import { GenerateDeckPreview } from "./GenerateDeckPreview";
import { useState } from "react";
import { useEffect } from "react";

export function GenerateAIDeckModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        topic: "",
        typeOfContent: "",
        reverseLanguage: "",
        numberOfFlashcards: "",
    });

    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (id, value) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };




    const isFormValid = () => {
      // Validamos que todos los campos estén completos
      const { name, description, topic, typeOfContent, reverseLanguage, numberOfFlashcards } = formData;
      const isNumberOfFlashcardsValid = numberOfFlashcards >= 5 && numberOfFlashcards <= 30;
      return (
          name &&
          description &&
          topic &&
          typeOfContent &&
          reverseLanguage &&
          numberOfFlashcards &&
          isNumberOfFlashcardsValid
      );
  };






    const handleGenerate = async () => {
      if (!isFormValid()) {
        alert("Please fill in all fields correctly.");
        return;
    }
      setLoading(true);

      const body= JSON.stringify({
        reverseLanguage: formData.reverseLanguage,
        topic: formData.topic,
        numberOfFlashcards: formData.numberOfFlashcards,
        typeOfContent: formData.typeOfContent,
        level: formData.level,
    })
      setGeneratedFlashcards([]);
      const authToken = localStorage.getItem("authToken");
      try {
          const response = await fetch("https://sprachebackend.website/ai", {        
              method: "POST",
              headers: {
                 'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
              },
              body: body
          });
  
          if (response.ok) {
              const data = await response.json();
              setGeneratedFlashcards(data);
    
              setShowPreview(true);
              
          } else {
           
              console.error("You surpased the 3 uses of ai response:", response.status, response.statusText);
              setErrorMessage(`You surpased the 3 uses of ai functionalities. Come back later`);
              
          }
      } catch (error) {
        
          console.error("Error generating flashcards:", error);
          
          setErrorMessage(`You surpased the 3 uses of ai functionalities. Come back later`);
        } finally {
          setLoading(false);
      }
  };
  




    const handleConfirmGeneration = () => {
        setShowPreview(false);
        setIsOpen(false);
        // Aquí puedes manejar la creación real del mazo
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: "",
                description: "",
                topic: "",
                typeOfContent: "",
                reverseLanguage: "",
                numberOfFlashcards: "",
            });
            setGeneratedFlashcards([]);
            setShowPreview(false);
        }
    }, [isOpen]);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Sparkles className="h-5 w-5 mr-2" />
                        Generate with AI
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate Deck with AI</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Deck Name</Label>
                            <Input id="name" placeholder="Enter deck name" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Enter deck description" value={formData.description} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="topic">Theme/Topic</Label>
                            <Input id="topic" placeholder="e.g., Travel, Business, Food..." value={formData.topic} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Content Type</Label>
                            <Select onValueChange={(value) => handleSelectChange("typeOfContent", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select content type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="words">Words</SelectItem>
                                    <SelectItem value="phrases">Phrases</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Translation Language</Label>
                            <Select onValueChange={(value) => handleSelectChange("reverseLanguage", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="numberOfFlashcards">Number of Words/Phrases</Label>
                            <Input 
                                id="numberOfFlashcards" 
                                type="number" 
                                min="5" 
                                max="30" 
                                placeholder="Enter number (5-30)"
                                value={formData.numberOfFlashcards}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                            onClick={handleGenerate}
                            disabled={loading || !isFormValid()}

                        >
                            {loading ? "Loading..." : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Generate Preview
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

              {/* Modal de Error */}
        {errorMessage && (
            <Dialog open={!!errorMessage} onOpenChange={() => setErrorMessage('')}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Error</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>{errorMessage}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setErrorMessage('')}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )}


            <GenerateDeckPreview
                isOpen={showPreview}
                flashcards={generatedFlashcards} // Aquí pasas las flashcards generadas
                name={formData.name}
                description={formData.description}
                onClose={() => setShowPreview(false)}
                onConfirm={handleConfirmGeneration}
            />
        </>
    );
}





















