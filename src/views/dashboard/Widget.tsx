import React, { useContext } from "react";
import { WidgetDisplay } from "../../db/state";
import { EditContext } from "./Edit";

const Widget: React.FC<React.PropsWithChildren<WidgetDisplay & {id: string}>> = ({
  children,
  id,
  colour,
  fontFamily,
  fontSize = 24,
  fontWeight,
}) => {
  const {open} = useContext(EditContext)

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    open(id)
  }

  return (
  <div
    className={`Widget ${fontWeight ? "weight-override" : ""}`}
    style={{
      color: colour,
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
    }}
    onContextMenu={onContextMenu}
  >
    {children}
  </div>
)
};

export default Widget;
