import React, {useState} from "react";
import TimeRange, {TimelineInterval} from "@glav-kod/react-timeline-range-slider";
import "@glav-kod/react-timeline-range-slider/style.css";
import "./App.css";

const initialInterval = TimelineInterval.FromString("00:00", "24:00");

function App() {
  const [selectedInterval, setSelectedInterval] = useState<TimelineInterval>(initialInterval);

  function handleChange(selectedInterval: TimelineInterval) {
    setSelectedInterval(selectedInterval);
  }

  return (
    <TimeRange
      selectedInterval={selectedInterval}
      onChange={handleChange}
    />
  );
}

export default App;