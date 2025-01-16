import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="container-modal">
      <div className="overlay"></div>
      <div className="modal-wrapper">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
