import React from "react";
import {SliderItem} from "react-compound-slider";

function getTrackConfig(error: boolean, source: SliderItem, target: SliderItem, disabled: boolean): React.CSSProperties {
  const basicStyle = {
    left: `${source.percent}%`,
    width: `calc(${target.percent - source.percent}% - 1px)`,
  };

  if (disabled)
    return basicStyle;

  const coloredTrackStyle = error
    ? {
      backgroundColor: "rgba(214,0,11,0.5)",
      borderLeft: "1px solid rgba(214,0,11,0.5)",
      borderRight: "1px solid rgba(214,0,11,0.5)",
    }
    : {
      backgroundColor: "rgba(98, 203, 102, 0.5)",
      borderLeft: "1px solid #62CB66",
      borderRight: "1px solid #62CB66",
    };

  return {
    ...basicStyle,
    ...coloredTrackStyle
  };
}

type Props = {
  error: boolean,
  source: SliderItem,
  target: SliderItem,
  getTrackProps: () => React.DOMAttributes<HTMLDivElement>,
  disabled?: boolean
}

export default function Track(props: Props) {
  const {
    error,
    source,
    target,
    getTrackProps,
    disabled = false
  } = props;

  return (
    <div
      className={`react_time_range__track${disabled ? "__disabled" : ""}`}
      style={getTrackConfig(error, source, target, disabled)}
      {...getTrackProps()}
    />
  );
}