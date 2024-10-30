

export function siguienteCita() {
    return (
        <>
            <div className="bg-white rounded-lg row-span-5 w-full h-full">
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
            </div>
        </>
    );
}