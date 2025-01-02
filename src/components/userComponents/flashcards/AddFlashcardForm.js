import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddFlashcardForm({ onAdd }) {
  const [newCard, setNewCard] = useState({ front: "", reverse: "" });

  const handleSubmit = () => {
    if (newCard.front && newCard.reverse) {
      onAdd(newCard);
      setNewCard({ front: "", reverse: "" });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Add New Flashcard</h3>
      <div className="p-4 border rounded-lg bg-gray-50">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Front Side</Label>
            <Input
              value={newCard.front}
              onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
              placeholder="Enter front side text"
            />
          </div>
          <div>
            <Label>Reverse Side</Label>
            <Input
              value={newCard.reverse}
              onChange={(e) => setNewCard({ ...newCard, reverse: e.target.value })}
              placeholder="Enter Reverse side text"
            />
          </div>
        </div>
        <div>
          <Label>Audio (optional)</Label>
          <Input type="file" accept="audio/*" className="mt-1" />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={handleSubmit}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </div>
      </div>
    </div>
  );
}
