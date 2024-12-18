import { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Fields2 } from "../components/Fields2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cita, getAllCitas } from "../services/CitasServices";
import { lastCita } from "../services/CitasServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalInsertProps {
  closeModal: () => void;

  type: "next" | "last" | string;
  id: number;
}

export function ModalView({ type, id }: ModalInsertProps) {
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

  // id es el id del cliente
  console.log("Tipo de cita:", type);

  let cita;
  let clienteid = id;

  console.log("Cliente id:", clienteid);

  useEffect(() => {
    if (clienteid) {
      console.log("Buscando la última cita del cliente con id:", clienteid);
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
    // buscar la cita siguiente del cliente con id
    cita = citas.find((cita: Cita) => cita.cliente_id === id);
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
        <button

          className="group flex absolute px-4 bg-tertiaryYellow rounded-full h-12 items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0"
          onClick={() => setShowModal(true)}
        >
          <div>
            <FontAwesomeIcon icon={faEye} className="" />
          </div>

          <div>
            <p className="my-2 pl-2 text-xl font-medium">Ver cita</p>
          </div>
        </button>
      )}

      {/* Mostrar modal directamente o bajo demanda */}
      {showModal && cita ? (
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
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="relative p-6 flex-auto overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center items-center">
                      <img
                        src={`src/assets/${cita.foto}`}
                        alt="Foto de perfil"
                        className="w-64 h-32 rounded-full object-contain mx-auto"
                      />
                    </div>

                    <div className="flex justify-center items-start">
                      <Fields2
                        label="Cliente"
                        value={`${cita.cliente_nombre} ${cita.cliente_apellido}`}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Fecha de la cita"
                        value={formatFecha(cita.fecha)}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Procedimiento"
                        value={cita.tipo_procedimiento}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Estilo de Mapping"
                        value={cita.mapping_estilo}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Tamaño de Mapping" value={cita.tamaño} />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Curvatura" value={cita.curvatura} />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Espesura" value={cita.espessura} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-6">
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
