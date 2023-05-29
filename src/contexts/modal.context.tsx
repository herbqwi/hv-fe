import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Modal from "../components/modal/modal-tempelate/modal.component";
import { IModal } from "../interfaces";


interface IProps {
  children: ReactNode
}


export const ModalContext = React.createContext<IModal.Context>({ modalProps: null, setModalProps: () => { }, closeModal: () => { } })


const ModalProvider = ({ children }: IProps) => {
  const [modalProps, setModalProps] = useState<IModal.Modal | null>(null as any);

  const closeModal = () => {
    document.querySelector(`.modal-container .modal.hidable`)?.classList.add(`hidden`)
    document.querySelector(`.modal-container.hidable`)?.classList.add(`hidden-in`)
    setTimeout(() => {
      setModalProps(null)
    }, 300);
  }

  return <ModalContext.Provider value={{ modalProps, setModalProps, closeModal }}>
    {modalProps != null && <Modal></Modal>}
    {children}
  </ModalContext.Provider>
}

export default ModalProvider