import React from "react";

export enum ButtonType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

type ButtonProps = {
  link: string;
  type?: ButtonType;
};

function getButtonStyles(type: ButtonType) {
  switch (type) {
    case ButtonType.SECONDARY:
      return {
        container: "hover:bg-neutral-100",
        text: "text-neutral-800 ",
      };
    default:
      return {
        container: "bg-neutral-800 hover:bg-neutral-600",
        text: "text-white ",
      };
  }
}

export function Button({
  link,
  type = ButtonType.PRIMARY,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const { container, text } = getButtonStyles(type);

  return (
    <div className={`rounded-md py-2 px-4 text-center ${container}`}>
      <a
        target="_blank"
        rel="noreferrer"
        href={link}
        className={`text-sm font-semibold ${text}`}
      >
        {children}
      </a>
    </div>
  );
}
