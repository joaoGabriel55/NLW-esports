import React from "react";

import { Background } from "../../components/Background";

interface Props {
  children: React.ReactNode;
}

export function Template({ children }: Props) {
  return <Background>{children}</Background>;
}
