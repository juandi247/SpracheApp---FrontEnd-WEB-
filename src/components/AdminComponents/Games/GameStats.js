import { Card } from "../../../ui/Card";
import { Gamepad, Trophy, Users } from "lucide-react";

export function GameStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Gamepad className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Games Played Today</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Users className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Players</p>
            <p className="text-2xl font-bold text-yellow-600">847</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">High Scores Today</p>
            <p className="text-2xl font-bold text-blue-600">156</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
