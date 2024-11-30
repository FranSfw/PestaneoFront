import Slider from "react-slick";
import "../App.css";
import { Cajita } from "./Cajita";
import { useQuery } from '@tanstack/react-query';
import { getAllCitas } from '../services/CitasServices';

export function MultipleItems() {
    const { data, error } = useQuery({ queryKey: ['citasInfo'], queryFn: getAllCitas });

    if (!data) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Error</div>
    }


    const settings = {
        dots: false, // los dos son lo que mostraba "next"
        infinite: false, //fran quito el infinito nice
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1, //no esta mal de euna en una, se siente bien en la ipad, pero si quieres muevele,, puedo quitar lo de next? e simon, a ver qp
        swipeToSlide: true,
        vertical: false,
        verticalSwiping: false,
        arrows: false
    };


    return (
        <div className="slider-container">


            <Slider {...settings}>

                {data.citas.map((citas, index) => (
                    <Cajita key={index} datos={citas} />
                ))}

            </Slider>

        </div>
    );
}

