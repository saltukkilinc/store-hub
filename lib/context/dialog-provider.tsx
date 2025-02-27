"use client";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

type DialogContextProviderType = {
  children: React.ReactNode;
};
type DialogStateType = {
  isDialogOpen: boolean;
  id: string | null;
  selectedIds: string[];
};
type DialogActionType = {
  type: "OPEN" | "CLOSE" | "EDIT_ID";
  id?: string;
  selectedIds?: string[];
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
        selectedIds: action.selectedIds ?? [],
      };
    case "CLOSE":
      return {
        ...state,
        isDialogOpen: false,
        id: action.id ?? null,
        selectedIds: action.selectedIds ?? [],
      };
    case "EDIT_ID":
      return {
        ...state,
        id: action.id ?? null,
      };
  }
}

const DialogContextProvider = ({ children }: DialogContextProviderType) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    isDialogOpen: false,
    id: null,
    selectedIds: [],
  });
  return <DialogContext value={{ state, dispatch }}>{children}</DialogContext>;
};

export { useDialogContext, DialogContextProvider };
