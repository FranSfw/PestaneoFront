import { Search } from "../components/Search";
import { TablaCitas } from "../components/TableAppointments";
import { ModalInsertCita } from "../components/ModalInsertCita";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";
import { Header } from "../components/Header";
import { ModalInsert } from "../components/ModalInsert";
import { TablaClientes } from "../components/TableClientes";

export function Clientes() {
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
          {/* Sección de bienvenida y ModalInsert */}
          <div className="flex relative flex-col justify-start bg-white rounded-lg row-span-5 col-span-3 w-full h-full pb-2">
            <div className="w-[95%] flex justify-between items-center">
              <span className="ml-5 mt-5 text-2xl">
                Tabla Clientes
              </span>
              <div className="mr-5  flex justify-end">
                <ModalInsert  />
              </div>
            </div>
            <div className="w-[95%] m-auto overflow-hidden mt-8">
              <TablaClientes searchInput={search} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
