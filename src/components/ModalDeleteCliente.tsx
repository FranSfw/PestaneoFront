import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteCita } from "../services/CitasServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cita } from "../services/CitasServices";

interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  appointment: Cita;
}

export function ModalDeleteCliente({
  open,
  onClose,
  appointment,
}: ModalDeleteProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCita,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citasInfo"] });
      onClose(); // Close modal after successful deletion
    },
  });

  const handleDeleteConfirm = () => {
    if (appointment) {
      console.log("appointment: ", appointment);
      deleteMutation.mutate(appointment.cita_id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the appointment for{" "}
          {appointment?.cliente_nombre + " " + appointment?.cliente_apellido ||
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
