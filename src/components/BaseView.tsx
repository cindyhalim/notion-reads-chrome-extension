import React from "react";
import { Button } from "./Button";

type BaseViewProps = {
  emoji: string;
  title: string;
  subtitle: string | React.ReactNode;
  button?: {
    link: string;
    text: string;
  };
};

export default function BaseView({
  emoji,
  title,
  subtitle,
  button,
}: BaseViewProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <div className="m-4">
        <h2 className="text-2xl">{emoji}</h2>
        <h2 className="font-semibold text-2xl mb-4 text-neutral-800">
          {title}
        </h2>
        <h3 className="font-base text-sm text-neutral-600 mb-8">{subtitle}</h3>
      </div>
      {button && <Button link={button.link}>{button.text}</Button>}
    </div>
  );
}
