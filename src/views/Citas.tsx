import { Search } from "../components/Search";
import { TablaCitas } from "../components/TableAppointments";
import { ModalInsertCita } from "../components/ModalInsertCita";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";
import { Header } from "../components/Header";

export function Citas() {
  const [search, setSearch] = useState("");
  function handleClearSearch() {
    setSearch("");
  }

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    <div className="">
        <Header />
      </div>
      <div className="h-screen w-screen manrope-500">
        <div className="relative grid grid-cols-3 grid-rows-5 m-5 gap-3 h-[81vh]">
          <div className="grid grid-cols-1 grid-rows-2 bg-white rounded-lg row-span-5 w-full h-full">
            
          </div>
          {/* Sección de bienvenida y ModalInsert */}
          <div className="flex relative flex-col justify-start bg-white rounded-lg row-span-2 col-span-2 w-full h-full pb-2">
            <span className="ml-5 mt-5 text-2xl">Ultimos Clientes Agregados</span>
            <div className="mr-5 mt-auto flex justify-end">
              
            </div>
            {/* aca va lo otro */}
            <div className="mx-2">
            </div>
          </div>

          {/* Sección de próximas citas */}
          <div className="bg-white rounded-lg col-span-2 row-span-3 w-full h-full flex flex-col justify-around">
            <div className="flex relative justify-between">
              
              <h1 className="text-2xl m-3">Próximas Citas</h1>
              {/* <div className="w-[18vh] bg-primaryBlack text-yellow-50 m-3 p-2 rounded-xl text-lg">
                Ver todas las citas
              </div> */}
              <div></div>
            </div>
            <div className="mt-2 mx-2">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
