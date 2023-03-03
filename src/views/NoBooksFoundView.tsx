import React from "react";
import { BaseView } from "../components";

export default function NoBooksFoundView() {
  return (
    <BaseView
      emoji="😵‍💫"
      title="No books found"
      subtitle="Please navigate to a site that contains book details."
    />
  );
}
