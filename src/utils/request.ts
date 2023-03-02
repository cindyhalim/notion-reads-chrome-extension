import authenticate from "./authentication";

type RequestMethod = "GET" | "POST";

async function createAuthorizedRequest<T = any>(
  url: string,
  {
    method,
  }: {
    method: RequestMethod;
  }
) {
  const accessToken = await authenticate.getAccessToken();
  let headers = {};
  if (accessToken) {
    const base64EncodedToken = window.btoa(accessToken);

    headers = {
      ...headers,
      Authorization: `Bearer ${base64EncodedToken}`,
    };
  }
  const response = await fetch(url, {
    method,
    headers,
  }).then((result) => result.json());

  return response as T;
}

const request = {
  fetch: createAuthorizedRequest,
};

export default request;
