import { Card } from "../../../ui/Card";
import { Volume2 } from "lucide-react";
import { Button } from "../../../ui/Button";

export function WeeklyWord() {
  return (
    <Card className="p-6 overflow-hidden relative">
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-purple-900 mb-4">Word of the Week</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-purple-700">Gemütlichkeit</p>
              <p className="text-gray-600 mt-1">noun • [gə-myt-likh-kayt]</p>
            </div>
            <Button variant="ghost" size="icon" className="text-purple-600">
              <Volume2 className="h-6 w-6" />
            </Button>
          </div>
          <div>
            <p className="text-lg text-gray-700">A state of warmth, friendliness, and good cheer</p>
            <div className="mt-3 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-900 font-medium">
                "Die Gemütlichkeit in diesem Café ist wunderbar."
              </p>
              <p className="text-sm text-purple-600 mt-1">
                The coziness in this café is wonderful.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full opacity-20 -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full opacity-20 -ml-12 -mb-12" />
    </Card>
  );
}