import { TOKEN_KEY } from "./constants";

async function getAccessToken() {
  const accessToken = await chrome.storage.sync
    .get([TOKEN_KEY])
    .then((value) => value?.[TOKEN_KEY]?.accessToken ?? null);
  return accessToken;
}

async function getIsAuthenticated() {
  return await getAccessToken();
}

const authenticate = {
  getAccessToken,
  getIsAuthenticated,
};

export default authenticate;
