import React from "react";
import {SliderItem} from "react-compound-slider";

type Props = {
  source: SliderItem,
  target: SliderItem,
  getTrackProps: () => React.DOMAttributes<HTMLDivElement>
}

export default function Track(props: Props) {
  const {
    source,
    target,
    getTrackProps
  } = props;

  const trackStyle = {
    left: `${source.percent}%`,
    width: `calc(${target.percent - source.percent}% - 1px)`,
    backgroundColor: "rgba(52, 146, 220, 0.5)",
    borderLeft: "1px solid #62CB66",
    borderRight: "1px solid #62CB66",
  };

  return (
    <div
      className="react_time_range__track"
      style={trackStyle}
      {...getTrackProps()}
    />
  );
}