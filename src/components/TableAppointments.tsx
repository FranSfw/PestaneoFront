import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TablePagination,
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
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { useDebounce } from "@uidotdev/usehooks";
import { ModalViewAppointment } from "./ModalViewAppointment.tsx";

export interface TableSearchProps {
  searchInput: string;
}

export function TablaCitas({ searchInput }: TableSearchProps) {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedAppointment, setselectedAppointment] = useState<
    Cita | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["citasInfo"],
    queryFn: getAllCitas,
  });

  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const deleteMutation = useMutation({
    mutationFn: deleteCita,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citasInfo"] });
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedAppointment(undefined);
  };
  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedAppointment(undefined);
  };

  const handleView = (appointment: Cita) => {
    setselectedAppointment(appointment);
    setShowView(true);
  };

  const handleViewClose = () => {
    setShowView(false);
    setselectedAppointment(undefined);
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
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.citas.length - page * rowsPerPage);

  const rowsHeight: number = 10;

  return (
    <>
      <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{ border: "1", bgcolor: "#e3e3e3" }}
            style={{ height: "1vh" }}
          >
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "3px solid #757575",
                  borderTop: "1px solid #ccc",
                },
              }}
            >
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Fecha
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Hora
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Cliente
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Encargado
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Procedimiento
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Notas
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "5%",
                }}
                align="justify"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.citas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment) => (
                <TableRow
                  style={{ height: rowsHeight + "vh" }}
                  key={appointment.cita_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "5%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {formatDate(appointment.fecha)}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "10%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {formatHour(appointment.fecha)}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "10%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {appointment.cliente_nombre} {appointment.cliente_apellido}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "10%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {appointment.encargado_nombre}{" "}
                    {appointment.encargado_apellido}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "10%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {appointment.tipo_procedimiento}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "10%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {appointment.notas}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      width: "5%",
                      textAlign: "center",
                      paddingLeft: "1rem",
                    }}
                  >
                    {" "}
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {/* Editar */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#4e68cf", width: "2rem" }}
                        onClick={() => handleEdit(appointment)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="" />
                      </Button>

                      {/* Eliminar */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#f04141 ", width: "2rem" }}
                        onClick={() => handleShow(appointment)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="" />
                      </Button>

                      {/* Ver */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "green", width: "2rem" }}
                        onClick={() => handleView(appointment)}
                      >
                        <FontAwesomeIcon icon={faEye} className="" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{ height: rowsHeight * emptyRows * 1.075 + "vh" }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 4, 5]}
          component="div"
          count={data.citas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {showModal && selectedAppointment && (
        <ModalDeleteAppointment
          open={showModal}
          onClose={handleCloseModal}
          // onConfirm={handleDeleteConfirm}
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
      {showView && selectedAppointment && (
        <ModalViewAppointment
          open={showView}
          onClose={handleViewClose}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
}
