import React from "react";

type Props = {
  error: boolean,
  domain: [number, number],
  handle: {
    id: string,
    value: number,
    percent?: number
  },
  getHandleProps: (id: string) => React.DOMAttributes<HTMLDivElement>,
  disabled?: boolean
}

export default function Handle(props: Props) {
  const {
    error,
    domain: [min, max],
    handle: {
      id,
      value,
      percent = 0
    },
    disabled = false,
    getHandleProps
  } = props;

  const leftPosition = `${percent}%`;

  return (
    <>
      <div className="react_time_range__handle_wrapper" style={{left: leftPosition}} {...getHandleProps(id)} />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`react_time_range__handle_container${disabled ? "__disabled" : ""}`}
        style={{left: leftPosition}}
      >
        <div className={`react_time_range__handle_marker${error ? "__error" : ""}`}/>
      </div>
    </>
  );
}