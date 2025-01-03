import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { Fields2 } from "./Fields2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { getAllCitas, lastCita } from "../services/CitasServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ModalView } from "../components/ModalView";

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
  cliente_id: number;
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
  cliente_id,
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
      cliente_id={cliente_id}
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
  cliente_id,
}) => {
  // Recibe directamente las propiedades
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [showLast, setShowLast] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [clienteid, setClienteId] = useState<number | null>(null);

  const dermatitisStr = dermatitis ? "Sí" : "No";
  const infeccion_ojosStr = infeccion_ojos ? "Sí" : "No";
  const dolencia_ojosStr = dolencia_ojos ? "Sí" : "No";
  const latexStr = latex ? "Sí" : "No";

  if (sensibilidad_productos === "") {
    sensibilidad_productos = "N/A";
  }

  if (medicamentos === "") {
    medicamentos = "N/A";
  }

  if (alergias === "") {
    alergias = "N/A";
  }

  const handleShowLast = (appointment = cliente_id) => {
    setShowLast(true);
    setClienteId(appointment);
  };

  const handleShowNext = (appointment = clienteid) => {
    setShowNext(true);
    setClienteId(appointment);
  };

  const handleClosLast = () => {
    setShowLast(false);
  };

  const handleClosNext = () => {
    setShowNext(false);
  };

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
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* Content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] max-w-[85vh] min-w-[85vh] bg-white outline-none focus:outline-none">
                  {/* Header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl justify-center font-semibold">
                      Detalles del Cliente
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => closeModal()}
                    >
                      ×
                    </button>
                  </div>

                  {/* Body */}
                  <div className="relative p-6 flex-auto overflow-y-auto ">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <div className="flex justify-center items-center">
                        <img
                          src={`src/assets/${foto}`}
                          alt="Foto de perfil"
                          className="w-64 h-32 rounded-full object-contain mx-auto"
                        />
                      </div>
                      <Fields2
                        label="Cliente"
                        value={`${nombre} ${apellido}`}
                      />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      <Fields2 label="Número de teléfono" value={telefono} />
                      <Fields2 label="Email" value={email} />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      <Fields2 label="Dermatitis" value={dermatitisStr} />
                      <Fields2
                        label="Infeccion de ojos"
                        value={infeccion_ojosStr}
                      />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      <Fields2
                        label="Dolencia en los ojos"
                        value={dolencia_ojosStr}
                      />
                      <Fields2 label="Látex" value={latexStr} />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      <Fields2
                        label="Sensibilidad a productos"
                        value={sensibilidad_productos}
                      />
                      <Fields2 label="Medicamentos" value={medicamentos} />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      <Fields2 label="Alergias" value={alergias} />
                    </div>

                    <div className="flex flex-row justify-center items-center pt-4 gap-6">
                      {/* Columna de "Anterior cita" */}
                      <div className="grid grid-cols-2 items-center relative z-0 w-full">
                        <h2 className=" text-md text-gray-600">
                          Anterior cita
                        </h2>

                        <h2 className=" text-md text-gray-600">
                          Siguiente cita
                        </h2>

                        <div className="mt-2 flex justify-center relative pr-32">
                          <button
                            className="px-4 bg-tertiaryYellow rounded-full h-12 flex items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0"
                            onClick={() => handleShowLast(cliente_id)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="mr-1 text-sm"
                            />
                            <span className="font-medium text-sm lg:text-base">
                              Ver cita
                            </span>
                          </button>
                        </div>

                        <div className="mt-2 flex justify-center relative pr-32">
                          {" "}
                          <button
                            className="px-4 bg-tertiaryYellow rounded-full h-12 flex items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0"
                            onClick={() => handleShowNext(cliente_id)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="mr-1 text-sm"
                            />
                            <span className="font-medium text-sm lg:text-base">
                              Ver cita
                            </span>
                          </button>
                        </div>
                      </div>
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
          {showNext && clienteid && (
            <ModalView
              open={showNext}
              onClose={handleClosNext}
              id={clienteid}
              type="next"
            />
          )}

          {showLast && clienteid && (
            <ModalView
              open={showLast}
              onClose={handleClosLast}
              id={clienteid}
              type="last"
            />
          )}
        </div>
      </Modal>
    </>
  );
};
