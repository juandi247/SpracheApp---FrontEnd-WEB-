import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { AdminHeaderExpo } from "./AdminHeader";
import { UserManagementExpo } from "./users/UserManagment";
import { TemplateManagement } from "./TemplateFlashcard/TemplateManagement";
import { useState } from "react";
import { GameManagement } from "./Games/GameManagement";
import { TemplateFlashcardEditor } from "./TemplateFlashcard/TemplateFlaschardEditor";

export function AdminDashboardExpo() {
    const [editingDeck, setEditingDeck] = useState(null); // Estado para manejar el mazo que se edita
  
  if (editingDeck) {
        return (
          <div className="min-h-screen bg-gray-50">
            <AdminHeaderExpo />
            <main className="container mx-auto px-4 py-8">
              <TemplateFlashcardEditor
                deckId={editingDeck.id}
                deckName={editingDeck.name}
                onClose={() => setEditingDeck(null)} // Cierra el editor
              />
            </main>
          </div>
        );
      }
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeaderExpo />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="users" className="text-lg">Users</TabsTrigger>
            <TabsTrigger value="templates" className="text-lg">Templates</TabsTrigger>
            <TabsTrigger value="games" className="text-lg">Mini Games</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagementExpo  />

          </TabsContent>

          <TabsContent value="templates">
            <TemplateManagement onEditDeck={setEditingDeck}/>
          </TabsContent>

          <TabsContent value="games">
            <GameManagement/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}