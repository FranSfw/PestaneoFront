import Slider from "react-slick";
import "../App.css";
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllCitas } from "../services/CitasServices";
import { CajaCita } from "./CajitaClients";


export function ClientSlider() {


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
    const datosArray = [
        {
            nombre: 'Caja 1',
            telefono: '10:00 AM',
        },
        {
            nombre: 'Caja 2',
            telefono: '11:30 AM',
        },
        {
            nombre: 'Caja 3',
            telefono: '12:00 PM',
        },
        {
            nombre: 'Caja 4',
            telefono: '1:00 PM',
        },
        {
            nombre: 'Caja 5',
            telefono: '2:00 PM',
        },
        {
            nombre: 'Caja 6',
            telefono: '3:00 PM',
        },
        {
            nombre: 'Caja 7',
            telefono: '4:00 PM',
        },
        {
            nombre: 'Caja 8',
            telefono: '5:00 PM',
        },
        {
            nombre: 'Caja 9',
            telefono: '6:00 PM',
        },
        {
            nombre: 'Caja 10',
            telefono: '7:00 PM',
        },
        {
            nombre: 'Caja 11',
            telefono: '8:00 PM',
        },
        {
            nombre: 'Caja 12',
            telefono: '9:00 PM',
        },
        {
            nombre: 'Caja 13',
            telefono: '10:00 PM',
        },
        {
            nombre: 'Caja 14',
            telefono: '11:00 PM',
        },
        {
            nombre: 'Caja 15',
            telefono: '12:00 AM',
        },
    ];

    return (
        <div className="slider-container">


            <Slider {...settings}>


                {datosArray.map((data, index) => (
                    <CajaCita key={index} nombre={data.nombre} telefono={data.telefono} />
                ))}

            </Slider>

        </div>
    );
}

