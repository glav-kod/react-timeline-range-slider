import React from "react";

type Props = {
  getRailProps: () => React.DOMAttributes<HTMLDivElement>
}

export default function SliderRail(props: Props) {
  return (
    <>
      <div className="react_time_range__rail__outer" {...props.getRailProps()} />
      <div className="react_time_range__rail__inner"/>
    </>
  );
}
