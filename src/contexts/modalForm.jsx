import { useContext, createContext, useState } from 'react'

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState({ isOpen: false, editMode: false });
  const [idEditRegister, setIdEditRegister] = useState();

  const addNewRegister = () => {
    setOpenModal({ isOpen: true, editMode: false });
  }

  const editRegister = (id) => {
    setOpenModal({ isOpen: true, editMode: true });
    setIdEditRegister(id);
  }

  const closeModal = () => {
    setOpenModal({ isOpen: false, editMode: false });
  }

  return (
    <ModalContext.Provider value={{ openModal, idEditRegister, addNewRegister, editRegister, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

