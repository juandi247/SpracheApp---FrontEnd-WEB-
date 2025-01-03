import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { Copy, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { PreviewTemplateModal } from "./modals/PreviewTemplateModal";
import { CopyTemplateModal } from "./modals/CopyTemplateModal";
import { TemplateSearch } from "./Templates/TemplateSearch";
import { TemplateFilters } from "./Templates/TemplateFilters";

export function DeckTemplatesExpo() {
  const [templates, setTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [copyTemplate, setCopyTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [copyMessage, setCopyMessage] = useState(""); // Mensaje de éxito/error
  const [error, setError] = useState(null); // Estado para manejar errores
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    level: "all",
    wordCount: [0, 50]
  });

  const filteredTemplates = templates.filter(template => {
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const levelMatch = filters.level === "all" || template.lenguageLevel === filters.level;

    const wordCountMatch = template.totalWords >= filters.wordCount[0] && 
                          template.totalWords <= filters.wordCount[1];

    return searchMatch && levelMatch && wordCountMatch;
  });

  

  // Cargar los templates al montar el componente
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`https://sprachebackend.website/template/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Si el status no es 200, lanzar un error
        if (response.status !== 200) {
          throw new Error(`Error: Received status ${response.status}`);
        }

        const data = await response.json();
        setTemplates(data); // Establecer las plantillas en el estado
        setError(null); // Limpiar el estado de error si la solicitud es exitosa
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Error fetching templates. Please try again later."); // Establecer el mensaje de error
      }
    };

    fetchTemplates();
  }, []);

  // Fetch para las flashcards (usado en el preview)
  const fetchFlashcards = async (templateId) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`https://sprachebackend.website/template/preview/${templateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    setPreviewTemplate((prevTemplate) => ({
      ...prevTemplate,
      flashcards: data,
    }));
  };

  // Estilos dinámicos para las badges
  const getBadgeStyle = (level) => {
    if (level.startsWith("A1")) {
      return "bg-red-100 text-red-800";
    }
    else if (level.startsWith("A2")) {
      return "bg-green-100 text-green-800";
    } 
    else if (level.startsWith("B1")) {
      return "bg-green-100 text-green-800";
    } 
    else if (level.startsWith("B2")) {
      return "bg-green-100 text-green-800";
      
    } else if (level.startsWith("C")) {
      return "bg-purple-100 text-purple-800";
    } else {
      return "bg-gray-100 text-gray-800"; // Nivel desconocido
    }
  };

  // Lógica para copiar un template
  const handleCopyTemplate = async () => {
    if (!copyTemplate) return; // Validar que haya un template seleccionado
    const token = localStorage.getItem("authToken");

    setIsLoading(true); // Activar estado de carga
    setCopyMessage(""); // Limpiar mensajes previos

    try {
      const response = await fetch(`https://sprachebackend.website/deck/copy/${copyTemplate.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCopyMessage("Template copied successfully!"); // Mensaje de éxito
      } else {
        setCopyMessage("There was an error copying the template. Please try again."); // Mensaje de error
      }
    } catch (error) {
      setCopyMessage("Network or server error. Please try again."); // Error de red o servidor
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  // Limpiar estados al cerrar el modal de copiar
  const handleCloseCopyModal = () => {
    setCopyTemplate(null);
    setIsLoading(false);
    setCopyMessage("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Popular Templates</h2>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <div className="flex items-center gap-4">
        <TemplateSearch 
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <TemplateFilters onFilterChange={setFilters} />
      </div>
       
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="p-6 hover:shadow-lg transition-shadow relative"
          >
            <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-semibold flex items-center space-x-2">
              <span className={`py-1 px-3 rounded-full ${getBadgeStyle(template.lenguageLevel)}`}>
                {template.lenguageLevel}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">5.0</span>
                </div>
                <span className="text-sm text-gray-500">{template.totalWords} cards</span>

              </div>

              <div className="flex justify-center space-x-1.5 mt-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 px-6 py-3 border border-black rounded-md text-sm text-gray-900 hover:bg-gray-100"
                  onClick={() => {
                    fetchFlashcards(template.id);
                    setPreviewTemplate(template);
                  }}
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
                <Button
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                  onClick={() => setCopyTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de preview */}
      {previewTemplate && (
        <PreviewTemplateModal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
        />
      )}

      {/* Modal de copiar */}
      {copyTemplate && (
        <CopyTemplateModal
          isOpen={!!copyTemplate}
          onClose={handleCloseCopyModal} // Cerrar modal y limpiar estados
          onConfirm={handleCopyTemplate} // Ejecutar lógica de copia
          template={copyTemplate}
          isLoading={isLoading} // Pasar el estado de carga
          copyMessage={copyMessage} // Pasar el mensaje de éxito/error
        />
      )}
    </div>
  );
}
