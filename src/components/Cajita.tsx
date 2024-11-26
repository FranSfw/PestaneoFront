
//Aca falta el servicio
// function cajaCita(info: Props) {
//   return (
//       <Cajita datos={info} />
//   )
// }

//TODO:Cambiar los datos de la interfaz por los datos que se obtienen del servicio
interface datosCaja {
  cliente_nombre: string;
  cliente_apellido: string;
  fecha: string;
  tipo_procedimiento: string;

}
const formatDay = (fecha: Date | string | undefined) => {
  if (fecha === undefined) return "";
  const date = new Date(fecha);
  return date.toLocaleString("es-MX", {
    month: 'long',
    day: 'numeric',
  });
};
const formatHour = (fecha: Date | string | undefined) => {
  if (fecha === undefined) return "";
  const date = new Date(fecha);
  return date.toLocaleString("es-MX", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

interface Props {
  datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
}

export const Cajita: React.FC<Props> = ({ datos }) => {

  const { cliente_nombre, cliente_apellido, fecha, tipo_procedimiento } = datos; // Extraemos las propiedades del objeto `datos`

  return (

    <div className="m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c] ">
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {cliente_nombre} {cliente_apellido}
      </h2>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className=" font-[800]">Dia: </span>{formatDay(fecha)}
      </p>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className=" font-[800]">Hora: </span>{formatHour(fecha)}
      </p>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className='font-[800]'>Proceso: </span> {tipo_procedimiento}
      </p>
      {/* <img className="w-[90%] h-[90%]" src={foto} alt={`Foto de ${cliente_nombre}`} />*/}
    </div>
  );
};

