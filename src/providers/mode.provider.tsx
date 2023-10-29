import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface IModeProvider {
  mode: number;
  setMode: Dispatch<SetStateAction<number>>;
}

const ModeContext = createContext<IModeProvider | undefined>(undefined);

export const ModeProvider = ({ children }: any) => {
  const [mode, setMode] = useState<number>(0);
  return <ModeContext.Provider value={{ mode, setMode }} children={children} />;
};

export const useMode = () => {
  const mode = useContext<IModeProvider | undefined>(ModeContext);
  return mode;
};
