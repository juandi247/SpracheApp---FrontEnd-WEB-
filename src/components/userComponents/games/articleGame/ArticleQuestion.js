import { Card } from "../../../../ui/Card";
import { Button } from "../../../../ui/Button";
import { useState } from "react";
import { motion } from "framer-motion";

export function ArticleQuestion({ word, correctArticle, onSelectArticle, }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);


  const handleArticleSelect = (article) => {
    const correct = article === correctArticle;
    setSelectedArticle(article);
    setIsCorrect(correct);
    
    // Add a small delay for visual feedback before moving to next word
    setTimeout(() => {
      onSelectArticle(article);
      setSelectedArticle(null);
      setIsCorrect(null);
    }, 500);
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="space-y-6">
        <div className="text-center">
        <motion.div 
            className={`text-2xl font-bold mb-2 p-2 rounded-lg ${
              selectedArticle && isCorrect !== null
                ? isCorrect 
                  ? 'bg-green-100'
                  : 'bg-red-100'
                : ''
            }`}
            animate={{
              scale: selectedArticle ? 1.05 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-400 mr-2">_____</span>
            {word}
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {["der", "die", "das"].map((article) => (
            <Button
              key={article}
              onClick={() => handleArticleSelect(article)}
              className={`
                relative overflow-hidden
                ${selectedArticle === article 
                  ? (isCorrect 
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600')
                  : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-yellow-500'
                }
                transition-all duration-300
              `}
              variant="outline"
              disabled={selectedArticle !== null}
            >
              {article}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
