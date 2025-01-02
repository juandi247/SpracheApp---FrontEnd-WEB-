import { Dialog, DialogContent } from "../../../../ui/Dialog";
import { Button } from "../../../../ui/Button";
import { Card } from "../../../../ui/Card";
import { ScrollArea } from "../../../../ui/Scroll-area";
import { Trophy, Timer, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export function ArticleGameResults({ isOpen, onClose, onRestart, stats, results }) {
  const navigate = useNavigate(); // Inicializa useNavigate
  
  const correctCount = results.filter(r => r.isCorrect).length;
  const accuracy = (correctCount / results.length) * 100;

  const handleBackToGames = () => {
    navigate('/dashboard'); // Redirige a la URL '/dashboard'
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Game Complete! 🎉</h2>
            <p className="text-yellow-600 text-lg font-semibold mt-2">
              Score: {stats.score}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Accuracy</div>
              <div className="font-bold text-gray-900">{accuracy.toFixed(1)}%</div>
            </Card>
            
            <Card className="p-4 text-center">
              <Timer className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Time</div>
              <div className="font-bold text-gray-900">
                {Math.floor(stats.time / 60)}:{(stats.time % 60).toString().padStart(2, '0')}
              </div>
            </Card>

            <Card className="p-4 text-center">
              <Zap className="h-5 w-5 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Max Streak</div>
              <div className="font-bold text-gray-900">{stats.maxStreak}</div>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Results</h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <span className="font-medium">
                      {result.correctArticle} {result.word}
                    </span>
                    <span className={`text-sm ${
                      result.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.selectedArticle}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleBackToGames}>
              Back to Games
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={onRestart}>
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
