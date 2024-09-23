import Navbar from "@/components/navbar/navbar";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="pt-20 px-[5%] ">
      <Navbar />
      {props.children}
    </div>
  );
};

export default Layout;
