import { useState, useEffect } from "react"; 
import { Button } from "../../../../ui/Button";
import { ArrowLeft, Star } from "lucide-react";
import { Card } from "../../../../ui/Card";
import { ArticleQuestion } from "./ArticleQuestion";
import { ArticleGameResults } from "./ArticleGameResults";
import { useNavigate } from "react-router-dom";

export function ArticleGameExpo({ difficulty, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate=useNavigate();
  const [gameStats, setGameStats] = useState({
    score: 0,
    streak: 0,
    maxStreak: 0,
    time: 0,
    isFinished: false
  });
  const [results, setResults] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (difficulty) {
      fetchWordsByDifficulty(difficulty);
    }
  }, [difficulty]);

  const fetchWordsByDifficulty = async (difficulty) => {
    try {
      const token = localStorage.getItem("authToken"); // Obtén el token de auth
      const response = await fetch(`${process.env.REACT_APP_API_URL}/minigame/getwords/${difficulty}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      // Extraer las palabras y artículos
      const wordsAndArticles = data.wordsAndArticles;
      const wordArray = Object.entries(wordsAndArticles).map(([word, article]) => ({
        word,
        article,
      }));

      setWords(wordArray);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const handleGoBack = () => {
    // Si hay resultados, mostrar los resultados antes de ir atrás
    if (results.length > 0) {
      // Aquí, directamente configuramos los resultados para que se muestren
      setGameStats({ ...gameStats, isFinished: true });
    }
    else{
navigate("/dashboard")
    }
    // Volver al historial anterior
   
  };

  const handleAnswer = (selectedArticle) => {
    const currentWord = words[currentIndex];
    
    if (!currentWord) return; // Verifica que currentWord existe antes de acceder a sus propiedades

    const isCorrect = selectedArticle === currentWord.article;

    setResults(prev => [
      ...prev,
      {
        word: currentWord.word,
        selectedArticle,
        correctArticle: currentWord.article,
        isCorrect,
        answerStatus: isCorrect ? 'correct' : 'incorrect'
      }
    ]);
    setGameStats(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 100 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      maxStreak: isCorrect ? Math.max(prev.streak + 1, prev.maxStreak) : prev.maxStreak
    }));

    if (currentIndex === words.length - 1) {
      setGameStats(prev => ({ ...prev, isFinished: true }));
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setGameStats({
      score: 0,
      streak: 0,
      maxStreak: 0,
      time: 0,
      isFinished: false
    });
    setResults([]);
  };

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          <div className="flex items-center space-x-4">
            <Card className="px-4 py-2 bg-yellow-500 text-white">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span className="font-bold">{gameStats.score}</span>
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="text-sm text-gray-600">
                Streak: {gameStats.streak}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Progress bar with glow effect */}
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 shadow-lg"
              style={{ 
                width: `${((currentIndex) / words.length) * 100}%`,
              }}
            />
          </div>

          {currentWord && (
            <ArticleQuestion
              word={currentWord.word}
              onSelectArticle={handleAnswer}
              correctArticle={currentWord.article}
              
            />
          )}

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
           
          </div>
        </div>
      </div>

      <ArticleGameResults
        isOpen={gameStats.isFinished}
        onClose={onClose}
        onRestart={handleRestart}
        stats={gameStats}
        results={results}
      />
    </div>
  );
}
