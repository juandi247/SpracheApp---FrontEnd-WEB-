import { WeeklyWord } from "./homeComponents/WeeklyWord";
import { WeeklySong } from "./homeComponents/WeeklySong";
import { DailyTip } from "./homeComponents/DailyTip";
import { CultureCorner } from "./homeComponents/CultureCorner";
import { WelcomeHero } from "./homeComponents/WelcomeHero";
export function HomeDashboard() {

  return (
    <div className="space-y-8">
      <WelcomeHero />
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyWord />
        <DailyTip />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklySong />
        </div>
        <CultureCorner />
        
      </div>
    </div>
  );
}