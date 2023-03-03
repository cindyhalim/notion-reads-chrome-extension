import { NOTION_REDIRECT_URL } from "../utils/constants";
import authenticateWithNotion from "./helpers/authenticate";
import findISBN13 from "./helpers/findISBN13";

const VALID_SITE_PREFIX = "https://";
const filter = {
  url: [
    {
      urlPrefix: VALID_SITE_PREFIX,
    },
  ],
};
chrome.webNavigation.onDOMContentLoaded.addListener(async function (data) {
  if (data.url.startsWith(NOTION_REDIRECT_URL)) {
    await authenticateWithNotion(data.url);
    return;
  }

  findISBN13(data.tabId);
}, filter);

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (currentTabInfo) {
    // cannot execute script in chrome URLs
    if (currentTabInfo.url?.startsWith(VALID_SITE_PREFIX)) {
      findISBN13(activeInfo.tabId);
    }
  });
});
