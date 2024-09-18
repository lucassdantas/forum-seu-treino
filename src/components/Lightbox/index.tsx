import React, { useState } from 'react';

type LightboxProps = {
  imageUrl: string;
};

export const Lightbox: React.FC<LightboxProps> = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  return (
    <>
      <img src={imageUrl} onClick={openLightbox} className="cursor-pointer max-h-[550px] object-cover w-full rounded" />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 w-full" onClick={closeLightbox}>
          <div className="flex justify-center items-center w-[80%] h-fit overflow-scroll ">
            <button onClick={closeLightbox} className="absolute top-0 lg:top-5 right-5 text-white text-3xl">&times;</button>
            <img src={imageUrl} className="max-w-full max-h-full h-full w-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
};
