import { ModalView } from "../components/ModalView";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAllCitas } from '../services/CitasServices';



export function SiguienteCita() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, error, isLoading } = useQuery({ queryKey: ['citasInfo'], queryFn: getAllCitas });

    const citas = data?.citas || []; // Asegúrate de que citas sea un arreglo
    const cita = citas.length > 0 ? citas[0] : null;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
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

    return (
        <>
            {/* Seccion de siguiente cita*/}
            <div className="relative">
                <div className="mr-5 mt-auto flex justify-end">
                    <ModalView closeModal={closeModal} type="next" />
                    {isModalOpen && (
                        <div
                            className="fixed bg-gray-800 bg-opacity-50 flex justify-center items-center"
                            onClick={handleOutsideClick}
                        >
                            <ModalView closeModal={closeModal} type="next" />
                        </div>
                    )}
                </div>
                <h2 className="ml-5 mt-4 text-2xl">Siguiente cita</h2>
                <ul className="flex flex-col mt-8 ms-6 text-xl tracking-tight text-gray-900 font-[400]">
                    <li>
                        <h3><span className="font-semibold mr-1">Hora:</span> {formatHour(cita?.fecha)}</h3>
                    </li>
                    <li>
                        <h3><span className="font-semibold mr-1">Cliente:</span> {cita?.cliente_nombre} {cita?.cliente_apellido}</h3>
                    </li>
                    <li>
                        <h3><span className="font-semibold mr-1">Procedimiento:</span> {cita?.tipo_procedimiento} </h3>
                    </li>
                </ul>
            </div>

            {/* Seccion de cita anterior*/}
            <div className="relative">
                <div className="mr-5 mt-auto flex justify-end">
                    <ModalView closeModal={closeModal} type="last" />
                    {isModalOpen && (
                        <div
                            className="fixed bg-gray-800 bg-opacity-50 flex justify-center items-center"
                            onClick={handleOutsideClick}
                        >
                            <ModalView closeModal={closeModal} type="last" />
                        </div>
                    )}
                </div>
                <h2 className="ml-5 mt-4 text-2xl">Ultima cita</h2>
                <ul className="flex flex-col mt-8 ms-6 text-xl tracking-tight text-gray-900 font-[400]">
                    <li>
                        <h3>Hora: </h3>
                    </li>
                    <li>
                        <h3>Procedimiento: </h3>
                    </li>
                </ul>
            </div>
        </>
    );
}