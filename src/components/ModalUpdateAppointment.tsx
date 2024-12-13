import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Cita, updateAppointment } from "../services/CitasServices";
import { getAllempleados } from "../services/EmpleadosServices";
import { DialogueUpdateAppointment } from "./DialogueUpdateAppointment";
import { Fields } from "./Fields";
import { ComboBox } from "./ComboBox";
import { ComboBoxEmployees } from "./ComboBoxEmployees";
import { FilteredHoursDropdown } from "./FilteredHoursDropdown";
import { FieldDate } from "./FieldDate";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  appointment: Cita;
}

export function ModalUpdateAppointment({
  open,
  onClose,
  appointment,
}: ModalUpdateProps) {
  // const [day, month, year] = appointment.fecha.split("/");
  // const formattedDate = `${year}-${month}-${day}`;
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
  const [errorDialogue, setErrorDialogue] = useState(false);

  const [phone, setPhone] = useState(appointment.telefono);
  const [procedimiento, setProcedimiento] = useState(
    appointment.tipo_procedimiento_id.toString()
  );
  const [empleado, setEmpleado] = useState(appointment.encargado_id.toString());
  const [num_dias, setNum_dias] = useState(appointment.num_dias);
  const [notas, setNotas] = useState(appointment.notas);
  const [mappingStyle, setMappingStyle] = useState(appointment.mapping_estilo);
  const [tamaño, setTamaño] = useState(appointment.tamaño);
  const [curvatura, setCurvatura] = useState(appointment.curvatura);
  const [espesura, setEspesura] = useState(appointment.espessura);

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
    onError: (error) => {
      setError(error.message);
      setErrorDialogue(true);
    },
  });
  const showDialog = () => {
    const combinedDate = `${date} ${hour}:00.000`;

    console.log(combinedDate);
    const updateAppointment: Cita = {
      cita_id: appointment.cita_id,
      cliente_nombre: appointment.cliente_nombre,
      cliente_apellido: appointment.cliente_apellido,
      encargado_nombre: appointment.encargado_nombre,
      encargado_apellido: appointment.encargado_apellido,
      espessura: espesura,
      notas: notas,
      curvatura: curvatura,
      tamaño: tamaño,
      mapping_estilo: mappingStyle,
      num_dias: appointment.num_dias,
      tipo_procedimiento: procedimiento,
      tipo_procedimiento_id: parseInt(procedimiento),
      telefono: appointment.telefono,
      fecha: combinedDate,
      cliente_id: appointment.cliente_id,
      encargado_id: parseInt(empleado),
      foto: appointment.foto,
    };
    setNewAppointment(updateAppointment);
    setDialogue(true);
  };
  const cancelDialog = () => {
    setDialogue(false);
    setHour(formattedHour);
  };

  const handleSave = () => {
    if (date && phone && empleado && procedimiento) {
      console.log(newAppointment);
      updateMutation.mutate(newAppointment);
    } else {
      alert("Por favor llene todos los campos");
    }
  };

  if (!employeesResult.isSuccess) {
    return <span>Loading...</span>;
  }
  const today = new Date().toLocaleDateString("en-CA");

  function closeError() {
    setErrorDialogue(false);
  }
  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Editar Cita</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 m-3 grid grid-cols-2 gap-4">
                  <div className=" items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-screen mx-auto max-w-2xl">
                      {/* Content */}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] bg-white outline-none focus:outline-none overflow-scroll">
                        {/* Header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Insertar Datos de la cita
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={onClose}
                          >
                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/* Body */}
                        <div className="relative p-6 overflow-y-auto flex-auto">
                          <form className="max-w-xl mx-auto">
                            <div className="grid md:grid-cols-1 md:gap-12">
                              <Fields
                                id="phoneClient"
                                name="phoneClient"
                                type="search"
                                text="Teléfono del Cliente"
                                placeholder="Introduce el teléfono del cliente"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                              />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                              <FieldDate
                                id="Fecha"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                min={today}
                                value={date}
                              />
                              <FilteredHoursDropdown
                                id="Hora"
                                date={date}
                                onChange={(e) => setHour(e.target.value)}
                                value={hour}
                              />
                            </div>
                            <div className="grid md:gap-6">
                              <ComboBoxEmployees
                                id="encargado"
                                options={employeesResult.data.empleados}
                                onChange={(e) => setEmpleado(e.target.value)}
                                className={
                                  employeesResult.isSuccess ? "" : "disabled"
                                }
                                value={empleado.toString()}
                              />
                            </div>
                            <div className="relative grid  w-full overflow-wrap">
                              <ComboBox
                                id="procedimientos"
                                name="procedimientos"
                                text="Seleccione el tipo de procedimiento:"
                                placeholder=" "
                                options={[
                                  { value: "1", label: "Primera Vez" },
                                  { value: "2", label: "Retoque" },
                                  { value: "3", label: "Retiro" },
                                ]}
                                onChange={(e) =>
                                  setProcedimiento(e.target.value)
                                }
                                value={procedimiento}
                              />
                              <div
                                id="num_dias_field"
                                className={
                                  procedimiento === "retoque" ? "" : "hidden"
                                }
                              >
                                <Fields
                                  id="num_dias"
                                  name="num_dias"
                                  type="number"
                                  text="¿Cuántos días?"
                                  placeholder=""
                                  onChange={(e) =>
                                    setNum_dias(parseInt(e.target.value))
                                  }
                                  value={num_dias?.toString()}
                                />
                              </div>
                              <div className="grid md:grid-cols-2 md:gap-6">
                                <Fields
                                  id="mapping_estilo"
                                  name="mapping_estilo"
                                  type="text"
                                  text="Estilo de Mapping"
                                  placeholder="Seleccione el estilo de mapping"
                                  onChange={(e) =>
                                    setMappingStyle(e.target.value)
                                  }
                                  value={mappingStyle}
                                />
                                <Fields
                                  id="tamaño"
                                  name="tamaño"
                                  type="text"
                                  text="Tamaño"
                                  placeholder="Seleccione el tamaño"
                                  onChange={(e) => setTamaño(e.target.value)}
                                  value={tamaño}
                                />
                              </div>
                              <div className="grid md:grid-cols-2 md:gap-6">
                                <Fields
                                  id="curvatura"
                                  name="curvatura"
                                  type="text"
                                  text="Curvatura"
                                  placeholder="Seleccione la curvatura"
                                  onChange={(e) => setCurvatura(e.target.value)}
                                  value={curvatura}
                                />
                                <Fields
                                  id="espesura"
                                  name="espesura"
                                  type="text"
                                  text="Espesura"
                                  placeholder="Seleccione la espesura"
                                  onChange={(e) => setEspesura(e.target.value)}
                                  value={espesura}
                                />
                              </div>
                              <div className="grid md:gap-6">
                                <Fields
                                  id="notas"
                                  name="notas"
                                  type="text"
                                  text="Notas"
                                  placeholder="Escriba las notas"
                                  onChange={(e) => setNotas(e.target.value)}
                                  value={notas}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="background-transparent text-red-500 hover:bg-red-500 focus:bg-red-500 hover:text-white focus:text-white font-bold uppercase px-6 py-3 text-sm rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                            type="button"
                            onClick={onClose}
                          >
                            Cerrar
                          </button>
                          <button
                            className="bg-tertiaryYellow text-primaryBlack hover:bg-tertiaryBlack focus:bg-tertiaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                            type="button"
                            onClick={showDialog}
                          >
                            Guardar Cambios
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div>
                {/* footer
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py- rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={showDialog}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {dialogue ? (
        <DialogueUpdateAppointment
          open={dialogue}
          onConfirm={() => {
            handleSave();
          }}
          onClose={cancelDialog}
          appointment={newAppointment}
          message={error}
          error={errorDialogue}
          onCloseError={closeError}
        />
      ) : null}
    </>
  );
}
