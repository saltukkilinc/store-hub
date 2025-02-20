"use client";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

type DialogContextProviderType = {
  children: React.ReactNode;
};
type DialogStateType = {
  isDialogOpen: boolean;
};
type DialogActionType = {
  type: "OPEN" | "CLOSE";
};
type DialogContextType = {
  state: DialogStateType;
  dispatch: ActionDispatch<[action: DialogActionType]>;
};

const DialogContext = createContext<DialogContextType | null>(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

function dialogReducer(state: DialogStateType, action: DialogActionType) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        isDialogOpen: true,
      };
    case "CLOSE":
      return {
        ...state,
        isDialogOpen: false,
      };
  }
}

const DialogContextProvider = ({ children }: DialogContextProviderType) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    isDialogOpen: false,
  });
  return <DialogContext value={{ state, dispatch }}>{children}</DialogContext>;
};

export { useDialogContext, DialogContextProvider };
