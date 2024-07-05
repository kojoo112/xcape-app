import React from 'react';
import {createContext, useContext, useState} from 'react';

const TagModalContext = createContext({
  tagModalVisible: false,
  openTagModal: () => {},
  closeTagModal: () => {},
});

export const TagModalProvider = ({children}) => {
  const [tagModalVisible, setTagModalVisible] = useState(false);

  const openTagModal = () => {
    setTagModalVisible(true);
  };

  const closeTagModal = () => {
    setTagModalVisible(false);
  };

  return (
    <TagModalContext.Provider
      value={{
        tagModalVisible,
        openTagModal,
        closeTagModal,
      }}>
      {children}
    </TagModalContext.Provider>
  );
};

export const useTagModal = () => useContext(TagModalContext);
