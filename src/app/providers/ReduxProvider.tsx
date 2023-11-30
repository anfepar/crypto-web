"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../lib/store";

interface ReduxProvierProps {
  children: ReactNode
}

export function ReduxProvider({ children }: ReduxProvierProps) {
  return <Provider store={store}>{children}</Provider>;
}