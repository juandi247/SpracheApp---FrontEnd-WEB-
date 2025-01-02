import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { Badge } from "../../../ui/Badge";
import { Edit2, Trash2, Star } from "lucide-react";

export function TemplateTable({ onEditDeck }) {
  const [templates, setTemplates] = useState([]); // Estado para almacenar los templates
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Estado para el template seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("Token no encontrado en localStorage");
          return;
        }

        const response = await fetch(
          "https://sprachebackend.website/admin/templates/getall",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error al obtener los templates: ${response.status}`);
        }

        const data = await response.json();

        // Transformar los datos del API para adaptarlos a la tabla
        const transformedData = data.map((template) => ({
          id: template.id,
          name: template.name,
          level: template.lenguageLevel,
          words: template.totalWords, // Valor predeterminado
          rating: 4.5, // Valor predeterminado
          downloads: 1000, // Valor predeterminado
        }));

        setTemplates(transformedData); // Actualizar el estado con los datos transformados
      } catch (error) {
        console.error("Error al cargar los templates:", error);
      }
    };

    fetchTemplates();
  }, []);




  const deleteTemplate = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Token no encontrado en localStorage");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/templates/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar el template: ${response.status}`);
      }

      // Actualizar el estado para eliminar el template de la lista
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template.id !== id)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error al eliminar el template:", error);
    }
  };

  const handleDeleteClick = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const getBadgeStyle = (level) => {
    if (level.startsWith("A")) {
      return "bg-red-100 text-red-800";
    } else if (level.startsWith("B")) {
      return "bg-green-100 text-green-800";
    } else if (level.startsWith("C")) {
      return "bg-purple-100 text-purple-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-y-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Words</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getBadgeStyle(template.level)}
                  >
                    {template.level}
                  </Badge>
                </TableCell>
                <TableCell>{template.words}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    {template.rating}
                  </div>
                </TableCell>
                <TableCell>{template.downloads.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditDeck(template)}
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(template)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 shadow-lg">
            <p>
              ¿Estás seguro de que deseas eliminar el template{" "}
              <strong>{selectedTemplate.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteTemplate(selectedTemplate.id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
