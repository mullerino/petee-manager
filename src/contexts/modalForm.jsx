import { useContext, createContext, useState } from 'react'

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState({ isOpen: false, editMode: false });

  const addNewRegister = () => {
    setOpenModal({ isOpen: true, editMode: false })
  }

  const editRegister = () => {
    setOpenModal({ isOpen: true, editMode: true })
  }

  const closeModal = () => {
    setOpenModal({ isOpen: false, editMode: false })
  }

  return (
    <ModalContext.Provider value={{ openModal, addNewRegister, editRegister, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

