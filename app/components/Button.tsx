'use client';

import { IconType } from "react-icons";

// ✅ Extend native button props so type, onClick, disabled, etc. work
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  outline,
  small,
  custom,
  icon: Icon,
  ...props // <-- spreads native button props like type, onClick, disabled
}) => {
  return (
    <button
      {...props} // important!
      className={`
        disabled:opacity-70 disabled:cursor-not-allowed 
        rounded-md
        hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 
        ${outline ? "bg-white" : "bg-slate-700"} 
        ${outline ? "text-slate-700" : "text-white"}
        ${small ? "text-sm font-light" : "text-md font-semibold"}
        ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
        ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;