import authenticate from "../utils/authentication";
import {
  TOKEN_KEY,
  WORKSPACE_EMOJI_KEY,
  WORKSPACE_NAME_KEY,
} from "../utils/constants";

const filter = {
  url: [
    {
      urlMatches: "https://notion-kindle.netlify.app/redirect?",
    },
  ],
};

function getCodeFromUrlParams(url: string) {
  // url sample: "https://notion-kindle.netlify.app/redirect?code=<uuid>&state="

  const withBeforeCodeParamRemoved = url.split("code=")?.[1];

  if (!withBeforeCodeParamRemoved) {
    return null;
  }
  const splitFromOtherParams = withBeforeCodeParamRemoved.split("&");
  return splitFromOtherParams[0];
}

chrome.webNavigation.onDOMContentLoaded.addListener(async function (data) {
  const isAuthenticated = await authenticate.getIsAuthenticated();
  if (isAuthenticated) {
    return;
  }

  const code = getCodeFromUrlParams(data.url);
  if (!code) {
    return;
  }
  const serviceUrl = process.env.REACT_APP_SERVICE_URL;

  if (code) {
    try {
      const response = await fetch(`${serviceUrl}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      }).then((data) => data.json());
      await chrome.storage.sync.set({
        [TOKEN_KEY]: response.accessToken,
        [WORKSPACE_NAME_KEY]: response.workspaceName,
        [WORKSPACE_EMOJI_KEY]: response.workspaceIcon,
      });
    } catch (e) {
      console.warn("Error authenticating to Notion ");
    }
  }
}, filter);
