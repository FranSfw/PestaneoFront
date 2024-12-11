import { ModalView } from "../components/ModalView";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCitas } from "../services/CitasServices";
import { lastCita } from "../services/CitasServices";

export function SiguienteCita() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["citasInfo"],
    queryFn: getAllCitas,
  });

  const citas = data?.citas || [];
  const mutation = useMutation({ mutationFn: lastCita });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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

  return (
    <div className="grid grid-cols-2 container mx-auto p-8">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-black mb-4">Siguiente Cita</h2>
        <ul className="space-y-3">
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
      <div className="relative">
        <ModalView closeModal={closeModal} type="next" id={clienteid ?? 0} />
      </div>

      {/* Sección de Última Cita */}
      <div className="relative">
        <h2 className="text-2xl font-bold text-black mb-4">
          Última Cita del Cliente: <br />
          <span className="font-medium text-gray-800">
            {citaAnterior?.cliente_nombre}{" "}
            {citaAnterior?.cliente_apellido || "N/A"}{" "}
          </span>
        </h2>
        {citaAnterior ? (
          <ul className="space-y-3">
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
          <p className="text-gray-500">
            No hay registros de una última cita para este cliente.
          </p>
        )}
      </div>
      <div className="relative">
        <ModalView closeModal={closeModal} type="next" id={clienteid ?? 0} />
      </div>
    </div>
  );
}
