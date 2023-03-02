import React from "react";

export default function Header() {
  const pages = {
    workspace: {
      emoji: "🌱",
      name: "cindy's workspace",
    },
    reads: {
      emoji: "📚",
      name: "reads",
      link: "",
    },
  };
  return (
    <div className="flex align-bottom cursor-default m-4">
      <div>
        {pages.workspace.emoji}
        <span className="text-sm ml-0.5">{pages.workspace.name}</span>
      </div>
      <span className="text-sm mx-1">/</span>
      <div>
        {pages.reads.emoji}
        <a
          href={pages.reads.link}
          target="_blank"
          rel="noreferrer"
          className="text-sm ml-0.5 hover:underline underline-offset-4 cursor-pointer"
        >
          {pages.reads.name}
        </a>
      </div>
    </div>
  );
}
