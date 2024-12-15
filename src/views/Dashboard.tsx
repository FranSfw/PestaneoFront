//import App from "../App.css";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faPenToSquare,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
//import { IconButton } from "../components/IconButton";
import { useNavigate } from "react-router-dom";
//import { Button } from "../components/Button";
import { Header } from "../components/Header";
//import { Search } from "../components/Search";
import { ModalInsert } from "../components/ModalInsert";
import { ModalInsertCita } from "../components/ModalInsertCita";
import { Cajita } from "../components/Cajita";
import { MultipleItems } from "../components/Slider";
import { ClientSlider } from "../components/ClientSlider";
import { Button2 } from "../components/Button2";
import { useState } from "react";
import { ModalView } from "../components/ModalView";
import { SiguienteCita } from "../components/siguienteCita";
import Alert from "../components/Alert";

export function Dashboard() {
  const navigate = useNavigate();

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
      <div className="">
        <Header />
      </div>
      <div className="h-screen w-screen manrope-500">
        <div className="relative grid grid-cols-3 grid-rows-5 m-5 gap-3 h-[81vh]">
          <div className="grid grid-cols-1 grid-rows-2 bg-white rounded-lg row-span-5 w-full h-full">
            <SiguienteCita />
          </div>
          {/* Sección de bienvenida y ModalInsert */}
          <div className="flex relative flex-col justify-start bg-white rounded-lg row-span-2 col-span-2 w-full h-full pb-2">
            <div className="relative pt-6">
              <ModalInsert closeModal={closeModal} />
            </div>
            <span className="ml-5 mt-5 text-2xl">
              Ultimos Clientes Agregados
            </span>

            {/* aca va lo otro */}
            <div className="mx-2 pt-6">
              <ClientSlider />
            </div>
          </div>

          {/* Sección de próximas citas */}
          <div className="bg-white rounded-lg col-span-2 row-span-3 w-full h-full flex flex-col justify-around">
            <div className="flex relative justify-between">
              <ModalInsertCita closeModal={closeModal} />
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                  onClick={handleOutsideClick}
                >
                  <ModalInsertCita closeModal={closeModal} />
                </div>
              )}
              <h1 className="text-2xl m-3">Próximas Citas</h1>
              {/* <div className="w-[18vh] bg-primaryBlack text-yellow-50 m-3 p-2 rounded-xl text-lg">
                Ver todas las citas
              </div> */}
              <div></div>
            </div>
            <div className="mt-2 mx-2">
              <MultipleItems />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
