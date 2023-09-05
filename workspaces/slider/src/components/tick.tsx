import React from "react";

type Props = {
  tick: {
    id: string,
    value: number,
    percent: number
  }
}

export default function Tick(props: Props) {
  const {
    tick
  } = props;

  const isFullHour = tick.value % 3600 === 0;

  return (
    <>
      <div
        className={`react_time_range__tick_marker${isFullHour ? "__large" : ""}`}
        style={{left: `${tick.percent}%`}}
      />
    </>
  );
}