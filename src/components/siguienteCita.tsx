import { ModalView } from "./ModalView";
import { useState } from "react";


export function SiguienteCita() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };


    const handleClick = () => {
        navigate("/");
    };

    return (
        <>
            <div className="relative bg-white rounded-lg row-span-5 w-full h-full">
                <div className="mr-5 mt-auto flex justify-end">
                    <ModalView closeModal={closeModal} />
                    {isModalOpen && (
                        <div
                            className="fixed bg-gray-800 bg-opacity-50 flex justify-center items-center"
                            onClick={handleOutsideClick}
                        >
                            <ModalView closeModal={closeModal} />
                        </div> //este div no debeia estar en la linea de arriba?
                    )}
                </div>
                <div className="flex justify-between">
                    <span className="ml-5 mt-4 text-2xl">Siguiente cita</span>
                </div>
                <div className="flex flex-col mt-8 ms-6">
                    <p className="mb-2 text-xl tracking-tight text-gray-900 ">
                        <span className="font-[400]">Hora: </span>
                    </p>
                    <p className="mb-2 text-xl tracking-tight text-gray-900">
                        <span className="font-[400]">Cliente: </span>
                    </p>
                    <p className="mb-2 text-xl tracking-tight text-gray-900">
                        <span className="font-[400]">Procedimiento: </span>
                    </p>
                </div>
                <div></div>
            </div>{""}
        </>
    );
}