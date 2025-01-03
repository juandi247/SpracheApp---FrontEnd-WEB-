import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { AlertCircle } from "lucide-react";

export function UnsavedChangesModal({ isOpen, onClose, onSave, onDiscard }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Unsaved Changes
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-600">
            You have unsaved changes in your flashcard deck. Would you like to save them before leaving?
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onDiscard}>
            Discard Changes
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={onSave}>
            Save new Flashcards 
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
