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
  import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
  import { useEffect, useState } from "react";
  
  export function UserTableExpo({ currentPage, onPageChange }) {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
  
    // Obtener el token de localStorage
    const token = localStorage.getItem("authToken");
  
    // Cargar usuarios desde la API cuando cambie la página
    useEffect(() => {
      const fetchUsers = async () => {
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
  
        setLoading(true);
        try {
          const response = await fetch(`https://sprachebackend.website/admin/users?page=${currentPage-1}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Agregar el Bearer token aquí
            },
          });
          const data = await response.json();
          setUsers(data.content); // Usuarios en la respuesta
          setTotalPages(data.totalPages); // Total de páginas
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, [currentPage, token]);
  
    if (loading) return <div>Loading...</div>; // Opcional: Puedes mostrar un loading spinner aquí
  
    return (
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-semibold">Username</TableHead>
              <TableHead className="text-lg font-semibold">Email</TableHead>
              <TableHead className="text-lg font-semibold">Role</TableHead>
              <TableHead className="text-lg font-semibold">Join Date</TableHead>
              <TableHead className="text-lg font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.creationDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {users.length} of {totalPages * 10} users
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} // Desactivar botón "anterior" en la primera página
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages } // Desactivar botón "siguiente" en la última página
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  