import { useState } from 'react';

type ModalState = {
  visible: boolean;
  [key: string]: unknown;
};

const useModal = (initialState: Record<string, unknown> = {}) => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    ...initialState,
  });

  const openModal = (data: Record<string, unknown>) => {
    setModalState({ visible: true, ...data });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, visible: false }));
  };

  return { modalState, openModal, closeModal, setModalState };
};

export default useModal;
