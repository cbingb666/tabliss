import icons from "feather-icons/dist/icons.json";
import React, { FC } from "react";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
} from "../../../views/shared";
import { Link } from "./types";
import { getDomain, getIcon } from "../../shared/util";
import './Input.sass';

type Props = Link & {
  number: number;
  onChange: (values: Partial<Link>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const Input: FC<Props> = (props) => {
  const domain = getDomain(props.url);
  return (
    <div className="LinkInput">
      <h5>
        <div className="title--buttons">
          <IconButton onClick={props.onRemove} title="Remove link">
            <RemoveIcon />
          </IconButton>
          {props.onMoveDown && (
            <IconButton onClick={props.onMoveDown} title="Move link down">
              <DownIcon />
            </IconButton>
          )}
          {props.onMoveUp && (
            <IconButton onClick={props.onMoveUp} title="Move link up">
              <UpIcon />
            </IconButton>
          )}
        </div>

        <div className="title">
          {props.number}.
          {domain && (
            <img
              style={{ display: "inline-block", marginLeft: 12 }}
              width={18}
              height={18}
              alt={domain}
              src={getIcon(domain)}
            />
          )}
          {props.name || domain || "New Link"}
        </div>
      </h5>

      <label>
        URL
        <input
          type="url"
          value={props.url}
          onChange={(event) => props.onChange({ url: event.target.value })}
        />
      </label>

      <label>
        Name <span className="text--grey">(optional)</span>
        <input
          type="text"
          value={props.name}
          onChange={(event) => props.onChange({ name: event.target.value })}
        />
      </label>

      <label>
        Icon <span className="text--grey">(optional)</span>
        <select
          value={props.icon}
          onChange={(event) => props.onChange({ icon: event.target.value })}
        >
          <option value={""}>None</option>
          <option value="_favicon">Website Icon</option>
          <optgroup label="Feather Icons">
            {iconList.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </optgroup>
        </select>
      </label>

      <hr />
    </div>
  );
};

export default Input;
