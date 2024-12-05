import React, { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Fields2 } from "../components/Fields2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cita, getAllCitas } from "../services/CitasServices";
import { getAllClientes } from "../services/ClientesServices";
import { lastCita } from "../services/CitasServices";

interface ModalInsertProps {
  closeModal: () => void;

  type: "next" | "last" | string;
}

// interface Cita {
//   citas_id?: number;
//   cliente_id: number;
//   cliente_nombre: string;
//   cliente_apellido: string;
//   telefono: string;
//   fecha: Date;
//   hour: Date;
//   encargado_id: string;
//   encargado_nombre: string;
//   encargado_apellido: string;
//   tipo_procedimiento: string;
//   num_dias?: number;
//   notas: string;
//   mapping_estilo: string;
//   tamaño: string;
//   curvatura: string;
//   espessura: string;
// }

// interface citas {
//   citas_id?: number;
//   cliente_id: number;
//   cliente_nombre: string;
//   cliente_apellido: string;
//   telefono: string;
//   fecha: Date;
//   hour: Date;
//   encargado_id: string;
//   encargado_nombre: string;
//   encargado_apellido: string;
//   tipo_procedimiento: string;
//   num_dias?: number;
//   notas: string;
//   mapping_estilo: string;
//   tamaño: string;
//   curvatura: string;
//   espessura: string;
// }
export function ModalView({ closeModal, type }: ModalInsertProps) {
  const [showModal, setShowModal] = useState(
    type !== "next" && type !== "last"
  );
  const { data } = useQuery({ queryKey: ["citasInfo"], queryFn: getAllCitas });
  const mutation = useMutation({ mutationFn: lastCita });

  const citas = data?.citas || [];
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

  let cita;
  let clienteid = citas[0]?.cliente_id;

  useEffect(() => {
    if (clienteid) {
      mutation.mutate(clienteid);
    }
  }, [clienteid]);

  if (mutation.isLoading) {
    console.log("Cargando la última cita...");
  }

  if (mutation.error) {
    console.error("Ocurrió un error al cargar la última cita", mutation.error);
  }

  if (type === "next") {
    cita = citas[0];
    console.log("Cita después:", cita);
  }

  if (type === "last") {
    if (mutation.data && mutation.data.cita && mutation.data.cita.length > 0) {
      const citaAnterior = mutation.data.cita[0];
      cita = citaAnterior;
    }
  }

  return (
    <>
      {/* Mostrar botón solo si es "next" o "last" */}
      {(type === "next" || type === "last") && (
        <IconButton
          id={type}
          icon={faEye}
          onClick={() => setShowModal(true)}
          text={`Ver cita`}
        />
      )}

      {/* Mostrar modal directamente o bajo demanda */}
      {showModal && cita ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] bg-white outline-none focus:outline-none overflow-scroll">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Todos los datos de la cita
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto overflow-scroll">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className="flex justify-center items-center">
                      <img
                        src={`src/assets/${cita.foto}`}
                        alt="Foto de perfil"
                        className="w-64 h-24 rounded-full object-cover mx-auto"
                      />
                    </div>

                    <Fields2
                      label="Cliente"
                      value={`${cita.cliente_nombre} ${cita.cliente_apellido}`}
                    />

                    <Fields2
                      label="Fecha de la Cita"
                      value={formatFecha(cita.fecha)}
                    />
                  </div>

                  <div className="flex justify-center items-center pt-4">
                    <Fields2
                      label="Procedimiento"
                      value={cita.tipo_procedimiento}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 md:gap-12 justify-center items-center">
                    <Fields2
                      label="Estilo de Mapping"
                      value={cita.mapping_estilo}
                    />
                    <Fields2 label="Tamaño de Mapping" value={cita.tamaño} />
                  </div>

                  <div className="grid md:grid-cols-3 md:gap-12 justify-center items-center">
                    <Fields2 label="Curvatura" value={cita.curvatura} />
                    <Fields2 label="Espesura" value={cita.espessura} />
                  </div>

                  <div className="flex justify-center items-center pt-4">
                    <Fields2 label="Notas" value={cita.notas} />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-3 text-sm rounded transition-all"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
