import React from "react";

export enum ButtonType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  ERROR = "ERROR",
}

export type ButtonProps = {
  link?: string;
  type?: ButtonType;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

function getButtonStyles(type: ButtonType) {
  switch (type) {
    case ButtonType.SECONDARY:
      return {
        container: "hover:bg-neutral-100 disabled:opacity-60 ",
        text: "text-neutral-800 ",
      };
    case ButtonType.ERROR:
      return {
        container: "bg-red-500 hover:bg-red-300",
        text: "text-white ",
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
  disabled = false,
  fullWidth = false,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const { container, text } = getButtonStyles(type);

  const commonStyles = `${
    fullWidth && "w-full"
  } rounded-md py-2 px-4 text-center ${container} text-sm font-semibold ${text} cursor-pointer disabled:cursor-not-allowed`;

  if (onClick) {
    return (
      <button disabled={disabled} className={commonStyles} onClick={onClick}>
        {link ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={link}
            className={`text-sm font-semibold ${text}`}
          >
            {children}
          </a>
        ) : (
          children
        )}
      </button>
    );
  }

  if (link) {
    return (
      <button disabled={disabled} className={commonStyles}>
        <a target="_blank" rel="noreferrer" href={link}>
          {children}
        </a>
      </button>
    );
  }

  return null;
}
