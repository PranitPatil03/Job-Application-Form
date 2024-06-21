import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock10Icon } from "lucide-react";
import React from "react";

const InterviewTime = () => {
  const [date] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("");

  return (
    <>
      <div className="border-gray-200 w-full sm:mt-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full text-gray-900 font-mono text-md font-semibold justify-start",
                !date && "text-gray-900"
              )}
            >
              <Clock10Icon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span> {time ? time : "Time"}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <label className="sr-only">Pick a time</label>
            <ul id="timetable" className="grid w-full grid-cols-3 gap-4">
              {[
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "11:30 AM",
                "12:00 PM",
                "12:30 PM",
                "01:00 PM",
                "01:30 PM",
                "02:00 PM",
                "02:30 PM",
                "03:00 PM",
                "03:30 PM",
              ].map((timeSlot, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={timeSlot.replace(/[: ]/g, "-")}
                    value={timeSlot}
                    className="hidden peer"
                    name="timetable"
                    onChange={() => setTime(timeSlot)}
                  />
                  <label
                    htmlFor={timeSlot.replace(/[: ]/g, "-")}
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-gray-900 border-gray-300 peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:text-gray-900 hover:bg-gray-100"
                  >
                    {timeSlot}
                  </label>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default InterviewTime;
