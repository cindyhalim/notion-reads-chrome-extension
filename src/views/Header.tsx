import React from "react";
import { WORKSPACE_EMOJI_KEY, WORKSPACE_NAME_KEY } from "../utils/constants";
import request from "../utils/request";

function isValidEmoji(maybeEmoji: string | undefined | null) {
  if (!maybeEmoji) {
    return false;
  }

  try {
    new URL(maybeEmoji);
    return false;
  } catch {
    return true;
  }
}

export default function Header() {
  const [workspaceDetails, setWorkspaceDetails] = React.useState<{
    name: string;
    icon: string | null;
  } | null>(null);

  const [readListDetails, setReadListDetails] = React.useState<{
    name: string;
    emoji: string | null;
    url: string;
  } | null>(null);

  React.useEffect(() => {
    const getWorkspaceDetails = async () => {
      const workspaceDetails = await chrome.storage.sync.get([
        WORKSPACE_NAME_KEY,
        WORKSPACE_EMOJI_KEY,
      ]);

      setWorkspaceDetails({
        name: workspaceDetails[WORKSPACE_NAME_KEY],
        icon: workspaceDetails[WORKSPACE_EMOJI_KEY],
      });
    };

    const getReadListDetails = async () => {
      const response = await request.fetch<{
        pages: {
          name: string;
          emoji: string | null;
          url: string;
        }[];
      }>(`${process.env.REACT_APP_SERVICE_URL}/read-list/details`, {
        method: "GET",
      });

      // TODO: handle multiple read lists
      const details = response.pages[0];

      setReadListDetails({
        name: details.name,
        emoji: details.emoji,
        url: details.url,
      });
    };

    getWorkspaceDetails();
    getReadListDetails();
  }, []);

  return (
    <div className="flex align-bottom cursor-default m-4">
      <div>
        {isValidEmoji(workspaceDetails?.icon) ? workspaceDetails?.icon : ""}
        <span className="text-sm ml-1">{workspaceDetails?.name}</span>
      </div>
      <span className="text-sm mx-1">/</span>
      <div>
        {readListDetails?.emoji ?? ""}
        <a
          href={readListDetails?.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm ml-1 hover:underline underline-offset-4 cursor-pointer"
        >
          {readListDetails?.name}
        </a>
      </div>
    </div>
  );
}
