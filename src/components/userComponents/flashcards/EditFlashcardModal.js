import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { useState } from "react";

export function EditFlashcardModal({ isOpen, onClose, onSave, flashcard }) {
  const [editedCard, setEditedCard] = useState({
    front: flashcard.front,
    reverse: flashcard.reverse,
  });

  const handleSave = () => {
    if (editedCard.front && editedCard.reverse) {
      onSave({ ...editedCard, id: flashcard.id });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Front Side</Label>
            <Input
              value={editedCard.front}
              onChange={(e) => setEditedCard({ ...editedCard, front: e.target.value })}
              placeholder="Enter front side text"
            />
          </div>
          <div className="space-y-2">
            <Label>Reverse Side</Label>
            <Input
              value={editedCard.reverse}
              onChange={(e) => setEditedCard({ ...editedCard, reverse: e.target.value })}
              placeholder="Enter Reverse side text"
            />
          </div>
          <div className="space-y-2">
            <Label>Audio (optional)</Label>
            <Input type="file" accept="audio/*" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
