import { ModalView } from "./ModalView";
import React, { useState } from "react";
import ReactDOM from "react-dom";

interface datosCaja {
  cliente_nombre: string;
  cliente_apellido: string;
  fecha: string;
  tipo_procedimiento: string;
}

interface Props {
  datos: datosCaja;
}

export const Cajita: React.FC<Props> = ({ datos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { cliente_nombre, cliente_apellido, fecha, tipo_procedimiento } = datos;

  return (
    <>
      {/* Caja */}
      <div
        className="m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c]"
        onClick={openModal}
      >
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {cliente_nombre} {cliente_apellido}
        </h2>
        <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
          <span className=" font-[800]">Día: </span>{" "}
          {new Date(fecha).toLocaleDateString()}
        </p>
        <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
          <span className=" font-[800]">Proceso: </span> {tipo_procedimiento}
        </p>
      </div>

      {/* Modal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleOutsideClick}
          >
            <div
              className="bg-white dark:bg-gray-700 p-6 rounded-lg"
              onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
            >
              <ModalView closeModal={closeModal} type="3" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
