import { NOTION_REDIRECT_URL } from "../utils/constants";
import authenticateWithNotion from "./utils/authenticate";
import findISBN13 from "./utils/findISBN13";

const VALID_SITE_PREFIX = "https://";

const filter = {
  url: [
    {
      urlPrefix: VALID_SITE_PREFIX,
    },
  ],
};

async function storeISBNInStorage(tabId: number, isbn: string | null) {
  await chrome.storage.local.set({ [`${tabId}`]: isbn });
}

chrome.webNavigation.onDOMContentLoaded.addListener(async function (data) {
  if (data.url.startsWith(NOTION_REDIRECT_URL)) {
    await authenticateWithNotion(data.url);
    return;
  }

  const isbn13 = await findISBN13(data.tabId);
  await storeISBNInStorage(data.tabId, isbn13);
}, filter);

chrome.tabs.onActivated.addListener(function (activeInfo) {
  const tabId = activeInfo.tabId;
  chrome.tabs.get(tabId, async function (currentTabInfo) {
    // cannot execute script in chrome URLs
    if (currentTabInfo.url?.startsWith(VALID_SITE_PREFIX)) {
      const isbn13 = await findISBN13(activeInfo.tabId);
      await storeISBNInStorage(tabId, isbn13);
    }
  });
});
