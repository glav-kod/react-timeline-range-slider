import React, {useState} from "react";
import {Handles, Rail, Slider, Ticks, Tracks} from "react-compound-slider";

import SliderRail from "./components/slider-rail";
import Track from "./components/track";
import Tick from "./components/tick";
import Handle from "./components/handle";

import "./styles/index.css";
import TimelineInterval from "./types/timeline-interval";

export {
  TimelineInterval
};

type Props = {
  /**
   * Selected interval inside the timeline
   */
  selectedInterval: TimelineInterval,
  onChangeCallback: (interval: TimelineInterval) => void
}

const domain = {
  /**
   * Start of interval in seconds
   */
  start: 0,

  /**
   * End of interval in seconds
   */
  end: 86_400,

  /**
   * The step value for the slider in seconds.
   */
  step: 1800,
  toArray: function (): [number, number] {
    return [
      this.start,
      this.end
    ];
  },
  getTicks: function () {
    const result = [];
    for (let i = this.start; i <= this.end; i += this.step) {
      result.push(i);
    }

    return result;
  }
};

export default function TimeRange(props: Props) {
  const {
    selectedInterval,
    onChangeCallback
  } = props;

  const [updatedInterval, setUpdatedInterval] = useState<TimelineInterval>(selectedInterval);

  function onChange(values: ReadonlyArray<number>) {
    const formattedNewTime = TimelineInterval.FromArray(values);

    onChangeCallback(formattedNewTime);
  }

  function onUpdate(values: ReadonlyArray<number>) {
    const interval = TimelineInterval.FromArray(values);

    setUpdatedInterval(interval);
  }

  return (
    <div className="react_time_range__time_range_container">
      <Slider
        mode={3}
        step={domain.step}
        domain={domain.toArray()}
        onUpdate={onUpdate}
        onChange={onChange}
        values={[
          selectedInterval.start.seconds,
          selectedInterval.end.seconds
        ]}
        rootStyle={{
          position: "relative",
          height: "100%"
        }}
      >
        <Rail>
          {({getRailProps}) => <SliderRail getRailProps={getRailProps}/>}
        </Rail>

        <Handles>
          {({handles, getHandleProps}) => (
            <>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain.toArray()}
                  getHandleProps={getHandleProps}
                  currentInterval={updatedInterval}
                />
              ))}
            </>
          )}
        </Handles>

        <Tracks left={false} right={false}>
          {({tracks, getTrackProps}) => (
            <>
              {tracks?.map(({id, source, target}) =>
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              )}
            </>
          )}
        </Tracks>

        <Ticks values={domain.getTicks()}>
          {({ticks}) => (
            <>
              {ticks.map(tick => (
                <Tick
                  key={tick.id}
                  tick={tick}
                />
              ))}
            </>
          )}
        </Ticks>
      </Slider>
    </div>
  );
}