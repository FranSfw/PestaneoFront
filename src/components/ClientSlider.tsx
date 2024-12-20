import Slider from "react-slick";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { getAllClientes } from "../services/ClientesServices";
import { CajaCita } from "./CajitaClients";

export function ClientSlider() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientesInfo"],
    queryFn: getAllClientes,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: false,
    verticalSwiping: false,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.clientes
          .slice()
          .reverse()
          .map((cliente, index) => (
            <CajaCita
              key={index}
              nombre={cliente.nombre}
              apellido={cliente.apellido}
              telefono={cliente.telefono}
              email={cliente.email}
              medicamentos={cliente.medicamentos}
              alergias={cliente.alergias}
              sensibilidad_productos={cliente.sensibilidad_productos}
              dermatitis={cliente.dermatitis}
              infeccion_ojos={cliente.infeccion_ojos}
              dolencia_ojos={cliente.dolencia_ojos}
              latex={cliente.latex}
              foto={cliente.foto}
              // NO CAMBIAR ESTO
              cliente_id={cliente.id}
            />
          ))}
      </Slider>
    </div>
  );
}
