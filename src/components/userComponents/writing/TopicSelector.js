import { Card } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Alert, AlertDescription } from "../../../ui/Alert";
import { ArrowLeft, Loader2, Shuffle, AlertCircle } from "lucide-react";
import { useState } from "react";

const sampleTopics = {
  "A1": [
    "Meine Familie",
    "Mein Tagesablauf",
    "Mein Lieblingsessen",
    "Mein Zuhause",
    "Meine Schule",
    "Mein Lieblingsbuch",
    "Meine Freunde",
    "Mein Haustier",
    "Meine Stadt",
    "Mein Lieblingsfilm",
    "Mein Hobby",
    "Mein Wochenende",
    "Mein Lieblingssport"
  ],
  "A2": [
    "Mein letztes Wochenende",
    "Meine Hobbys",
    "Mein bester Freund / Meine beste Freundin",
    "Meine Lieblingsjahreszeit",
    "Urlaub und Reisen",
    "Einkaufen gehen",
    "Gesundheit und Fitness",
    "Mein Alltag",
    "Berufe und Arbeit",
    "Gesellschaft und Kultur",
    "Familienfeiern",
    "Reiseziele",
    "Verkehrsmittel"
  ],
  "B1": [
    "Mein Traumberuf",
    "Technologie im Alltag",
    "Umweltschutz",
    "Soziale Medien",
    "Reiseerfahrungen",
    "Freizeitaktivitäten",
    "Ernährung und Gesundheit",
    "Bildungssystem - SchulSystem",
    "Politik und Gesellschaft",
    "Wissenschaft und Forschung",
    "Kunst und Kultur",
    "Berühmte Persönlichkeiten",
    "Freiwilligenarbeit und Ehrenamt"
  ],
  "B2": [
    "Arbeiten im Ausland",
    "Das Bildungssystem",
    "Kulturelle Unterschiede",
    "Der Einfluss von Technologie",
    "Die Balance zwischen Arbeit und Leben",
    "Politische Themen",
    "Gesundheitsvorsorge",
    "Zukunft der Arbeit"
  ],
  "C1": [
    "Wirtschaftliche Herausforderungen",
    "Lösungen für den Klimawandel",
    "Digitale Privatsphäre",
    "Kulturelle Integration",
    "Forschung und Innovation",
    "Globalisierung",
    "Erneuerbare Energien",
    "Soziale Gerechtigkeit"
  ]
};

export function WritingTopicSelector({ level, onBack, onTopicSelect }) {
  const [customTopic, setCustomTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const topics = sampleTopics[level];
  const handleStartWriting = async () => {
    if (!customTopic || !level) return;
  
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("No auth token found");
      }
  
      const response = await fetch(`https://sprachebackend.website/ai/generate-instructions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          level: level,  // Enviar el nivel
          topic: customTopic,  // Enviar el tema
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching instructions: ${response.statusText}`);
      }
  
      const instructions = await response.text();
      onTopicSelect(customTopic, instructions);
    } catch (error) {
      setError('Unable to generate instructions or your AI functionalities had surpased the use. Please try later.');
      console.error("Error fetching instructions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCustomTopic(topics[randomIndex]);
    setError(null);

  };
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Levels
      </Button>

      {error && (
        <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Topic</h3>
            <div className="flex gap-3">
              <Input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Enter your own topic..."
                className="flex-1"
              />
              <Button
                onClick={handleStartWriting}
                disabled={!customTopic || isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 min-w-[120px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Start Writing"
                )}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div>
  <h3 className="text-lg font-semibold text-gray-900 mb-3">Suggested Topics</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {topics.slice(0, 4).map((topic) => (
      <Button
        key={topic}
        variant="outline"
        onClick={() => setCustomTopic(topic)}
        className="justify-start h-auto py-3 px-4"
      >
        {topic}
      </Button>
    ))}
  </div>
</div>


          <Button
            onClick={getRandomTopic}
            variant="outline"
            className="w-full mt-4"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Generate Random Topic
          </Button>
        </div>
      </Card>
    </div>
  );
}