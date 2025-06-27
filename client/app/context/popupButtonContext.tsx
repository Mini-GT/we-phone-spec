import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { ContextProviderProps } from '~/types/globals.type';

type PopupButtonContextType = {
  popupButton: PopupButtonType;
  setPopupButton: Dispatch<SetStateAction<PopupButtonType>>;
}

type PopupButtonType = {
  popup: boolean;
  isLoginClicked: boolean;
  isAddUserClicked: boolean;
  isAddDeviceClicked: boolean;
}

const PopupButtonContext = createContext<PopupButtonContextType | undefined>(undefined);

export function PopupButtonProvider({ children }: ContextProviderProps) {
  const [popupButton, setPopupButton] = useState({
    popup: false,
    isLoginClicked: false,
    isAddUserClicked: false,
    isAddDeviceClicked: false,
  });
  
  return (
    <PopupButtonContext value={{ popupButton, setPopupButton }}>
      {children}
    </PopupButtonContext>
  );
}

export function usePopupButton() {
  const context = useContext(PopupButtonContext);

  if (context === undefined) {
    throw new Error('usePopupButton must be used within a LoginProvider');
  }
  
  return context;
}