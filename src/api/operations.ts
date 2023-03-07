import { WORKSPACE_EMOJI_KEY, WORKSPACE_NAME_KEY } from "../utils/constants";
import request from "../utils/request";
import type {
  GetBookDetailsResponse,
  GetReadListResponse,
  SaveBookToReadListPayload,
  SaveBookToReadListResponse,
} from "./types";

const serviceUrl = process.env.REACT_APP_SERVICE_URL;

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

async function getNotionMetadata() {
  const workspaceDetails: {
    [key: string]: string | null;
  } = await chrome.storage.sync.get([WORKSPACE_NAME_KEY, WORKSPACE_EMOJI_KEY]);

  const response = await request.fetch<GetReadListResponse>(
    `${serviceUrl}/read-list/details`,
    {
      method: "GET",
    }
  );
  // TODO: handle multiple read lists
  const details = response.pages[0];

  return {
    workspaceDetails: {
      name: workspaceDetails[WORKSPACE_NAME_KEY],
      icon: isValidEmoji(workspaceDetails[WORKSPACE_EMOJI_KEY])
        ? workspaceDetails[WORKSPACE_EMOJI_KEY]
        : null,
    },
    readListDetails: details,
  };
}

async function getBookDetails(isbn: string | null) {
  if (!isbn) {
    throw Error("No ISBN");
  }

  const response = await request.fetch<GetBookDetailsResponse>(
    `${serviceUrl}/book/?isbn=${isbn}`,
    {
      method: "GET",
    }
  );

  const bookDetails = response.data;
  console.log("hii book details", bookDetails);
  return bookDetails;
}

async function saveBookToReadList({
  databaseId,
  body,
}: SaveBookToReadListPayload) {
  if (!databaseId) {
    throw Error("Missing databaseId parameter");
  }

  const response = await request.fetch<SaveBookToReadListResponse>(
    `${serviceUrl}/read-list/${databaseId}/book`,
    {
      method: "PUT",
      body,
    }
  );

  return response;
}

const operations = {
  getNotionMetadata: {
    key: "get-notion-metadata",
    fn: getNotionMetadata,
  },
  getBookDetails: {
    key: "get-book-details",
    fn: getBookDetails,
  },
  saveBookToReadList: {
    key: "save-book-to-read-list",
    fn: saveBookToReadList,
  },
};

export default operations;
