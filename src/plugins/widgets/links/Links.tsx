import React, { FC, useMemo, useEffect, useState } from "react";

import { useKeyPress, useToggle } from "../../../hooks";
import { Icon } from "../../../views/shared";
import Display from "./Display";
import { Props, defaultData } from "./types";
import "./Links.sass";
import Shortcuts from "./Shortcuts";

const shortcutsTable = [
  "a",
  "s",
  "d",
  "f",
  "q",
  "w",
  "e",
  "r",
  "z",
  "x",
  "c",
  "v",
  "g",
  "h",
  "t",
  "y",
  "v",
  "b",
  "j",
  "k",
  "l",
  "u",
  "i",
  "o",
  "p",
  "n",
  "m",
];

const Links: FC<Props> = ({ data = defaultData }) => {
  const [visible, toggleVisible] = useToggle();

  const [shortcuts, setShortcuts] = useState<string[]>([]);

  const onShortcutsAction = (url: string) => {
    data.linkOpenStyle
      ? window.open(url, "_blank")
      : window.location.assign(url);
  };

  useEffect(() => {
    const _shortcuts = data.links.map((_, index) => shortcutsTable.shift()!);
    setShortcuts(_shortcuts);
    return () => {
      shortcutsTable.unshift(..._shortcuts);
    }
  }, [])

  return (
    <div
      className="Links"
      style={{
        gridTemplateColumns:
          data.visible || visible ? "1fr ".repeat(data.columns) : "1fr",
        textAlign: data.columns > 1 ? "left" : "inherit",
      }}
    >
      {data.visible || visible ? (
        data.links.map((link, index) => (
          <Shortcuts
            key={index}
            value={shortcuts[index]}
            showCase={'upper'}
            onAction={() => onShortcutsAction(link.url)}
          >
            <Display
              number={index + 1}
              linkOpenStyle={data.linkOpenStyle}
              {...link}
            />
          </Shortcuts>
        ))
      ) : (
        <a onClick={toggleVisible} title="Show quick links">
          <Icon name="link-2" />
        </a>
      )}
    </div>
  );
};

export default Links;
