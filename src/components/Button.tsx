import React from "react";

export enum ButtonType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

type ButtonProps = {
  link?: string;
  type?: ButtonType;
  onClick?: () => void;
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
  onClick,
  type = ButtonType.PRIMARY,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const { container, text } = getButtonStyles(type);

  if (onClick) {
    return (
      <div
        className={`rounded-md py-2 px-4 text-center ${container} text-sm font-semibold ${text} cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  if (link) {
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

  return null;
}
