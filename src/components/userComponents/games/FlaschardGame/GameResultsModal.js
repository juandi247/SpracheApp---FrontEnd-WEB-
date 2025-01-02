import { Dialog, DialogContent } from "../../../../ui/Dialog";
import { Button } from "../../../../ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/Table";
import { Card } from "../../../../ui/Card";
import { Clock, Target, Zap } from "lucide-react";
import { ScrollArea } from "../../../../ui/Scroll-area";

export function GameResultsModal({ isOpen, onClose, stats, results,total }) {
  const averageTimePerCard = stats.time / total;
  const accuracy = (stats.correct / total) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Practice Complete! 🎉
          </h2>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Time/Card</p>
                  <p className="text-lg font-bold text-gray-900">
                    {averageTimePerCard.toFixed(1)}s
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Target className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-lg font-bold text-gray-900">
                    {accuracy.toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="text-lg font-bold text-gray-900">
                    {Math.floor(stats.time / 60)}:{(stats.time % 60).toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Detailed Results</h3>
            <ScrollArea className="h-[300px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead>Translation</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.word}</TableCell>
                      <TableCell>{result.translation}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            result.isCorrect
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {result.isCorrect ? "Correct" : "Wrong"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button onClick={onClose} variant="outline">
              Back to Decks
            </Button>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
