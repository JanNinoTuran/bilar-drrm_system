import React, { useState, useEffect } from "react";
import { ClockIcon } from "lucide-react";

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center gap-1 text-xs bg-blue-100/50 px-2 py-1 rounded-full text-blue-700">
      <ClockIcon className="h-3 w-3" />
      <span className="font-medium">{time}</span>
    </div>
  );
};

export default Clock;
