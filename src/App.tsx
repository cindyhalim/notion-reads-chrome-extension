import React from "react";

import operations from "./api/operations";
import { GetReadListResponse } from "./api/types";

import AuthWrapper from "./containers/AuthWrapper";
import { WORKSPACE_EMOJI_KEY, WORKSPACE_NAME_KEY } from "./utils/constants";
import request from "./utils/request";
import BookView from "./views/BookView";
import Header from "./views/Header";

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

function App() {
  const [workspaceDetails, setWorkspaceDetails] = React.useState<{
    name: string;
    icon: string | null;
  } | null>(null);
  const [readListDetails, setReadListDetails] = React.useState<{
    name: string;
    emoji: string | null;
    url: string;
    databaseId: string;
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
      const response = await request.fetch<GetReadListResponse>(
        `${process.env.REACT_APP_SERVICE_URL}/read-list/details`,
        {
          method: "GET",
        }
      );

      // TODO: handle multiple read lists
      const details = response.pages[0];

      setReadListDetails({
        name: details.name,
        emoji: details.emoji,
        url: details.url,
        databaseId: details.databaseId,
      });
    };

    getWorkspaceDetails();
    getReadListDetails();
  }, []);
  React.useEffect(() => {
    const getWorkspaceDetails = async () => {
      const workspaceDetails = await chrome.storage.sync.get([
        WORKSPACE_NAME_KEY,
        WORKSPACE_EMOJI_KEY,
      ]);

      setWorkspaceDetails({
        name: workspaceDetails[WORKSPACE_NAME_KEY],
        icon: isValidEmoji(workspaceDetails[WORKSPACE_EMOJI_KEY])
          ? workspaceDetails[WORKSPACE_EMOJI_KEY]
          : "",
      });
    };

    getWorkspaceDetails();
  }, []);

  return (
    <div
      style={{
        height: "500px",
        width: "400px",
      }}
    >
      <AuthWrapper>
        <Header
          workspaceDetails={{
            name: workspaceDetails?.name || "",
            icon: workspaceDetails?.icon || null,
          }}
          readListDetails={{
            name: readListDetails?.name || "",
            emoji: readListDetails?.emoji || "",
            url: readListDetails?.url || "",
          }}
        />
        <BookView databaseId={readListDetails?.databaseId ?? null} />
      </AuthWrapper>
    </div>
  );
}

export default App;
