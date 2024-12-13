import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Cita, updateAppointment } from "../services/CitasServices";
import { getAllempleados } from "../services/EmpleadosServices";
import { Fields2 } from "./Fields2";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  appointment: Cita;
}

export function ModalViewAppointment({
  open,
  onClose,
  appointment,
}: ModalUpdateProps) {
  const formattedDate = appointment.fecha.split("T")[0];
  const formattedHour = new Date(appointment.fecha).toLocaleTimeString(
    "es-MX",
    {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const [dialogue, setDialogue] = useState(false);
  const queryClient = useQueryClient();
  const [date, setDate] = useState(formattedDate);
  const [hour, setHour] = useState(formattedHour);
  const [inhabilitado, setInhabilitado] = useState(true);
  const [error, setError] = useState("");
  const [newAppointment, setNewAppointment] = useState<Cita>(appointment);

  const employeesResult = useQuery({
    queryKey: ["empleadosInfo"],
    queryFn: getAllempleados,
  });

  const updateMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citasInfo"] });
      setDialogue(false);
      onClose();
    },
    onError: (error: any) => {
      setError((error as Error).message);
    },
  });

  const formatFecha = (fecha: string) => {
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

  if (!employeesResult.isSuccess) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {open && (
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
                    onClick={onClose}
                  >
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="relative p-6 flex-auto overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center items-center">
                      <img
                        src={`src/assets/${appointment.foto}`}
                        alt="Foto de perfil"
                        className="w-64 h-32 rounded-full object-contain mx-auto"
                      />
                    </div>

                    <div className="flex justify-center items-start">
                      <Fields2
                        label="Cliente"
                        value={`${appointment.cliente_nombre} ${appointment.cliente_apellido}`}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Fecha de la cita"
                        value={formatFecha(appointment.fecha)}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Procedimiento"
                        value={appointment.tipo_procedimiento}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2
                        label="Estilo de Mapping"
                        value={appointment.mapping_estilo}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Tamaño de Mapping" value={appointment.tamaño} />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Curvatura" value={appointment.curvatura} />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Fields2 label="Espesura" value={appointment.espessura} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-6">
                    <Fields2 label="Notas" value={appointment.notas} />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-3 text-sm rounded transition-all"
                    type="button"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
