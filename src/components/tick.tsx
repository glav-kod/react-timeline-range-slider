import {getMinutes} from "date-fns";
import React from "react";

type Props = {
  tick: {
    id: string,
    value: number,
    percent: number
  },
  count: number,
  format: (value: number) => string
}

export default function Tick(props: Props) {
  const {
    tick,
    count,
    format
  } = props;

  const isFullHour = !getMinutes(tick.value);

  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  };

  return (
    <>
      <div
        className={`react_time_range__tick_marker${isFullHour ? "__large" : ""}`}
        style={{left: `${tick.percent}%`}}
      />
      {isFullHour && (
        <div className="react_time_range__tick_label" style={tickLabelStyle}>
          {format(tick.value)}
        </div>
      )}
    </>
  );
}