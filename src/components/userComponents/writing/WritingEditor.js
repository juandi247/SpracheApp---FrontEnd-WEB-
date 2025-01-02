import { useState, useEffect } from "react";
import { Card } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { ArrowLeft, Clock, Send } from "lucide-react";

export function WritingEditor({ level, topic, instructions, onBack, onSubmit }) {
  const [text, setText] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    onSubmit({ text, timeSpent, wordCount });
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Topics
      </Button>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{topic}</h2>
            <p className="text-gray-500 mt-1">Level {level}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-5 w-5" />
            <span className="font-mono">
              {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700">{instructions}</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="Start writing here..."
        />

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </Card>
    </div>
  );
}
