import React from "react";

type HeaderProps = {
  workspaceDetails: {
    icon: string | null;
    name: string;
  };
  readListDetails: {
    emoji: string;
    url: string;
    name: string;
  };
};

export default function Header({
  workspaceDetails,
  readListDetails,
}: HeaderProps) {
  return (
    <div className="flex align-bottom cursor-default m-4">
      <div>
        {workspaceDetails.icon}
        <span className="text-sm ml-1">{workspaceDetails.name}</span>
      </div>
      <span className="text-sm mx-1">/</span>
      <div>
        {readListDetails.emoji}
        <a
          href={readListDetails.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm ml-1 hover:underline underline-offset-4 cursor-pointer"
        >
          {readListDetails.name}
        </a>
      </div>
    </div>
  );
}
