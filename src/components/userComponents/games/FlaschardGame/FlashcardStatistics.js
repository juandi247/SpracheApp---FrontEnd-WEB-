import { Card } from "../../../../ui/Card";
import { Clock, Check, X } from "lucide-react";

export function FlashcardStatistics({ time, correct, wrong, total }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Correct</p>
            <p className="text-2xl font-bold text-green-600">
              {correct}/{total}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-red-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <X className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Wrong</p>
            <p className="text-2xl font-bold text-red-600">
              {wrong}/{total}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
