import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/Dialog";
import { Button } from "../../../../ui/Button";
import { Input } from "../../../../ui/Input";
import { useState } from "react";

export function PracticeSentenceModal({ isOpen, onClose }) {
  const [sentence, setSentence] = useState("");

  const handleSubmit = () => {
    // Here would go the logic to handle the sentence
    setSentence("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Practice a Sentence</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Write a sentence using this word..."
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />
          <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-600">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
