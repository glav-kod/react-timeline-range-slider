import React, {useState} from "react";
import TimeRange, {TimelineInterval} from "@glav-kod/react-timeline-range-slider";
import "./App.css";

const initialInterval = TimelineInterval.FromString("00:00", "24:00");

function App() {
  const [selectedInterval, setSelectedInterval] = useState<TimelineInterval>(initialInterval);

  function onChangeCallback(selectedInterval: TimelineInterval) {
    setSelectedInterval(selectedInterval);
  }

  return (
    <TimeRange
      selectedInterval={selectedInterval}
      onChangeCallback={onChangeCallback}
    />
  );
}

export default App;