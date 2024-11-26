// {/* <div className="p-6 overflow-scroll px-0">
//     <table className="mt-4 w-full min-w-max table-auto text-left">
//         <thead>
//             <tr>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Nombre
//                     </p>
//                 </th>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Teléfono
//                     </p>
//                 </th>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Sector
//                     </p>
//                 </th>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Estatus
//                     </p>
//                 </th>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Fecha de registro
//                     </p>
//                 </th>
//                 <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
//                     <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
//                         Acciones
//                     </p>
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <div className="flex items-center gap-3">
//                         <div className="flex flex-col">
//                             <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
//                                 nombre
//                             </p>
//                         </div>
//                     </div>
//                 </td>
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <div className="flex items-center gap-3">
//                         <div className="flex flex-col">
//                             <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
//                                 telefono
//                             </p>
//                         </div>
//                     </div>
//                 </td>
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <div className="flex flex-col">
//                         <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
//                             otro dato
//                         </p>
//                     </div>
//                 </td>
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <div className="w-max">
//                         {/* if */}
// <div
//     className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
//     style="opacity: 1;"
// >
//     <span className="">Concluido</span>
// </div>
// {/* if */ }
// <div
//     className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-yellow-500/20 text-yellow-600 py-1 px-2 text-xs rounded-md"
//     style="opacity: 1;"
// >
//     <span className="">En Proceso</span>
// </div>
//                     </div >
//                 </td >
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
//                         fecha
//                     </p>
//                 </td>
//                 <td className="p-4 border-b border-blue-gray-50">
//                     <div className="flex items-center space-x-4">
//                         <a
//                             href="/dashboard/edit_buyer/{{buyer.hashed_data}}"
//                             className="relative flex items-center justify-center select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
//                             type="button"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 24 24"
//                                 fill="currentColor"
//                                 aria-hidden="true"
//                                 className="h-4 w-4"
//                             >
//                                 <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
//                             </svg>
//                         </a>
//                         <a
//                             href="/dashboard/buyer/{{ buyer.hashed_data }}"
//                             className="flex items-center justify-center w-10 h-10 max-w-[40px] max-h-[40px]"
//                         >
//                             <svg
//                                 width="1.5rem"
//                                 height="1.5rem"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fill-rule="evenodd"
//                                     clip-rule="evenodd"
//                                     d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z"
//                                     fill="#000000"
//                                 />
//                             </svg>
//                         </a>
//                         <a
//                             href="/dashboard/delete_buyer/{{ buyer.hashed_data }}"
//                             className="flex items-center justify-center w-10 h-10 max-w-[40px] max-h-[40px]"
//                         >
//                             <svg
//                                 id="Trash_24"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 xmlns:xlink="http://www.w3.org/1999/xlink"
//                             >
//                                 <rect
//                                     width="24"
//                                     height="24"
//                                     stroke="none"
//                                     fill="#000000"
//                                     opacity="0"
//                                 />

//                                 <g transform="matrix(0.5 0 0 0.5 12 12)">
//                                     <path
//                                         style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
//                                         transform=" translate(-24, -24)"
//                                         d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 6.5 10 C 5.959046125133644 9.992349565681769 5.455877953142583 10.276562944253993 5.183168417770215 10.743809274571493 C 4.910458882397847 11.211055604888992 4.910458882397847 11.788944395111006 5.183168417770214 12.256190725428507 C 5.455877953142583 12.723437055746007 5.959046125133643 13.007650434318231 6.499999999999999 13 L 8.6367188 13 L 11.15625 39.029297 C 11.43025 41.862297 13.785813 44 16.632812 44 L 31.367188 44 C 34.214187 44 36.56875 41.862297 36.84375 39.029297 L 39.363281 13 L 41.5 13 C 42.040953874866354 13.007650434318231 42.54412204685742 12.723437055746007 42.81683158222979 12.256190725428507 C 43.08954111760215 11.788944395111008 43.08954111760215 11.211055604888992 42.81683158222979 10.743809274571493 C 42.54412204685742 10.276562944253993 42.040953874866354 9.992349565681767 41.5 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 19.5 18 C 20.328 18 21 18.671 21 19.5 L 21 34.5 C 21 35.329 20.328 36 19.5 36 C 18.672 36 18 35.329 18 34.5 L 18 19.5 C 18 18.671 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.671 30 19.5 L 30 34.5 C 30 35.329 29.328 36 28.5 36 C 27.672 36 27 35.329 27 34.5 L 27 19.5 C 27 18.671 27.672 18 28.5 18 z"
//                                         stroke-linecap="round"
//                                     />
//                                 </g>
//                             </svg>
//                         </a>
//                     </div>
//                 </td>
//             </tr >
//         </tbody >
//     </table >
// </div > */}
