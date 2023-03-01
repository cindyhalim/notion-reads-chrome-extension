import React from "react";
import { BaseView } from "../components";

export default function UnauthenticatedView() {
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
        link: "https://api.notion.com/v1/oauth/authorize",
        text: "Authorize Notion",
      }}
    />
  );
}
