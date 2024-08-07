// src/components/Popup.tsx
import React, { ReactNode } from 'react';
import { GrayCard } from '@/components/common/Card';
import classNames from 'classnames';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full overflow-y-hidden ">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative rounded-lg shadow-lg sm:w-[50%] h-fit max-h-[90%] max-w-[90%] overflow-y-scroll overflow-x-hidden w-full">
        <GrayCard className='w-full py-8'>
          {children}
        </GrayCard>
        <button className={classNames('absolute top-2 right-4 text-white text-lg font-bold')} onClick={onClose}>x</button>
      </div>
    </div>
  );
};

