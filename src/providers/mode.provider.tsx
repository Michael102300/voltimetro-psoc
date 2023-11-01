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
  volts: number[];
  setVolts: Dispatch<SetStateAction<number[]>>;
  seconds: string[];
  setSeconds: Dispatch<SetStateAction<string[]>>;
  currentVolt: number;
  setCurrentVolt: Dispatch<SetStateAction<number>>;
  labels: string[];
  setLabels: Dispatch<SetStateAction<string[]>>;
}

const ModeContext = createContext<IModeProvider | undefined>(undefined);

export const ModeProvider = ({ children }: any) => {
  const [mode, setMode] = useState<number>(0);
  const [volts, setVolts] = useState<number[]>([]);
  const [seconds, setSeconds] = useState<string[]>([]);
  const [currentVolt, setCurrentVolt] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        volts,
        setVolts,
        seconds,
        setSeconds,
        currentVolt,
        setCurrentVolt,
        labels,
        setLabels,
      }}
      children={children}
    />
  );
};

export const useMode = () => {
  const mode = useContext<IModeProvider | undefined>(ModeContext);
  return mode;
};
