import { Card } from "../../../ui/Card";
import { BookOpen, Download, Star } from "lucide-react";

export function TemplateStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Templates</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-yellow-600">4.8</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Downloads</p>
            <p className="text-2xl font-bold text-blue-600">12.5k</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
