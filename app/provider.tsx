import React, { ReactNode } from "react";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

const Provider = (props: Props) => {
  return (
    <div>
      {props.children}
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Provider;
