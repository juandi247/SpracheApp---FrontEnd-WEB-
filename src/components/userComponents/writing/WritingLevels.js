import { Card } from "../../../ui/Card";
import { GraduationCap } from "lucide-react";

const levels = [
  { level: "A1", description: "Basic words and simple sentences" },
  { level: "A2", description: "Everyday situations and routine tasks" },
  { level: "B1", description: "Clear texts on familiar matters" },
  { level: "B2", description: "Detailed texts on various topics" },
  { level: "C1", description: "Complex topics and academic writing" },
];

export function WritingLevels({ onLevelSelect }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select Your Level</h2>
        <p className="text-gray-500 mt-2">Choose your German proficiency level to get appropriate writing tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map(({ level, description }) => (
          <Card
            key={level}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onLevelSelect(level)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Level {level}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
