// import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
// //import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { TablaCitas } from "../components/TableAppointments";
// import { ModalInsertCita } from "../components/ModalInsertCita";
// import { useState } from "react";
// //import { RefreshButton } from "../components/refreshButton";

// export function Citas() {
//     const [search, setSearch] = useState("");
//     function handleClearSearch() {
//         setSearch("");
//     }

//     function handleSearch(query: string): void {
//         throw new Error("Function not implemented.");
//     }

//     return (
//         <>
//             <div className="p-10 m-auto h-min  ">
//                 <div className="pb-20 text-center">
//                     <span className="text-4xl font-semibold text-black ">Citas</span>

//                     <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">


//                         <div className=" w-full flex justify-end">
//                             <ModalInsertCita />
//                         </div>
//                     </div>
//                     <TablaCitas searchInput={search} />
//                 </div>
//             </div>
//         </>
//     );
// }
