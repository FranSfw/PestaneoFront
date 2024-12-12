import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { Fields2 } from "./Fields2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { data } = useQuery({
    queryKey: ["citasInfo"],
    queryFn: getAllCitas,
  });

  const citas = data?.citas || [];
  const mutation = useMutation({ mutationFn: lastCita });

  const cita = citas.length > 0 ? citas[0] : null;
  let citaAnterior = null;
  let clienteid = cita?.cliente_id;

  useEffect(() => {
    if (clienteid) {
      mutation.mutate(clienteid);
    }
  }, [clienteid]);

  if (mutation.data?.cita?.length > 0) {
    citaAnterior = mutation.data.cita[0];
  }

  if (citas.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          No hay próximas citas registradas.
        </h2>
      </div>
    );
  }

  const dermatitisStr = dermatitis ? "Sí" : "No";
  const infeccion_ojosStr = infeccion_ojos ? "Sí" : "No";
  const dolencia_ojosStr = dolencia_ojos ? "Sí" : "No";
  const latexStr = latex ? "Sí" : "No";

  if (sensibilidad_productos === "")  {
    sensibilidad_productos = "N/A";
  }

  if (medicamentos === "") {
    medicamentos = "N/A";
  }

  if (alergias === "") {
    alergias = "N/A";
  }


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
                          <ModalView
                            closeModal={closeModal}
                            type="next"
                            id={clienteid ?? 0}
                          />
                        </div>

                        <div className="mt-2 flex justify-center relative pr-32">
                          <ModalView
                            closeModal={closeModal}
                            type="last"
                            id={clienteid ?? 0}
                          />
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
        </div>
      </Modal>
    </>
  );
};

