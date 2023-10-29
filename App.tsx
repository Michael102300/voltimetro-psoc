import React from "react";

import { ModeProvider } from "./src/providers/mode.provider";
import HomePage from "./src/pages/Home";

export default function App() {
  return (
    <ModeProvider>
      <HomePage />
    </ModeProvider>
  );
}
