import React, { FC, useEffect, useMemo } from "react";
import "./Shortcuts.sass";
import { useKeyPress } from "../../../hooks";

type Props = {
  value?: string;
  showCase?: 'lower' | 'upper';
  onAction: () => void;
};

const Shortcuts: FC<React.PropsWithChildren<Props>> = ({
  children,
  value,
  showCase,
  onAction,
}) => {
  const [action, setAction] = React.useState(false);
  const showValue = useMemo(() => {
    switch (showCase) {
      case "lower":
        return value?.toLowerCase();
      case "upper":
        return value?.toUpperCase();
      default:
        return value;
    }
  }, [value])
  useKeyPress(() => {
    setAction(true);
    setTimeout(() => {
      setAction(false);
      onAction();
    }, 60);
  }, [value ?? '']);

  return (
    <div className={`Shortcuts ${action ? "action" : ""}`}>
      {children}
      <span className="mark">{showValue}</span>
    </div>
  );
};

export default Shortcuts;
