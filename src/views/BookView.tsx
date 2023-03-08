import React from "react";

import BookFoundView from "./BookFoundView";
import NoBooksFoundView from "./NoBooksFoundView";

type BookViewProps = {
  databaseId: string | null;
};

export default function BookView({ databaseId }: BookViewProps) {
  const [ISBN, setISBN] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getISBN(tabId: number) {
      const tabIdToString = `${tabId}`;
      const ISBN = await chrome.storage.session
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

  return (
    <div className="h-[80%]  w-full flex justify-center items-center">
      <BookFoundView ISBN={ISBN} databaseId={databaseId} />
    </div>
  );
}
