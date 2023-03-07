import React from "react";

type LoadingProps = {
  dimensions?: string;
  isDark?: boolean;
};
export default function Loading({
  dimensions = "40px",
  isDark = true,
}: LoadingProps) {
  return (
    <div
      style={{ width: dimensions, height: dimensions }}
      className="self-center"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="animate-spin"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          className={isDark ? "stroke-neutral-900" : "stroke-white"}
          stroke-width="8"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
          transform="matrix(1,0,0,1,0,0)"
        ></circle>
      </svg>
    </div>
  );
}
