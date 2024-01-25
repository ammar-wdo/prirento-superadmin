import SideBar from "@/components/side-bar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
        <SideBar />
      <main className="pl-80 p-20">{children}</main>
    </div>
  );
};

export default layout;
