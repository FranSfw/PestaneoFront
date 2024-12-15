import Swal from "sweetalert2";

interface AlertProps {
  title: string;
  text: string;
  icon: "info" | "error" | "warning" | "success";
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

function Alert({
  title,
  text,
  icon,
  showCancelButton = false, // Valor por defecto: false
  confirmButtonColor = "#3085d6", // Color por defecto
  cancelButtonColor = "#d33", // Color por defecto
  confirmButtonText = "OK", // Texto por defecto
  cancelButtonText = "Cancelar", // Texto por defecto
}: AlertProps) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
}

export default Alert;
