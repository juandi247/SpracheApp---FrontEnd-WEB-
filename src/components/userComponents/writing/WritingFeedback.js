import { Card } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "../../../ui/Alert";
import { RefreshCw, Clock, FileText, Loader2, AlertCircle } from "lucide-react";



export function WritingFeedback({ submission, onTryAgain,level,topic }) {
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const getFeedback = async () => {
      const token = localStorage.getItem("authToken");
      const text=submission.text

      
      const body= JSON.stringify({
        level,
        topic,
        text
        // Cambié "submission" a "text" para que coincida con el cuerpo de la API
      })


      try {
        const response = await fetch(`https://sprachebackend.website/ai/correct-text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: body
        });
    
        if (!response.ok) {
          setError('There was en error generating your feedback.');
        }
    
        setFeedback(response.text()); // Assuming response is JSON
      } catch (error) {
        setError('There was en error generating your feedback.');
      
      } finally {
        setIsLoading(false);
      }
    };

    getFeedback();
  }, [submission, level, topic]); 

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Writing Feedback</h2>
        <Button
          onClick={onTryAgain}
          variant="outline"
          className="border-yellow-500 text-yellow-600"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Another Topic
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-50 text-red-900 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-900">Time Spent</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {Math.floor(submission.timeSpent / 60)}:
              {(submission.timeSpent % 60).toString().padStart(2, '0')}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Word Count</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {submission.wordCount} words
            </p>
          </div>
          
        
        </div>

        {/* Your Text */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Your Text</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{submission.text}</p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Feedback</h3>
          <div className="bg-white border rounded-lg p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                <span className="ml-3 text-gray-500">Analyzing your text...</span>
              </div>
            ) : feedback ? (
              <div className="prose prose-yellow max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{feedback}</p>
              </div>
            ) : error ? (
              <p className="text-center text-gray-500">
                Unable to load feedback. Please try again.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
