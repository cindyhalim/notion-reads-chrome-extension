import authenticate from "../../utils/authentication";
import {
  TOKEN_KEY,
  WORKSPACE_EMOJI_KEY,
  WORKSPACE_NAME_KEY,
} from "../../utils/constants";
import request from "../../utils/request";

function getCodeFromUrlParams(url: string) {
  // url sample: "https://notion-kindle.netlify.app/auth/success?code=<uuid>&state="
  const withBeforeCodeParamRemoved = url.split("code=")?.[1];

  if (!withBeforeCodeParamRemoved) {
    return null;
  }
  const splitFromOtherParams = withBeforeCodeParamRemoved.split("&");
  return splitFromOtherParams[0];
}

async function authenticateWithNotion(redirectUrl: string) {
  const isAuthenticated = await authenticate.getIsAuthenticated();
  if (isAuthenticated) {
    return;
  }

  const code = getCodeFromUrlParams(redirectUrl);
  if (!code) {
    return;
  }
  const serviceUrl = process.env.REACT_APP_SERVICE_URL;

  if (code) {
    try {
      const response = await request.fetch(
        `${serviceUrl}/authenticate/?mode=extension`,
        {
          method: "POST",
          body: { code },
        }
      );

      await chrome.storage.sync.set({
        [TOKEN_KEY]: response.accessToken,
        [WORKSPACE_NAME_KEY]: response.workspaceName,
        [WORKSPACE_EMOJI_KEY]: response.workspaceIcon,
      });
    } catch (e) {
      console.warn("Error authenticating to Notion");
    }
  }
}

export default authenticateWithNotion;
