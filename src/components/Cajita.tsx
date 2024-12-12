import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Fields2 } from "./Fields2";

interface datosCaja {
  citas_id?: number;
  cliente_id: number;
  cliente_nombre: string;
  cliente_apellido: string;
  telefono: string;
  fecha: Date;
  hour: Date;
  encargado_id: string;
  encargado_nombre: string;
  encargado_apellido: string;
  tipo_procedimiento: string;
  num_dias?: number;
  notas: string;
  mapping_estilo: string;
  tamaño: string;
  curvatura: string;
  espessura: string;
  foto: string;
}

interface Props {
  datos: datosCaja;
}

export const Cajita: React.FC<Props> = ({ datos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDay = (fecha: Date | string | undefined) => {
    if (fecha === undefined) return "";
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", {
      month: "long",
      day: "numeric",
    });
  };
  const formatHour = (fecha: Date | string | undefined) => {
    if (fecha === undefined) return "";
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatFecha = (fecha: Date | string | undefined) => {
    if (fecha === undefined) return "";
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    cliente_nombre,
    cliente_apellido,
    fecha,
    tipo_procedimiento,
    telefono,
    encargado_id,
    encargado_nombre,
    encargado_apellido,
    num_dias,
    notas,
    mapping_estilo,
    tamaño,
    espessura,
    curvatura,
    citas_id,
    cliente_id,
    foto,
  } = datos;

  return (
    <>
      {/* Botón que abre el modal */}
      <div>
        <button
          className="w-[97%] h-[97%] m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c]"
          onClick={openModal}
        >
          <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {cliente_nombre} {cliente_apellido}
          </h2>
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            <span className=" font-[800]">Dia: </span>
            {formatDay(fecha)}
          </p>
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            <span className=" font-[800]">Hora: </span>
            {formatHour(fecha)}
          </p>
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            <span className="font-[800]">Proceso: </span> {tipo_procedimiento}
          </p>
        </button>

        {/* Modal */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="Detalles de la Cita"
        >
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* Content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] min-w-[85vh] max-w-[80vh] bg-white outline-none focus:outline-none">
                  {/* Header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl justify-center font-semibold">
                      Detalles del Cliente
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={closeModal}
                    >
                      ×
                    </button>
                  </div>

                  {/* Body */}
                  <div className="relative p-6 flex-auto overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex justify-center items-center">
                        <img
                          src={`src/assets/${foto}`}
                          alt="Foto de perfil"
                          className="w-64 h-32 rounded-full object-contain mx-auto"
                        />
                      </div>

                      <div className="flex justify-center items-start">
                        <Fields2
                          label="Cliente"
                          value={`${cliente_nombre} ${cliente_apellido}`}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2
                          label="Fecha de la cita"
                          value={formatFecha(fecha)}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2
                          label="Procedimiento"
                          value={tipo_procedimiento}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2
                          label="Estilo de Mapping"
                          value={mapping_estilo}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2
                          label="Tamaño de Mapping"
                          value={tamaño}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2 label="Curvatura" value={curvatura} />
                      </div>

                      <div className="flex flex-col gap-4">
                        <Fields2 label="Espesura" value={espessura} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-6">
                      <Fields2
                        label="Notas"
                        value={notas}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="background-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-3 text-sm rounded transition-all"
                      type="button"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
        </Modal>
      </div>
    </>
  );
};
