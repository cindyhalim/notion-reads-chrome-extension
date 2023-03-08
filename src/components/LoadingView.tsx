import React from "react";
import Loading from "./Loading";

export default function LoadingView({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <Loading dimensions="80px" />
      <p className="font-semibold text-sm text-neutral-900 mt-4">{children}</p>
    </div>
  );
}
