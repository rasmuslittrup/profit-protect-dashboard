import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TimePeriod = "all" | "today" | "week" | "month" | "custom";
export type ProfitFocus = "standard" | "max-margin";

interface DashboardFiltersProps {
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
  profitFocus: ProfitFocus;
  onProfitFocusChange: (focus: ProfitFocus) => void;
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
}

const timePeriodLabels: Record<TimePeriod, string> = {
  all: "Altid",
  today: "I dag",
  week: "Denne uge",
  month: "Denne måned",
  custom: "Egen periode",
};

export function DashboardFilters({
  timePeriod,
  onTimePeriodChange,
  profitFocus,
  onProfitFocusChange,
  dateRange,
  onDateRangeChange,
}: DashboardFiltersProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleTimePeriodChange = (value: string) => {
    const period = value as TimePeriod;
    onTimePeriodChange(period);
    if (period === "custom") {
      setCalendarOpen(true);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Time Period Selector */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <Select value={timePeriod} onValueChange={handleTimePeriodChange}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Vælg periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Altid</SelectItem>
              <SelectItem value="today">I dag</SelectItem>
              <SelectItem value="week">Denne uge</SelectItem>
              <SelectItem value="month">Denne måned</SelectItem>
              <SelectItem value="custom">Egen periode</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date Range Picker */}
        {timePeriod === "custom" && (
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 justify-start text-left text-sm font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "d. MMM", { locale: da })} –{" "}
                      {format(dateRange.to, "d. MMM yyyy", { locale: da })}
                    </>
                  ) : (
                    format(dateRange.from, "d. MMM yyyy", { locale: da })
                  )
                ) : (
                  "Vælg datoer"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange as any}
                onSelect={(range: any) => {
                  onDateRangeChange({ from: range?.from, to: range?.to });
                }}
                numberOfMonths={2}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        )}

        {/* Separator */}
        <div className="h-6 w-px bg-border hidden sm:block" />

        {/* Profit Segmentation */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Indtjenings-fokus:</span>
          <Select value={profitFocus} onValueChange={(v) => onProfitFocusChange(v as ProfitFocus)}>
            <SelectTrigger className="w-[200px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard visning</SelectItem>
              <SelectItem value="max-margin">Max indtjening altid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
