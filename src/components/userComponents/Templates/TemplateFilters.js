import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Slider } from "../../../ui/Slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/Select";
import { SlidersHorizontal } from "lucide-react";
import { Dialog,DialogContent,DialogHeader,DialogTitle } from "../../../ui/Dialog";

export function TemplateFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState("all");
  const [wordCount, setWordCount] = useState([0, 50]);

  const handleReset = () => {
    setLevel("all");
    setWordCount([0, 50]);
    onFilterChange({ level: "all", wordCount: [0, 50] });
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 shrink-0"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {(level !== "all" || wordCount[0] !== 0 || wordCount[1] !== 50) && (
          <span className="ml-2 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
            !
          </span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Templates</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Level</label>
              <Select
                value={level}
                onValueChange={(value) => {
                  setLevel(value);
                  onFilterChange({ level: value, wordCount });
                }}
              >
                <SelectTrigger className="bg-white border border-gray-300 rounded-md">
  <SelectValue placeholder="Select level" />
</SelectTrigger>
<SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="A1">A1 - Beginner</SelectItem>
                  <SelectItem value="A2">A2 - Elementary</SelectItem>
                  <SelectItem value="B1">B1 - Intermediate</SelectItem>
                  <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                  <SelectItem value="C1">C1 - Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Word Count Range: {wordCount[0]} - {wordCount[1]}
              </label>
              <Slider
                value={wordCount}
                min={0}
                max={50}
                step={5}
                onValueChange={(value) => {
                  setWordCount([value[0], value[1]]);
                  onFilterChange({ level, wordCount: [value[0], value[1]] });
                }}
                className="py-4"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-sm"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
