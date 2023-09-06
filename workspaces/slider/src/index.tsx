import React, {useState} from "react";
import {Handles, Rail, Slider, Ticks, Tracks} from "react-compound-slider";

import SliderRail from "./components/slider-rail";
import Track from "./components/track";
import Tick from "./components/tick";
import Handle from "./components/handle";

import "./styles/index.css";
import TimelineInterval from "./types/timeline-interval";
import domain from "./constants/domain";

export {
  TimelineInterval
};

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

export default function TimeRange(props: Props) {
  const {
    selectedInterval
  } = props;

  const [updatedInterval, setUpdatedInterval] = useState<TimelineInterval>(selectedInterval);

  function handleChange(values: ReadonlyArray<number>) {
    const formattedNewTime = TimelineInterval.FromArray(values);

    props.onChange(formattedNewTime);
  }

  function handleUpdate(values: ReadonlyArray<number>) {
    const interval = TimelineInterval.FromArray(values);

    setUpdatedInterval(interval);

    if (props.onUpdate) {
      props.onUpdate(interval);
    }
  }

  return (
    <div className="react_time_range__time_range_container">
      <Slider
        mode={3}
        step={domain.step}
        domain={domain.toArray()}
        onUpdate={handleUpdate}
        onChange={handleChange}
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