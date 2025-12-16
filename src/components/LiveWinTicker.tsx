import { Zap } from "lucide-react";

const wins = [
  { order: "#1024", profit: "129 kr.", time: "netop nu" },
  { order: "#1021", profit: "87 kr.", time: "5 min siden" },
  { order: "#1019", profit: "214 kr.", time: "12 min siden" },
  { order: "#1015", profit: "156 kr.", time: "18 min siden" },
  { order: "#1012", profit: "93 kr.", time: "25 min siden" },
];

export function LiveWinTicker() {
  return (
    <div className="bg-success/10 border-b border-success/20 overflow-hidden mb-6 -mx-6 -mt-2 px-6">
      <div className="flex items-center h-10 animate-marquee whitespace-nowrap">
        {[...wins, ...wins].map((win, index) => (
          <div key={index} className="flex items-center gap-2 mx-6">
            <Zap className="h-3.5 w-3.5 text-success flex-shrink-0" />
            <span className="text-sm text-success font-medium">
              ShipConvert reddede Ordre {win.order}
            </span>
            <span className="text-sm text-success/70">
              (Estimeret gevinst: {win.profit}) • {win.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
