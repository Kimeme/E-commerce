import { IconType } from "react-icons";
import React from "react";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon, bg, color }) => {
  return (
    <div className={`${bg} ${color} px-2 py-1 rounded flex items-center gap-1`}>
      {React.createElement(icon, { size: 15 })}
      <span>{text}</span>
    </div>
  );
};

export default Status;
