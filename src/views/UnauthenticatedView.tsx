import React from "react";
import { BaseView } from "../components";

const NOTION_AUTHORIZATION_BASE_URL =
  "https://api.notion.com/v1/oauth/authorize";

export default function UnauthenticatedView() {
  const urlParams = new URLSearchParams({
    client_id: process.env.REACT_APP_NOTION_CLIENT_ID || "",
    redirect_uri: "https://notion-kindle.netlify.app/auth/success",
    response_type: "code",
    owner: "user",
  });

  const notionAuthorizeUrl = `${NOTION_AUTHORIZATION_BASE_URL}?${urlParams.toString()}`;

  return (
    <BaseView
      emoji="🧐"
      title="Get started"
      subtitle={
        <>
          Authorize access to your Notion reading list to get started. You will
          need{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://api.notion.com/v1/oauth/authorize"
            className="hover:text-neutral-500 underline underline-offset-1"
          >
            this Notion reads template
          </a>{" "}
          template for this to work.
        </>
      }
      button={{
        link: notionAuthorizeUrl,
        text: "Authorize Notion",
      }}
    />
  );
}
