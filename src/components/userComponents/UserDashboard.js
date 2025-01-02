import { Tabs, TabsContent } from "../../ui/tabs";
import { UserDecksExpo } from "./UserDecks";
import { DeckTemplatesExpo } from "./DeckTemplates";
import { MiniGamesExpo } from "./MiniGames";
import { DashboardHeaderExpo } from "./DashboardHeader";
import { FlashcardEditor } from "./flashcards/FlashcardEditor"; // Importa tu componente FlashcardEditor
import { useState } from "react"; // Importa useState para manejar estados
import FlashcardGame from "./games/FlaschardGame/FlashcardGame";
import { Home, Library, BookCopy, Gamepad, PenTool } from "lucide-react";
import { WritingPractice } from "./writing/WritingPractice";


import { HomeDashboard } from "./HomeDashboard";
const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "decks", label: "My Decks", icon: Library },
  { id: "templates", label: "Templates", icon: BookCopy },
  { id: "games", label: "Mini Games", icon: Gamepad },
  { id: "writing", label: "Writing", icon: PenTool },
];




export function UserDashboardExpo() {
  const [activeTab, setActiveTab] = useState("home");
  const [editingDeck, setEditingDeck] = useState(null); // Estado para manejar el mazo que se edita
  const [playingDeck, setPlayingDeck] = useState(null)





  
 
  // Si estamos editando un mazo, muestra el editor
  if (editingDeck) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeaderExpo />
        <main className="container mx-auto px-4 py-8">
          <FlashcardEditor
            deckId={editingDeck.id}
            deckName={editingDeck.name}
            onClose={() => setEditingDeck(null)} // Cierra el editor
          />
        </main>
      </div>
    );
  }

if (playingDeck) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeaderExpo />
        <main className="container mx-auto px-4 py-8">
          <FlashcardGame
            deckId={playingDeck.id}
            deckName={playingDeck.name}
            onClose={() => setPlayingDeck(null)} // Cierra el editor
          />
        </main>
      </div>
    );
  }



return (
  <div className="min-h-screen bg-gray-50">
    <DashboardHeaderExpo />
    <main className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} className="space-y-8">
        {/* Custom Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-sm p-1.5 flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all
                  ${activeTab === id 
                    ? 'bg-yellow-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <TabsContent value="home">
          <HomeDashboard />
        </TabsContent>

        <TabsContent value="decks">
          <UserDecksExpo 
                 onEditDeck={setEditingDeck}
                 onPlayDeck={setPlayingDeck}  

          />
        </TabsContent>

        <TabsContent value="templates">
          <DeckTemplatesExpo />
        </TabsContent>

        <TabsContent value="games">
          <MiniGamesExpo />
        </TabsContent>

        <TabsContent value="writing">
          <WritingPractice/>
        </TabsContent>
      </Tabs>
    </main>
  </div>
);
}



