import React from "react";
import TimelineInterval from "../types/timeline-interval";
import TimeOnly from "../types/time-only";

type Props = {
  domain: [number, number],
  handle: {
    id: string,
    value: number,
    percent?: number
  },
  getHandleProps: (id: string) => React.DOMAttributes<HTMLDivElement>,
  currentInterval: TimelineInterval
}

export default function Handle(props: Props) {
  const {
    domain: [min, max],
    handle: {
      id,
      value,
      percent = 0
    },
    getHandleProps,
    currentInterval
  } = props;

  const leftPosition = `${percent}%`;

  const timeOnly = TimeOnly.FromSeconds(value);

  const isLeft = currentInterval.start.seconds === timeOnly.seconds;

  const tickLabelStyle: React.CSSProperties = {};

  if (isLeft) {
    tickLabelStyle.left = "-250%";
  } else {
    tickLabelStyle.left = "350%";
  }

  return (
    <>
      <div className="react_time_range__handle_wrapper" style={{left: leftPosition}} {...getHandleProps(id)} />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="react_time_range__handle_container"
        style={{left: leftPosition}}
      >
        <div className="react_time_range__handle_marker"/>
        <div className="react_time_range__tick_label" style={tickLabelStyle}>
          {timeOnly.timeString}
        </div>
      </div>
    </>
  );
}