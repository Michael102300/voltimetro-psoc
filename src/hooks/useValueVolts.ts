import { useMode } from "../providers/mode.provider";

interface IUseValueVolts {
  degress: () => string;
  voltsDisplay: () => void;
  voltsIndicator: () => number;
}

const useValueVolts = (): IUseValueVolts => {
  const mode = useMode();

  const degress = (): string => {
    switch (mode?.mode) {
      case 0:
        if (mode.currentVolt > 500) {
          return "90deg";
        } else if (mode.currentVolt > -500) {
          return `270deg`;
        } else {
          /* if (mode.currentVolt < -500 && mode.currentVolt < 0) {
            return `${(9 / 50) * mode.currentVolt + 270}deg`;
          } else {
          } */
          return `${(9 / 50) * mode.currentVolt}deg`;
        }

      case 1:
        if (mode.currentVolt > 5000) {
          return "90deg";
        } else if (mode.currentVolt > -5000) {
          return `270deg`;
        } else {
          /* if (mode.currentVolt < -5000 && mode.currentVolt < 0) {
            return `${(9 / 500) * mode.currentVolt + 270}deg`;
          } else {
          } */
          return `${(9 / 500) * mode.currentVolt}deg`;
        }
      case 2:
        if (mode.currentVolt > 50000) {
          return "90deg";
        } else if (mode.currentVolt > -50000) {
          return `270deg`;
        } else {
          /* if (mode.currentVolt < -50000) {
            return `${(9 / 5000) * mode.currentVolt + 270}deg`;
          } else {
          } */
          return `${(9 / 5000) * mode.currentVolt}deg`;
        }

      default:
        return `${0}deg`;
    }
  };

  const voltsDisplay = () => {
    switch (mode?.mode) {
      case 0:
        if (mode.currentVolt > 500 || mode.currentVolt < -500) {
          return "Out of Range";
        } else {
          return `${mode.currentVolt}mV`;
        }
      case 1:
        if (mode.currentVolt > 5000 || mode.currentVolt < -5000) {
          return "Out of Range";
        } else {
          if (mode.currentVolt < 1000 && mode.currentVolt > 0) {
            return `0.${mode.currentVolt
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          } else if (mode.currentVolt >= -1000 && mode.currentVolt < 0) {
            return `- 0.${mode.currentVolt
              .toString()
              .replace("-", "")
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          } else {
            return `${mode.currentVolt
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          }
        }
      case 2:
        if (mode.currentVolt > 50000 || mode.currentVolt < -50000) {
          return "Out of Range";
        } else {
          if (mode.currentVolt < 1000 && mode.currentVolt > 0) {
            return `0.${mode.currentVolt
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          } else if (mode.currentVolt >= -1000 && mode.currentVolt < 0) {
            return `-0.${mode.currentVolt
              .toString()
              .replace("-", "")
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          } else {
            return `${mode.currentVolt
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}V`;
          }
        }
    }
  };

  const voltsIndicator = (): number => {
    switch (mode?.mode) {
      case 0:
        return (1 / 10) * mode.currentVolt + 50;
      case 1:
        return (1 / 100) * mode.currentVolt + 50;
      case 2:
        return (1 / 1000) * mode.currentVolt + 50;
      default:
        return 50;
    }
  };

  return {
    degress,
    voltsDisplay,
    voltsIndicator,
  };
};

export default useValueVolts;
