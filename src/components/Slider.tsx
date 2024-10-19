import Slider from "react-slick";
import "../App.css";
import {Cajita} from "./Cajita";

export function MultipleItems() {
  
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
  const datosArray = [
    {
        nombre: 'Caja 1',
        hora: '10:00 AM',
        proceso: 'Empaque',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 2',
        hora: '11:30 AM',
        proceso: 'Envío',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 3',
        hora: '12:00 PM',
        proceso: 'Recepción',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 4',
        hora: '1:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 5',
        hora: '2:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 6',
        hora: '3:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 7',
        hora: '4:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 8',
        hora: '5:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 9',
        hora: '6:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 10',
        hora: '7:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 11',
        hora: '8:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 12',
        hora: '9:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 13',
        hora: '10:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 14',
        hora: '11:00 PM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    {
        nombre: 'Caja 15',
        hora: '12:00 AM',
        proceso: 'Entrega',
        foto: '/images/gato.jpg',
    },
    ];

  return (
    <div className="slider-container">
      
     
      <Slider {...settings}>
        
      
            {datosArray.map((datos, index) => (
                <Cajita key={index} datos={datos} />
            ))}
        
      </Slider>
      
    </div>
  );
}

