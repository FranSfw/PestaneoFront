import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Fields2 } from "./Fields2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface datosCajaClient {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  medicamentos: string;
  alergias: string;
  sensibilidad_productos: string;
  dermatitis: boolean;
  infeccion_ojos: boolean;
  dolencia_ojos: boolean;
  latex: boolean;
  foto: string;
}

//npm install --save signature_pad
export function CajaCita({
  nombre,
  apellido,
  telefono,
  email,
  medicamentos,
  alergias,
  sensibilidad_productos,
  dermatitis,
  infeccion_ojos,
  dolencia_ojos,
  latex,
  foto,
}: datosCajaClient) {
  // Cambia a recibir directamente las propiedades
  return (
    <Cajita
      nombre={nombre}
      apellido={apellido}
      telefono={telefono}
      email={email}
      medicamentos={medicamentos}
      alergias={alergias}
      sensibilidad_productos={sensibilidad_productos}
      dermatitis={dermatitis}
      infeccion_ojos={infeccion_ojos}
      dolencia_ojos={dolencia_ojos}
      latex={latex}
      foto={foto}
    />
  );
}

const Cajita: React.FC<datosCajaClient> = ({
  nombre,
  apellido,
  telefono,
  email,
  medicamentos,
  alergias,
  sensibilidad_productos,
  dermatitis,
  infeccion_ojos,
  dolencia_ojos,
  latex,
  foto,
}) => {
  // Recibe directamente las propiedades
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="w-[97%] h-[97%] m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c]"
        onClick={openModal}
      >
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="font-[800]"></span>
          {nombre} {apellido}
        </h2>
        <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
          <span className="font-[800]">Teléfono: </span>
          {telefono}
        </p>
      </button>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="Detalles del Cliente"
      >
        <div>
          <button onClick={closeModal}>Close Modal</button>
          <>
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* Content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] min-w-[85vh] bg-white outline-none focus:outline-none ">
                  {/* Header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl justify-center font-semibold">
                      Detalles del Cliente
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => closeModal()}
                    >
                      <button
                        className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none"
                        onClick={() => closeModal()}
                      >
                        ×
                      </button>
                    </button>
                  </div>
                  {/* Body */}
                  <div className="relative p-6 flex-auto ">
                    <div className="flex md:flex-row md:items-center md:gap-6">
                      <div className="flex justify-center items-center">
                        <img
                          src={`src/assets/${foto}`}
                          alt="Foto de perfil"
                          className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                        <div className="flex justify-center items-center pt-4 ml-5">
                          <Fields2
                            label="Cliente"
                            value={`${nombre} ${apellido}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center pt-4">
                      <Fields2 label="Numero Celular" value={telefono} />
                      <Fields2 label="Correo Electronico" value={email} />
                    </div>

                    {/* Allergies Div*/}
                    <div className="grid grid-cols-4 place-content-center">
                      <Fields2
                        className="justify-self-center	"
                        label="Dermatitis"
                        value={dermatitis}
                      />
                      <Fields2
                        label="Infeccion en los Ojos"
                        value={infeccion_ojos}
                      />
                      <Fields2
                        label="Dolencia en los Ojos"
                        value={dolencia_ojos}
                      />
                      <Fields2 label="Latex" value={latex} />
                    </div>

                    <div className="flex justify-center items-center pt-4">
                      <Fields2
                        label="Sensibilidad a Productos"
                        value={sensibilidad_productos}
                      />
                    </div>
                    <div className="flex justify-center items-center pt-4">
                      <Fields2 label="Medicamentos" value={medicamentos} />
                    </div>
                    <div className="flex justify-center items-center pt-4">
                      <Fields2 label="Alergias" value={alergias} />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="background-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-3 text-sm rounded transition-all"
                      type="button"
                      onClick={() => closeModal()}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
        </div>
      </Modal>
    </>
  );
};
