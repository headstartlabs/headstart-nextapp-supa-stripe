import React from "react";

type ButtonProps = {
  variant?: "slim" | "flat";
  active?: boolean;
  width?: number;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "flat",
  children,
  active,
  width,
  loading = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        px-10 py-t rounded-md bg-blue-500  text-white transition ease-in-out duration-150 shadow-sm font-semibold text-center uppercase items-center
        ${
          variant === "flat"
            ? "bg-white text-zinc-800 border border-transparent"
            : ""
        }
        ${variant === "slim" ? "py-2 transform-none normal-case" : ""}
        ${active ? "bg-blue-800 " : "hover:bg-blue-700"}
        ${
          loading
            ? "bg-zinc-700 text-zinc-500 border-zinc-600 cursor-not-allowed"
            : ""
        }
      `}
      disabled={disabled}
      style={{
        width,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
