import React from "react";
import {scaleTime} from "d3-scale";
import {Handles, Rail, Slider, SliderItem, SliderProps, Ticks, TrackItem, Tracks} from "react-compound-slider";
import {addMinutes, differenceInMilliseconds, format, isAfter, isBefore} from "date-fns";

import SliderRail from "./components/slider-rail";
import Track from "./components/track";
import Tick from "./components/tick";
import Handle from "./components/handle";

import "./styles/index.css";

export type TimelineInterval = {
  start: Date,
  end: Date
}

function getTimelineConfig(timelineStart: Date, timelineLength: number): (date: Date) => SliderItem {
  return (date: Date) => {
    const percent = differenceInMilliseconds(date, timelineStart) / timelineLength * 100;
    const value = Number(format(date, "T"));

    return {
      id: "",
      percent,
      value
    };
  };
}

function getFormattedBlockedIntervals(blockedDates: TimelineInterval[], interval: TimelineInterval): TrackItem[] | null {
  if (!blockedDates.length)
    return null;

  const timelineLength = differenceInMilliseconds(interval.end, interval.start);
  const getConfig = getTimelineConfig(interval.start, timelineLength);

  return blockedDates.map((interval, index) => {
    let {start, end} = interval;

    if (isBefore(start, interval.start)) {
      start = interval.start;
    }

    if (isAfter(end, interval.end)) {
      end = interval.end;
    }

    const source = getConfig(start);
    const target = getConfig(end);

    return {
      id: `blocked-track-${index}`,
      source,
      target
    };
  });
}

function getNowConfig(interval: TimelineInterval): TrackItem {
  const timelineLength = differenceInMilliseconds(interval.end, interval.start);
  const getConfig = getTimelineConfig(interval.start, timelineLength);

  const source = getConfig(new Date());
  const target = getConfig(addMinutes(new Date(), 1));

  return {
    id: "now-track",
    source,
    target
  };
}

type Props = {
  error: boolean,
  ticksNumber: number,
  selectedInterval: TimelineInterval,
  interval: TimelineInterval,
  disabledIntervals?: TimelineInterval[],
  containerClassName?: string,
  /**
   * The step value for the slider in milliseconds.
   */
  step?: number,
  formatTick?: (ms: number) => string,
  mode?: SliderProps["mode"],
  showNow?: boolean,
  onUpdateCallback: (update: {
    error: boolean,
    time: TimelineInterval
  }) => void,
  onChangeCallback: (interval: TimelineInterval) => void
}

export default function TimeRange(props: Props) {
  const {
    interval,
    ticksNumber = 48,
    selectedInterval,
    containerClassName,
    error = false,
    step = 1000 * 60 * 30,
    showNow = false,
    formatTick = ms => format(new Date(ms), "HH:mm"),
    mode = 3,
    onUpdateCallback,
    onChangeCallback,
    disabledIntervals = []
  } = props;

  const formattedBlockedIntervals = getFormattedBlockedIntervals(disabledIntervals, interval);
  const now = getNowConfig(interval);

  function formatInterval(ticks: ReadonlyArray<number>): TimelineInterval {
    return {
      start: new Date(ticks[0]),
      end: new Date(ticks[1])
    };
  }

  function onChange(newTime: ReadonlyArray<number>) {
    const formattedNewTime = formatInterval(newTime);

    if (onChangeCallback) {
      onChangeCallback(formattedNewTime);
    }
  }

  function checkIsSelectedIntervalNotValid([start, end]: ReadonlyArray<number>, source: SliderItem, target: SliderItem) {
    const {value: startInterval} = source;
    const {value: endInterval} = target;

    if (startInterval > start && endInterval <= end || startInterval >= start && endInterval < end) return true;
    if (start >= startInterval && end <= endInterval) return true;

    const isStartInBlockedInterval = start > startInterval && start < endInterval && end >= endInterval;
    const isEndInBlockedInterval = end < endInterval && end > startInterval && start <= startInterval;

    return isStartInBlockedInterval || isEndInBlockedInterval;
  }

  function onUpdate(newTime: ReadonlyArray<number>) {
    if (!onUpdateCallback) {
      return;
    }

    const formattedNewTime = formatInterval(newTime);

    if (formattedBlockedIntervals?.length) {
      const isValuesNotValid = formattedBlockedIntervals.some(({source, target}) => checkIsSelectedIntervalNotValid(newTime, source, target));

      onUpdateCallback({
        error: isValuesNotValid,
        time: formattedNewTime
      });
      return;
    }

    onUpdateCallback({
      error: false,
      time: formattedNewTime
    });
  }

  function getDateTicks() {
    const dates = [interval.start, interval.end];

    return scaleTime().domain(dates).ticks(ticksNumber).map(t => +t);
  }

  const domain: [number, number] = [
    Number(interval.start),
    Number(interval.end)
  ];

  return (
    <div className={containerClassName || "react_time_range__time_range_container"}>
      <Slider
        mode={mode}
        step={step}
        domain={domain}
        onUpdate={onUpdate}
        onChange={onChange}
        values={[Number(selectedInterval.start), Number(selectedInterval.end)]}
        rootStyle={{position: "relative", width: "100%"}}
      >
        <Rail>
          {({getRailProps}) => <SliderRail getRailProps={getRailProps}/>}
        </Rail>

        <Handles>
          {({handles, getHandleProps}) => (<>
            {handles.map(handle => (
              <Handle
                error={error}
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
              />
            ))}
          </>)}
        </Handles>

        <Tracks left={false} right={false}>
          {({tracks, getTrackProps}) => (<>
            {tracks?.map(({id, source, target}) =>
              <Track
                error={error}
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            )}
          </>)}
        </Tracks>

        {formattedBlockedIntervals?.length && (
          <Tracks left={false} right={false}>
            {({getTrackProps}) => (
              <>
                {formattedBlockedIntervals.map(({id, source, target}) => (
                  <Track
                    error={true}
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled
                  />
                ))}
              </>
            )}
          </Tracks>
        )}

        {showNow && (
          <Tracks left={false} right={false}>
            {({getTrackProps}) => (
              <Track
                error={false}
                key={now?.id}
                source={now?.source}
                target={now?.target}
                getTrackProps={getTrackProps}
              />
            )}
          </Tracks>
        )}

        <Ticks values={getDateTicks()}>
          {({ticks}) => (<>
            {ticks.map(tick => (
              <Tick
                key={tick.id}
                tick={tick}
                count={ticks.length}
                format={formatTick}
              />
            ))}
          </>)}
        </Ticks>
      </Slider>
    </div>
  );
}