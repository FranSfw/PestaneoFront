import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fields } from "../components/Fields";
import { RadioButton } from "../components/RadioButton";
import { Camera } from "../components/Camera";
import { useState } from "react";
import SignaturePad from "signature_pad";
import { useRef } from "react";
import { useEffect } from "react";

interface ModalInsertProps {
  closeModal: () => void;
}

export function ModalInsertCita({ closeModal }: ModalInsertProps) {
  const [showModal, setShowModal] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [picture, setPicture] = useState("");
  const [allergies, setAllergies] = useState("");
  const [hasAllergies, setHasAllergies] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    const initializeSignaturePad = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;

        const context = canvas.getContext("2d");
        if (context) {
          context.scale(ratio, ratio);
        }
        signaturePadRef.current = new SignaturePad(canvas);
        console.log("SignaturePad initialized:", signaturePadRef.current);
      }
    };

    if (showModal) {
      setTimeout(initializeSignaturePad, 0);
    }
  }, [showModal]);

  const clearSignature = () => {
    signaturePadRef.current?.clear();
  };

  console.log(hasAllergies);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const saveData = () => { };

  return (
    <>
      <IconButton id="insert" icon={faPlus} onClick={handleClick} />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Insertar Datos de la Cita
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto">
                  <form className="max-w-md mx-auto">
                    <div className="grid md:grid-cols-2 md:gap-12">
                      <Fields
                        id="phoneClient"
                        name="phoneClient"
                        type="tel"
                        text="Teléfono del Cliente"
                        placeholder="Introduce el teléfono del cliente"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button
                        className="bg-tertiaryYellow text-primaryBlack hover:bg-tertiaryBlack focus:bg-tertiaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow font-semibold uppercase text-sm px-6 py-3 rounded mr-16 mb-4 transition-all hover:duration-500 focus:duration-0"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Buscar
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="cliente"
                        name="cliente"
                        type="text"
                        text="Nombre del Cliente"
                        placeholder="Nombre del cliente"
                        onChange={(e) => setFirstName(e.target.value)}
                      />

                      <Fields
                        id="Fecha"
                        name="Fecha"
                        type="date"
                        text="Fecha de la Cita"
                        placeholder="Fecha de la cita"
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </div>
                    <Fields
                      id="encargado"
                      name="encargado"
                      type="text"
                      text="Introduce Nombre del Encargado"
                      placeholder="Nombre del encargado"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="retoque"
                        name="retoque"
                        type="text"
                        text="Retoque"
                        placeholder="Numero de dias"
                        onChange={(e) => setBirth(e.target.value)}
                      />

                      <Fields
                        id="Fecha"
                        name="Fecha"
                        type="date"
                        text="Fecha de la Cita"
                        placeholder="Fecha de la cita"
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </div>
                    <div className="relative grid grid-cols-2 w-full">
                      <RadioButton
                        id="allergies"
                        text="Cuenta con alergias?"
                        onChange={(e) => setHasAllergies(e.target.value)}
                      />
                      <div className="hidden">
                        <Fields
                          id="allergies_text"
                          name="allergies_text"
                          type="text"
                          text="Cuáles?"
                          placeholder=""
                          onChange={(e) => setAllergies(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <p>Firme aquí</p>
                      <canvas
                        ref={canvasRef}
                        style={{
                          border: "2px solid #000",
                          width: "100%",
                          height: "200px",
                        }}
                      ></canvas>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Limpiar Firma
                      </button>
                    </div>
                    <div className="pt-4">
                      <Camera onChange={(e) => setPicture(e.target.value)} />
                    </div>
                  </form>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent text-red-500 hover:bg-red-500 focus:bg-red-500 hover:text-white focus:text-white font-bold uppercase px-6 py-3 text-sm rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-tertiaryYellow text-primaryBlack hover:bg-tertiaryBlack focus:bg-tertiaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          <script></script>
        </>
      ) : null}
    </>
  );
}
