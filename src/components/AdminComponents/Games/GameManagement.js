import { useState, useEffect } from "react";
import { Card } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/Table";
import { Plus, Trash2 } from "lucide-react";

// Reemplaza con la URL real de tu API

export function GameManagement() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("easy");

  // Esta función se llama al cambiar de pestaña
  const fetchWords = function(category) {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem("authToken");

    fetch(`https://sprachebackend.website/admin/minigame/get_words/${category}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }
        return response.json();
      })
      .then(function(data) {
        const wordsArray = Object.entries(data.wordsAndArticles).map(function([word, article]) {
          return { word: word, article: article };
        });
        setWords(wordsArray);
      })
      .catch(function(error) {
        setError("Error loading words: " + error.message);
      })
      .finally(function() {
        setLoading(false);
      });
  };

  // Este effect se ejecuta cada vez que el valor de la pestaña cambia
  useEffect(function() {
    fetchWords(currentCategory);
  }, [currentCategory]);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Article Game Words</h2>
  
      <Tabs defaultValue="easy" onValueChange={function(value) { setCurrentCategory(value); }} className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="easy"
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg px-4 py-2"
          >
            Easy Mode
          </TabsTrigger>
          <TabsTrigger
            value="medium"
            className="bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-4 py-2"
          >
            Medium Mode
          </TabsTrigger>
          <TabsTrigger
            value="hard"
            className="bg-red-100 hover:bg-red-200 text-red-800 rounded-lg px-4 py-2"
          >
            Hard Mode
          </TabsTrigger>
        </TabsList>
  
        {/* Renderizamos las palabras de la categoría seleccionada */}
        {["easy", "medium", "hard"].map(function(mode) {
          return (
            <TabsContent key={mode} value={mode}>
              <div className="space-y-6">
                {/* Add New Word Form */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-semibold text-gray-700">Add New Word</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Word</Label>
                      <Input placeholder="Enter German word" />
                    </div>
                    <div>
                      <Label>Article</Label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-white">
                        <option value="der">der</option>
                        <option value="die">die</option>
                        <option value="das">das</option>
                      </select>
                    </div>
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Word
                  </Button>
                </div>
  
                {/* Words Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>German Word</TableHead>
                        <TableHead>Article</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={3}>Loading...</TableCell>
                        </TableRow>
                      ) : error ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-red-500">
                            {error}
                          </TableCell>
                        </TableRow>
                      ) : (
                        words.map(function(word, index) {
                          let articleColor = "";
                          switch (word.article) {
                            case "der":
                              articleColor = "bg-blue-100 text-blue-800";
                              break;
                            case "die":
                              articleColor = "bg-pink-100 text-pink-800";
                              break;
                            case "das":
                              articleColor = "bg-green-100 text-green-800";
                              break;
                            default:
                              articleColor = "bg-gray-100 text-gray-800";
                          }
  
                          return (
                            <TableRow key={index}>
                              <TableCell>{word.word}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-sm ${articleColor}`}>
                                  {word.article}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
}  