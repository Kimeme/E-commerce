"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void; // click handler function
  children: React.ReactNode; // text or nested element
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition"
    >
      {children}
    </div>
  );
};

export default MenuItem;
