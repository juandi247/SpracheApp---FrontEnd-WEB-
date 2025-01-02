import { Card } from "../../../ui/Card";
import { Globe } from "lucide-react";


export function CultureCorner() {
  return (
    <Card className="p-6 bg-gradient-to-br from-pink-50 to-white">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-pink-600" />
        <h3 className="text-xl font-semibold text-pink-900">Culture Corner</h3>
      </div>
      <div className="space-y-4">
        <img
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="German Culture"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-semibold text-gray-900">Oktoberfest Traditions</h4>
          <p className="text-sm text-gray-600 mt-2">
            Learn about the history and customs of the world's largest Volksfest, including traditional 
            dress, food, and celebrations that make this festival uniquely German.
          </p>
        </div>
      </div>
    </Card>
  );
}