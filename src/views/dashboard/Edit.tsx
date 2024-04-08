import React, {
  FC,
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";
import Modal from "../shared/modal/Modal";
import { db } from "../../db/state";
import { selectWidgets } from "../../db/select";
import { useSelector } from "../../lib/db/react";
import Widget from "../settings/Widget";
import './Edit.sass';

type Props = {};

type State = {
  show: boolean;
  id: string | null;
};

type Methods = {
  open: (id: string) => void;
  close: () => void;
};

type EditContextType = State & Methods;

export const EditContext = createContext({} as unknown as EditContextType);

const EditProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, setState] = useState<State>({
    show: false,
    id: null,
  });

  const plugin = useSelector(db, selectWidgets).find(
    (widget) => widget.id === state.id,
  );

  // console.log(state.id);

  const methods = useMemo(
    () => ({
      open: (id: string) => {
        setState({
          show: true,
          id,
        });
      },
      close: () => {
        setState({
          show: false,
          id: "",
        });
      },
    }),
    [],
  );
  return (
    <EditContext.Provider value={{ ...state, ...methods }}>
      {children}
      {state.show && (
        <Modal onClose={methods.close}>
          {plugin && (
            <div className="Settings edit">
              <Widget
                open
                plugin={plugin}
                onRemove={() => {
                  // methods.close();
                }}
              ></Widget>
            </div>
          )}
        </Modal>
      )}
    </EditContext.Provider>
  );
};

export default EditProvider;
