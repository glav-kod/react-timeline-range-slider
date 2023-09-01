### react-timeline-range-slider

![demo gif](./demo.gif)

### Installation

     yarn add @glav-kod/react-timeline-range-slider

### Props

| Prop               | Type         | Default                             | Description                                                                                                                                                                                                                                                                                                                                                                                  |
|--------------------|--------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| interval           | Object       |                                     | Interval to display                                                                                                                                                                                                                                                                                                                                                                          |
| selectedInterval   | Object       |                                     | Selected interval inside the timeline                                                                                                                                                                                                                                                                                                                                                        |
| disabledIntervals  | array        | []                                  | Array of disabled intervals inside the timeline                                                                                                                                                                                                                                                                                                                                              |
| containerClassName | string       |                                     | ClassName of the wrapping container                                                                                                                                                                                                                                                                                                                                                          |
| step               | number       | 1800000                             | Number of milliseconds between steps (the default value is 30 minutes)                                                                                                                                                                                                                                                                                                                       |
| ticksNumber        | number       | 48                                  | Number of steps on the timeline (the default value is 30 minutes)                                                                                                                                                                                                                                                                                                                            |
| error              | bool         | false                               | Is the selected interval is not valid                                                                                                                                                                                                                                                                                                                                                        |
| mode               | int/function | 3                                   | The interaction mode. Value of 1 will allow handles to cross each other. Value of 2 will keep the sliders from crossing and separated by a step. Value of 3 will make the handles pushable and keep them a step apart. ADVANCED: You can also supply a function that will be passed the current values and the incoming update. Your function should return what the state should be set as. |
| formatTick         | function     | ms => format(new Date(ms), 'HH:mm') | Function that determines the format in which the date will be displayed                                                                                                                                                                                                                                                                                                                      |
| onUpdateCallback   | function     |                                     |                                                                                                                                                                                                                                                                                                                                                                                              |
| onChangeCallback   | function     |                                     |                                                                                                                                                                                                                                                                                                                                                                                              |

### Example

[Live demo](https://codesandbox.io/s/react-timeline-range-slider-ve7w2?file=/src/App.js)

```javascript
import React, {useState} from "react";
import {endOfToday, set} from "date-fns";
import TimeRange, {TimelineInterval} from "@glav-kod/react-timeline-range-slider";

function App() {
    const now = new Date();
    const getTodayAtSpecificHour = (hour = 12) =>
            set(now, {hours: hour, minutes: 0, seconds: 0, milliseconds: 0});

    const selectedStart = getTodayAtSpecificHour();
    const selectedEnd = getTodayAtSpecificHour(14);

    const startTime = getTodayAtSpecificHour(7);
    const endTime = endOfToday();

    const disabledIntervals = [
        {start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17)},
        {start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12)},
        {start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24)}
    ];

    const [error, setError] = useState<boolean>(false);
    const [selectedInterval, setSelectedInterval] = useState<TimelineInterval>({
        start: selectedStart,
        end: selectedEnd
    });

    function errorHandler({error}) {
        return setError(error);
    }

    function onChangeCallback(selectedInterval: TimelineInterval) {
        setSelectedInterval(selectedInterval);
    }

    return (
            <TimeRange
                    error={error}
                    ticksNumber={36}
                    selectedInterval={selectedInterval}
                    interval={{
                        start: startTime,
                        end: endTime
                    }}
                    onUpdateCallback={errorHandler}
                    onChangeCallback={onChangeCallback}
                    disabledIntervals={disabledIntervals}
            />
    );
}

export default App;
```
