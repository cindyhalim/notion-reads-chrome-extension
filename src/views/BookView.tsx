import React from "react";

import BookFoundView from "./BookFoundView";
import NoBooksFoundView from "./NoBooksFoundView";

export default function BookView() {
  const [ISBN, setISBN] = React.useState<string | null>();

  React.useEffect(() => {
    async function getISBN(tabId: number) {
      const tabIdToString = `${tabId}`;
      const ISBN = await chrome.storage.local
        .get(tabIdToString)
        .then((value): string | null => {
          if (value?.[tabIdToString] === "null") {
            return null;
          }

          return value?.[tabIdToString] ?? null;
        });

      setISBN(ISBN);
    }

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const tabId = tabs[0].id;

        if (tabId) {
          getISBN(tabId);
        }
      }
    );
  }, []);

  if (!ISBN) {
    return <NoBooksFoundView />;
  }

  return <BookFoundView isbn={ISBN} />;
}
