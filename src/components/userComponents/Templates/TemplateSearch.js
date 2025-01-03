import { Input } from "../../../ui/Input";
import { Search } from "lucide-react";

function TemplateSearch({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input 
        placeholder="Search templates..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white"
      />
    </div>
  );
}

export { TemplateSearch };
