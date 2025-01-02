import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { Plus } from "lucide-react";

export function AddTemplateModalExpo({ addDeck }) {
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [level, setLevel] = useState('A1'); // Estado para el nivel
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const handleCreateDeck = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
  
    const authToken = localStorage.getItem('authToken'); 
  
    if (!deckName || !deckDescription) {
      setError("Please provide both deck name and description.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`https://sprachebackend.website/admin/templates/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: deckName,
          description: deckDescription,
          lenguageLevel: level, // Agregar el nivel seleccionado
        }),
      });
  
      if (response.status === 200) {
        const contentType = response.headers.get('Content-Type');
  
        // Si el contenido es JSON, lo parseamos
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setSuccess('Template created successfully!');
          setDeckName('');
          setDeckDescription('');
          setOpen(false); // Cierra el modal después de crear el mazo
          addDeck(data); // Pasa el nuevo mazo al estado del componente padre
        } else {
          // Si el contenido no es JSON, tratamos la respuesta como texto
          const text = await response.text();
          setSuccess(text); // Puedes manejar la respuesta como texto plano
          setDeckName('');
          setDeckDescription('');
          setOpen(false); // Cierra el modal después de crear el mazo
        }
      } else {
        setError("Something went wrong.");
      }
    } catch (error) {
      setError('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };
  


    
  
       
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap text-white"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Create New Deck</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Deck</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deck Name</Label>
            <Input 
              id="name" 
              placeholder="Enter deck name" 
              value={deckName} 
              onChange={(e) => setDeckName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="Enter deck description" 
              value={deckDescription} 
              onChange={(e) => setDeckDescription(e.target.value)} 
            />
          </div>

          {/* Picker de nivel */}
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)} // Actualizar el estado con el nivel seleccionado
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
        <div className="flex justify-end">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={handleCreateDeck}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Deck'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
