### Typescript react timeline range slider

![demo png](https://github.com/glav-kod/react-timeline-range-slider/blob/main/demo.png)

### Installation

     yarn add @glav-kod/react-timeline-range-slider

### Props

```typescript
type Props = {
    /**
     * Selected interval inside the timeline
     */
    selectedInterval: TimelineInterval,

    /**
     * Callback function to handle changes to the selected interval
     * @param interval - The updated TimelineInterval
     */
    onChange: (interval: TimelineInterval) => void,

    /**
     * Callback function to handle live updates to the selected interval
     * @param interval - The updated TimelineInterval
     */
    onUpdate?: (interval: TimelineInterval) => void
}
```

### Example

```tsx
import React, {useState} from "react";
import TimeRange, {TimelineInterval} from "@glav-kod/react-timeline-range-slider";
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
```

## Feature Requests

If you have any ideas for new features or improvements for this library,
we welcome your input!
Please feel free to create a new issue on
[our GitHub repository](https://github.com/glav-kod/react-timeline-range-slider). We appreciate your feedback and will consider your suggestions
for future updates.

Thank you for helping us make this library even better!
