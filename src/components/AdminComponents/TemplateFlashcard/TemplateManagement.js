import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../../ui/Input";
import { TemplateStats } from "./TemplateStats";
import { TemplateTable } from "./TemplateTable";
import { AddTemplateModalExpo } from "../AdminModals/AddTemplateModal";

export function TemplateManagement({onEditDeck }) {

    
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <TemplateStats />
      
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search templates..." 
            className="pl-10"
          />


          
        </div>
        <div className="flex items-center gap-2"> {/* Asegura que los botones estén alineados correctamente */}
              <AddTemplateModalExpo  />  {/* El botón normal de Add Deck */}
            </div>
      </div>

      <TemplateTable 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onEditDeck={onEditDeck}
      />
    </div>
  );
}
