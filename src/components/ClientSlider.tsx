import Slider from "react-slick";
import "../App.css";
import { useQuery } from '@tanstack/react-query';
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
        arrows: false
    };

    return (
        <div className="slider-container">


            <Slider {...settings}>


                {data.clientes.map((cliente, index) => (
                    <CajaCita key={index} nombre={cliente.nombre} telefono={cliente.telefono} apellido={cliente.apellido} />
                ))}

            </Slider>

        </div>
    );
}

