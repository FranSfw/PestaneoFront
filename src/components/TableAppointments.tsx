import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Cita,
  deleteCita,
  getAllCitas,
  searchAppointment,
} from "../services/CitasServices.ts";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ModalDeleteAppointment } from "./ModalDeleteAppointment.tsx";
import { ModalUpdateAppointment } from "./ModalUpdateAppointment";
import { useDebounce } from "@uidotdev/usehooks";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

export interface TableSearchProps {
    searchInput: string;
  }

export function TablaCitas({ searchInput }: TableSearchProps) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["citasInfo"],
    queryFn: getAllCitas,
  });
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedAppointment, setselectedAppointment] = useState<
    Cita | undefined
  >(undefined);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const deleteMutation = useMutation({
    mutationFn: deleteCita,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentsInfo"] });
      setShowModal(false); // Close modal after successful deletion
    },
  });
  const searchMutation = useMutation({
    mutationFn: searchAppointment,
    onSuccess: (data) => {
      queryClient.setQueryData(["appointmentsInfo"], data);
    },
  });
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMutation.mutate(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!data) {
    return <span>No hay datos disponibles</span>;
  }

  const handleEdit = (appointment: Cita) => {
    setselectedAppointment(appointment);
    setshowUpdate(true);
  };

  const handleShow = (appointment: Cita) => {
    setselectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedAppointment) {
      deleteMutation.mutate(selectedAppointment.citas_id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedAppointment(undefined);
  };
  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedAppointment(undefined);
  };

  return (
    <>
      <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: "1", bgcolor: "#e3e3e3" }}>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "3px solid #757575",
                  borderTop: "1px solid #ccc",
                },
              }}
            >
             
              <TableCell sx={{fontSize: "1.4rem",fontWeight: "bold",color: "text.primary",width: "10%",}}align="justify">
                Fecha
              </TableCell>
              <TableCell sx={{fontSize: "1.4rem",fontWeight: "bold",color: "text.primary", width: "10%",}} align="justify">
                Hora
              </TableCell>
              <TableCell sx={{fontSize: "1.4rem",fontWeight: "bold",color: "text.primary",width: "10%",}}align="justify">
                Cliente
              </TableCell>
              <TableCell sx={{fontSize: "1.4rem",fontWeight: "bold",color: "text.primary", width: "10%", }} align="justify" >
                Encargado
              </TableCell>
              <TableCell sx={{fontSize: "1.4rem", fontWeight: "bold", color: "text.primary", width: "10%",}} align="left">
                Tipo de Procedimiento
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold", color: "text.primary", width: "10%", }}align="center">
                Notas
              </TableCell>
              <TableCell sx={{fontSize: "1.4rem",fontWeight: "bold",color: "text.primary",width: "5%",}}align="justify"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.citas.map((appointment, index) => (
              <TableRow
                key={appointment.citas_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "5%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {/* {appointment.fecha} */} papu
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {/* {appointment.hour} */}pro
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.cliente_nombre} {appointment.cliente_apellido}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.encargado_nombre} {appointment.encargado_apellido}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.tipo_procedimiento}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {appointment.notas}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "5%",
                    textAlign: "center",
                    paddingLeft: "1rem",
                  }}
                >
                  {" "}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#4e68cf", width: "2rem" }}
                      onClick={() => handleEdit(appointment)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="" />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#f04141 ", width: "2rem" }}
                      onClick={() => handleShow(appointment)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="" />
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ bgcolor: "transparent", width: "2rem" }}
                      onClick={() => handleShow(appointment)}
                    >
                      <FontAwesomeIcon icon={faEye} className="" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showModal && selectedAppointment && (
        <ModalDeleteAppointment
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          appointment={selectedAppointment}
        />
      )}
      {showUpdate && selectedAppointment && (
        <ModalUpdateAppointment
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
}
