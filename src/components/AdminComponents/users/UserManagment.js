import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../../ui/Input";
import { UserTableExpo } from "./UserTable";
import { UserStatsExpo } from "./UserStats";

export function UserManagementExpo() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div className="space-y-6">
      <UserStatsExpo />
      
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search users..." 
            className="pl-10"
          />
        </div>
      </div>

      <UserTableExpo
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}