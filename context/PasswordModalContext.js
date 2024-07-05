import React from 'react';
import {createContext, useContext, useState} from 'react';

const PasswordModalContext = createContext({
  passwordModalVisible: false,
  openPasswordModal: () => {},
  closePasswordModal: () => {},
});

export const Action = {
  TO_SETTINGS: 'toSettings',
  RESET: 'reset',
};

export const PasswordModalProvider = ({children}) => {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [action, setAction] = useState(Action.TO_SETTINGS || Action.RESET);

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };

  const settingAction = () => {
    setAction(Action.TO_SETTINGS);
  };

  const resetAction = () => {
    setAction(Action.RESET);
  };

  return (
    <PasswordModalContext.Provider
      value={{
        passwordModalVisible,
        openPasswordModal,
        closePasswordModal,
        action,
        settingAction,
        resetAction,
      }}>
      {children}
    </PasswordModalContext.Provider>
  );
};

export const usePasswordModal = () => useContext(PasswordModalContext);
