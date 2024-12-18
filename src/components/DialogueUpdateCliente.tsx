import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Cliente } from "../services/ClientesServices";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cliente: Cliente;
}

export function DialogueUpdateCliente({
  open,
  onClose,
  onConfirm,
  cliente,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro que desea actualizar a {cliente.nombre + " " + cliente.apellido}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
