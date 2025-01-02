import { useState,useCallback } from "react"; 
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "../../../../ui/Button";
import { Card } from "../../../../ui/Card";
import { useEffect } from "react";
import { FlashcardStatistics } from "./FlashcardStatistics";
import { GameResultsModal } from "./GameResultsModal";
import { SentencePracticeModal } from "./SentencePracticeModal";
import { Sparkles } from "lucide-react";


const FlashcardContent = ({ front, reverse, isFlipped }) => (
  <div className="relative w-full max-w-md h-64 [perspective:1000px] [transform-style:preserve-3d] transition-transform duration-500" 
       style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
    {/* Front of card */}
    <Card className="absolute w-full h-full p-8 flex items-center justify-center text-center [backface-visibility:hidden]">
      <span className="text-2xl font-bold">{front}</span>
    </Card>
    {/* Back of card */}
    <Card className="absolute w-full h-full p-8 flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <span className="text-2xl">{reverse}</span>
    </Card>
  </div>
);







export default function FlashcardGame({ deckId, deckName, onClose }) {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exitX, setExitX] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [FlaschardStats, setFlashcardStats] = useState({
    correct: 0,
    wrong: 0,
    time: 0,
    isFinished: false
  });

  const [results, setResults] = useState([]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Fetch de las flashcards desde el API
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("https://sprachebackend.website/progress/flashcards/${deckId}", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las flashcards");
        }
        return response.json();
      })
      .then((data) => {
        setFlashcards(data); // Guardar las flashcards obtenidas en el estado
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [deckId]);

  useEffect(() => {
    if (!FlaschardStats.isFinished) {
      const timer = setInterval(() => {
        setFlashcardStats(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [FlaschardStats.isFinished]);




  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setExitX(200);
      handleAnswer(true);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      handleAnswer(false);
    }
  };



  const handleClose = () => {
    // Solo mostrar los resultados si se han jugado flashcards
    if (currentIndex > 0) {
      setFlashcardStats((prev) => ({ ...prev, isFinished: true }));
    } else {
      // Si no se han jugado flashcards, cerrar sin enviar resultados
      onClose();
    }
  };
  







  const handleAnswer = (isCorrect) => {
    const currentCard = flashcards[currentIndex];
    setResults((prev) => [
      ...prev,
      {
        word: currentCard.front,
        translation: currentCard.reverse,
        isCorrect,
      },
    ]);
    setFlashcardStats((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
    }));

    // Temporizamos la acción de avanzar o finalizar el juego
    setTimeout(async () => {
      if (currentIndex === flashcards.length - 1) {
        setFlashcardStats((prev) => ({ ...prev, isFinished: true }));
        console.log(results);
        await sendResultsToBackend(); // Llamamos a sendResultsToBackend aquí
      } else {
        nextCard();
      }
    }, 300); // 300ms de debounce
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setExitX(0);
    setFlashcardStats({
      correct: 0,
      wrong: 0,
      time: 0,
      isFinished: false,
    });
    setResults([]);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => prev + 1);
    setFlipped(false);
    setExitX(0);
    x.set(0);
  };

  // Obtener la flashcard actual
  const currentCard = flashcards[currentIndex];



  const sendResultsToBackend = useCallback(async () => {
    if (results.length === 0) {
      return; // Si no hay resultados, no hacer nada
    }
  
    const token = localStorage.getItem("authToken");
    console.log("Enviando resultados...");
  
    const reviews = results.map((result, index) => ({
      idFlashcard: flashcards[index].id, // Asegúrate de que la flashcard tenga un campo 'id' en la respuesta de tu API
      correct: result.isCorrect,
    }));
    console.log(reviews);
  
    try {
      const response = await fetch("https://sprachebackend.website/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviews }),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar los resultados al backend");
      }
      console.log("Resultados enviados correctamente");
    } catch (error) {
      console.error("Error enviando resultados:", error);
    }
  }, [results, flashcards]);
  

  // Enviar resultados cuando el juego termine
  useEffect(() => {
    if (FlaschardStats.isFinished) {
      sendResultsToBackend(); // Llamamos a la función solo cuando el juego ha terminado
    }
  }, [FlaschardStats.isFinished, sendResultsToBackend]);




  // Si no hay flashcards, mostrar un mensaje de carga
  if (!flashcards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading flashcards...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={handleClose} className="absolute top-20 left-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 text-center w-full">
            Playing: {deckName}
          </h2>
        </div>

        <div className="flex flex-col items-center">

            {/* Current Stats */}
            <div className="w-full mb-8">
            <FlashcardStatistics
              time={FlaschardStats.time}
              correct={FlaschardStats.correct}
              wrong={FlaschardStats.wrong}
              total={flashcards.length}
            />
          </div>
          

          <div className="relative w-full max-w-md h-64 [perspective:1000px]">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{
                x,
                rotate,
                opacity,
              }}
              animate={{ x: exitX }}
              onDragEnd={handleDragEnd}
              className="absolute w-full cursor-grab active:cursor-grabbing"
              onClick={() => setFlipped(!flipped)}
            >
              <FlashcardContent
                front={currentCard.front}
                reverse={currentCard.reverse} // Cambiado para reflejar el nombre de la propiedad del API
                isFlipped={flipped}
              />
            </motion.div>
          </div>
        
           
          
          <p className="mt-6 text-sm text-gray-500">
            Click card to flip • {currentIndex + 1} of {flashcards.length}
          </p>

          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
            <div className="flex items-center">
              <X className="h-4 w-4 text-red-500 mr-2" />
              Swipe left if you got it wrong
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Swipe right if you got it right
            </div>
            
          </div>
          
          <div className="mt-9 flex justify-center">
  
<Button
    onClick={() => setShowPractice(true)}
    variant="outline"
    className="flex items-center gap-2 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 shadow-md rounded-lg px-4 py-2 transition-all duration-200"
  >
    <Sparkles className="h-4 w-4" />
    Practice a sentence
  </Button>
</div>
        </div>
      </div>


      <GameResultsModal
        
  isOpen={FlaschardStats.isFinished}
  onClose={() => {
    setFlashcardStats((prev) => ({ ...prev, isFinished: false })); // Resetear al cerrar el modal
    onClose(); // Llamar a onClose original
  }}
  onRestart={handleRestart}
  stats={FlaschardStats}
  results={results}
  total={flashcards.length}
      />

<SentencePracticeModal
        isOpen={showPractice}
        onClose={() => setShowPractice(false)}
        word={currentCard.front}
      />
    </div>
  );
}