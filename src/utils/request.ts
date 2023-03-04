import authenticate from "./authentication";

type RequestMethod = "GET" | "POST" | "PUT";

async function createAuthorizedRequest<T = any>(
  url: string,
  {
    method,
    body,
  }: {
    method: RequestMethod;
    body?: Record<any, any>;
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

  if (body) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  }).then((result) => result.json());

  return response as T;
}

const request = {
  fetch: createAuthorizedRequest,
};

export default request;
