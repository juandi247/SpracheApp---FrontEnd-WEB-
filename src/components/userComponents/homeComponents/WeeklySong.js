import { Card } from "../../../ui/Card";
import { Music2 } from "lucide-react";

export function WeeklySong() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex items-center gap-2 mb-4">
        <Music2 className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-blue-900">Song of the Week</h3>
      </div>
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Fpu5a0Bl8eY"
        
          title="German Song of the Week"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">99 Luftballons - Nena</h4>
        <p className="text-sm text-gray-500 mt-1">
          A classic German pop song perfect for practicing pronunciation and expanding vocabulary.
        </p>
      </div>
    </Card>
  );
}