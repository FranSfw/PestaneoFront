import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cliente, deleteCliente } from "../services/ClientesServices";

interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente;
}

export function ModalDeleteCliente({
  open,
  onClose,
  cliente,
}: ModalDeleteProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienteInfo"] });
      onClose(); // Close modal after successful deletion
    },
  });

  const handleDeleteConfirm = () => {
    if (cliente) {
      console.log("cliente: ", cliente);
      console.log("cliente.cliente_id: ", cliente.id);
      deleteMutation.mutate(cliente.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seguro que desea eliminar el cliente:{" "}
          {cliente?.nombre + " " + cliente?.apellido ||
            "N/A"}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
