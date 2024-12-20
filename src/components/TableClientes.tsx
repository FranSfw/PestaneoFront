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
  Cliente,
  deleteCliente,
  getAllClientes,
  searchCliente,
} from "../services/ClientesServices.ts";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { useDebounce } from "@uidotdev/usehooks";
import { ModalUpdateCliente } from "./ModalUpdateCliente.tsx";
import { ModalDeleteCliente } from "./ModalDeleteCliente.tsx";
import { ModalView } from "./ModalView.tsx";

export interface TableSearchProps {
  searchInput: string;
}

export function TablaClientes({ searchInput }: TableSearchProps) {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedCliente, setselectedCliente] = useState<Cliente | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["clientesinfo"],
    queryFn: getAllClientes,
  });

  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const deleteMutation = useMutation({
    mutationFn: deleteCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienteInfo"] });
      setShowModal(false); // Close modal after successful deletion
    },
  });
  const searchMutation = useMutation({
    mutationFn: searchCliente,
    onSuccess: (data) => {
      queryClient.setQueryData(["clientesInfo"], data);
    },
  });
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMutation.mutate(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleEdit = (cliente: Cliente) => {
    setselectedCliente(cliente);
    setshowUpdate(true);
  };

  const handleShow = (cliente: Cliente) => {
    setselectedCliente(cliente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedCliente(undefined);
  };
  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedCliente(undefined);
  };

  const handleView = (cliente: Cliente) => {
    setselectedCliente(cliente);
    setShowView(true);
  };

  const handleViewClose = () => {
    setShowView(false);
    setselectedCliente(undefined);
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
    rowsPerPage -
    Math.min(rowsPerPage, data.clientes.length - page * rowsPerPage);

  const rowsHeight: number = 10;

  return (
    <>
      <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{ border: "1", bgcolor: "#e3e3e3" }}
            style={{ height: "1rem" }}
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
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Télefono
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Fecha de Ultimo Procedimiento
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Último <br></br>Procedimiento
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "5%",
                }}
                align="justify"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cliente) => (
                <TableRow
                  style={{ height: 5 }}
                  key={cliente.cliente_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      width: "5%",
                      paddingBottom: "1.5rem",
                      paddingTop: "1.5rem",
                    }}
                    align="justify"
                  >
                    {cliente.nombre} {cliente.apellido}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      width: "10%",
                      paddingBottom: "1.5rem",
                      paddingTop: "1.5rem",
                    }}
                    align="center"
                  >
                    {cliente.telefono}
                  </TableCell>
                
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      width: "10%",
                      paddingBottom: "1.5rem",
                      paddingTop: "1.5rem",
                    }}
                    align="center"
                  >
                    {cliente.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      width: "10%",
                      paddingBottom: "1.5rem",
                      paddingTop: "1.5rem",
                    }}
                    align="center"
                  >
                    {formatDate(cliente.fecha_ultimo_procedimiento)}
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
                    {cliente.ultimo_procedimiento}
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
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {/* Editar */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#4e68cf", width: "2rem" }}
                        onClick={() => handleEdit(cliente)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="" />
                      </Button>

                      {/* Eliminar */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#f04141 ", width: "2rem" }}
                        onClick={() => handleShow(cliente)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="" />
                      </Button>

                      {/* Ver */}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "green", width: "2rem" }}
                        onClick={() => handleView(cliente)}
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
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.clientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {showModal && selectedCliente && (
        <ModalDeleteCliente
          open={showModal}
          onClose={handleCloseModal}
          // onConfirm={handleDeleteConfirm}
          cliente={selectedCliente}
        />
      )}
      {showUpdate && selectedCliente && (
        <ModalUpdateCliente
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          cliente={selectedCliente}
        />
      )}
      {showView && selectedCliente && (
        <ModalView
        closeModal={handleCloseModal} type="next" id={selectedCliente.cliente_id ?? 0}
        />
      )}
    </>
  );
}
