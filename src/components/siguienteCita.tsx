import { ModalView } from "../components/ModalView";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCitas } from "../services/CitasServices";
import { lastCita } from "../services/CitasServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export function SiguienteCita() {
  const { data } = useQuery({
    queryKey: ["citasInfo"],
    queryFn: getAllCitas,
  });

  const citas = data?.citas || [];
  const mutation = useMutation({ mutationFn: lastCita });
  const [showLast, setShowLast] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [clienteid, setClienteId] = useState<number | null>(null);

  const formatDate = (fecha: Date | string | undefined) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatHour = (fecha: Date | string | undefined) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const cita = citas.length > 0 ? citas[0] : null;
  let citaAnterior = null;
  let cliente_id = cita?.cliente_id;

  useEffect(() => {
    if (cliente_id) {
      mutation.mutate(cliente_id);
    }
  }, [cliente_id]);

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

  const handleShowLast = (appointment = clienteid) => {
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
    <div className="container mx-auto p-8 max-w-screen-lg">
      <div className="grid grid-cols-1 gap-12">
        {/* Sección de Siguiente Cita */}
        <div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <h2 className="text-xl lg:text-2xl font-bold text-black text-center">
              Siguiente Cita
            </h2>
            <button
              className="px-4 bg-tertiaryYellow rounded-full h-12 flex items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0"
              onClick={() => handleShowNext(cita?.cliente_id)}
            >
              <FontAwesomeIcon icon={faEye} className="mr-1 text-sm" />
              <span className="font-medium text-sm lg:text-base">Ver cita</span>
            </button>
          </div>
          <ul className="space-y-2 text-base lg:text-lg mt-4">
            <li>
              <span className="font-bold text-black">Cliente:</span>{" "}
              {cita?.cliente_nombre} {cita?.cliente_apellido || "N/A"}
            </li>
            <li>
              <span className="font-bold text-black">Hora:</span>{" "}
              {formatHour(cita?.fecha)}
            </li>
            <li>
              <span className="font-bold text-black">Procedimiento:</span>{" "}
              {cita?.tipo_procedimiento || "N/A"}
            </li>
          </ul>
        </div>

        {/* Sección de Última Cita */}
        <div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <h2 className="text-black text-center">
              <span className="text-xl lg:text-2xl font-bold">
                Última Cita del cliente
              </span>
              <span className="text-base lg:text-lg block">
                {cita?.cliente_nombre} {cita?.cliente_apellido || "N/A"}
              </span>
            </h2>
            <button
              className="px-4 bg-tertiaryYellow rounded-full h-12 flex items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0"
              onClick={() => handleShowLast(cita?.cliente_id)}
            >
              <FontAwesomeIcon icon={faEye} className="mr-1 text-sm" />
              <span className="font-medium text-sm lg:text-base">Ver cita</span>
            </button>
          </div>

          {citaAnterior ? (
            <ul className="space-y-2 text-base lg:text-lg mt-4">
              <li>
                <span className="font-bold text-black">Fecha:</span>{" "}
                {formatDate(citaAnterior.fecha)}
              </li>
              <li>
                <span className="font-bold text-black">Procedimiento:</span>{" "}
                {citaAnterior.tipo_procedimiento || "N/A"}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500 text-center text-sm lg:text-base">
              No hay registros de una última cita para este cliente.
            </p>
          )}
        </div>
      </div>
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
  );
}
