import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { Trash2, Volume2, Edit2 } from "lucide-react";
import { useState } from "react";
import { EditFlashcardModal } from "./EditFlashcardModal";

export function FlashcardList({ flashcards, onDelete, onEdit, isload }) {
  const [editingCard, setEditingCard] = useState(null);



  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleSaveEdit = (editedCard) => {
    onEdit(editedCard);
    setEditingCard(null);
  };

  if (isload) {
    return (
      <div>
        {/* Skeletons de carga más suaves */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Current Flashcards
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Front Side</TableHead>
            <TableHead>Back Side</TableHead>
            <TableHead>Audio</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flashcards.map((card) => (
            <TableRow
              key={card.id}
              className={card.isNew ? "bg-yellow-50" : undefined}
            >
              <TableCell>{card.front}</TableCell>
              <TableCell>{card.reverse}</TableCell>
              <TableCell>
                {card.audio && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Volume2 className="h-4 w-4 mr-1" />
                    <span>Available</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(card)}
                  >
                    <Edit2 className="h-4 w-4 text-yellow-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(card.id, card.isNew)}
                    className="transition-transform hover:scale-105 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingCard && (
        <EditFlashcardModal
          isOpen={true}
          onClose={() => setEditingCard(null)}
          onSave={handleSaveEdit}
          flashcard={editingCard}
        />
      )}
    </div>
  );
}
