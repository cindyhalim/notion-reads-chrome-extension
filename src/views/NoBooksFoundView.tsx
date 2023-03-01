import React from "react";
import { BaseView } from "../components";

export default function NoBooksFoundView() {
  return (
    <BaseView
      emoji="😵‍💫"
      title="No books found"
      subtitle="Is the tab you're on currently displaying a book?"
    />
  );
}
