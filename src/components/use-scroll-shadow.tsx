import React, { useState } from "react";

const top = "inset 0 8px 5px -5px rgb(200 200 200 / 1)";
const bottom = "inset 0 -8px 5px -5px rgb(200 200 200 / 1)";

export function useScrollWithShadow() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const onScrollHandler = (event: React.UIEvent) => {
    const target = event.target as HTMLElement;
    setScrollTop(target.scrollTop);
    setScrollHeight(target.scrollHeight);
    setClientHeight(target.clientHeight);
  };

  function getBoxShadow() {
    const scrollPercent =
      Math.abs(Math.floor((scrollTop / (clientHeight - scrollHeight)) * 100)) ||
      0;

    if (clientHeight - scrollHeight === 0) {
      return "none";
    }

    return [scrollPercent > 0 ? top : null, scrollPercent < 100 ? bottom : null]
      .filter(Boolean)
      .join(",");
  }

  return {
    boxShadow: getBoxShadow(),
    onScrollHandler,
    hight: scrollHeight,
  };
}
