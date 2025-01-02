import { Card } from "../../../ui/Card";
import { Lightbulb } from "lucide-react";

export function DailyTip() {
  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <h3 className="text-xl font-semibold text-yellow-900">Daily Learning Tip</h3>
      </div>
      <p className="text-gray-700">
        When learning German articles (der, die, das), try associating each noun with a color. For example:
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-gray-600">der → blue for masculine nouns</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-600">die → red for feminine nouns</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600">das → green for neutral nouns</span>
        </div>
      </div>
    </Card>
  );
}