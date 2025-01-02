import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/Dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/Table";
import { ScrollArea } from "../../../ui/Scroll-area";
import { Volume2 } from "lucide-react";

export function PreviewTemplateModal({ isOpen, onClose, template }) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview: {template.name}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Front</TableHead>
                <TableHead>Back</TableHead>
                <TableHead className="w-[100px]">Audio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {template.flashcards && template.flashcards.length > 0 ? (
    template.flashcards.map((card, index) => (
      <TableRow key={index}>
        <TableCell>{card.front}</TableCell>
        <TableCell>{card.reverse}</TableCell> {/* Cambié back por reverse, según la respuesta del API */}
        <TableCell>
          {card.audio && (
            <div className="flex items-center text-sm text-gray-500">
              <Volume2 className="h-4 w-4 mr-1" />
            </div>
          )}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} className="text-center text-gray-500">
        Loading Flashcards
      </TableCell>
    </TableRow>
  )}
</TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
