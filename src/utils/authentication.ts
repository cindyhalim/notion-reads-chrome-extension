import { TOKEN_KEY } from "./constants";

async function getAccessToken(): Promise<string | null> {
  const accessToken = await chrome.storage.sync
    .get([TOKEN_KEY])
    .then((value) => value?.[TOKEN_KEY] ?? null);
  return accessToken;
}

async function getIsAuthenticated() {
  const hasAccessToken = await getAccessToken();
  return Boolean(hasAccessToken);
}

const authenticate = {
  getAccessToken,
  getIsAuthenticated,
};

export default authenticate;
