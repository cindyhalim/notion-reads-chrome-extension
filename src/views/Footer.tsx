import React from "react";
import { Button, ButtonType } from "../components";

type FooterProps = {
  handleSettingsClick: () => void;
};
export default function Footer({ handleSettingsClick }: FooterProps) {
  return (
    <div className="w-full flex justify-between absolute left-0 bottom-0 p-4">
      <span className=" w-[100px] cursor-default">
        powered by{" "}
        <a
          href="https://notion-kindle.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold hover:underline underline-offset-1"
        >
          {"notion <> kindle"}
        </a>
      </span>
      <Button type={ButtonType.SECONDARY} onClick={handleSettingsClick}>
        settings
      </Button>
    </div>
  );
}
