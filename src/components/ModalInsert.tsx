import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fields } from "../components/Fields";
import { RadioButton } from "../components/RadioButton";
import { Camera } from "../components/Camera";
import { useState } from "react";

interface ModalInsertProps {
  closeModal: () => void;
}

export function ModalInsert({ closeModal }: ModalInsertProps) {
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
  const [hasMeds, setHasMeds] = useState("");
  const [meds, setMeds] = useState("");
  const [hasSensibililty, setHasSensibililty] = useState("");
  const [hasDermatitis, setHasDermatitis] = useState("");
  const [hasEyeInfection, setHasEyeInfection] = useState("");
  const [hasEyePain, setHasEyePain] = useState("");
  const [hasLatex, setHasLatex] = useState("");

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
                    Insertar Datos del Cliente
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
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="name"
                        name="name"
                        type="text"
                        text="Nombre"
                        placeholder="Introduce tu nombre"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <Fields
                        id="lastname"
                        name="lastname"
                        type="text"
                        text="Apellido"
                        placeholder="Introduce tu apellido"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="birth"
                        name="birth"
                        type="date"
                        text="Fecha de nacimiento"
                        placeholder=""
                        onChange={(e) => setBirth(e.target.value)}
                      />
                      <Fields
                        id="phone"
                        name="phone"
                        type="tel"
                        text="Teléfono"
                        placeholder="Introduce tu teléfono"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <Fields
                      id="email"
                      name="email"
                      type="email"
                      text="Correo"
                      placeholder="Introduce tu correo"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Fields
                      id="address"
                      name="address"
                      type="text"
                      text="Dirección"
                      placeholder="Introduce tu dirección"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="relative grid grid-cols-2 w-full">
                      <RadioButton
                        id="meds"
                        group="meds"
                        text="¿Se encuentra tomando algún medicamento?"
                        onChange={(e) => setHasMeds(e.target.value)} />

                      <div className="hidden">
                        <Fields
                          id="meds_text"
                          name="meds_text"
                          type="text"
                          text="¿Cuáles?"
                          placeholder=""
                          onChange={(e) => setMeds(e.target.value)}
                        />
                      </div>

                    </div>
                    <div className="relative grid grid-cols-2 w-full">
                      <RadioButton
                        id="allergies"
                        group="allergies"
                        text="¿Cuenta con alergias?"
                        onChange={(e) => setHasAllergies(e.target.value)}
                      />

                      <div className="hidden">
                        <Fields
                          id="allergies_text"
                          name="allergies_text"
                          type="text"
                          text="¿Cuáles?"
                          placeholder=""
                          onChange={(e) => setAllergies(e.target.value)}
                        />
                      </div>

                    </div>
                    <div className="relative grid grid-cols-2 w-full">
                      <RadioButton
                        id="sensibility"
                        group="sensibility"
                        text="¿Cuenta con sensibilidad a algún producto?"
                        onChange={(e) => setHasAllergies(e.target.value)}
                      />

                      <div className="hidden">
                        <Fields
                          id="sensibility_text"
                          name="sensibility_text"
                          type="text"
                          text="¿Cuáles?"
                          placeholder=""
                          onChange={(e) => setAllergies(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="dermatitis"
                        group="dermatitis"
                        text="¿Padece dermatitis?"
                        onChange={(e) => setHasAllergies(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="eye_infection"
                        group="eye_infection"
                        text="¿Padece alguna infección en los ojos?"
                        onChange={(e) => setHasEyeInfection(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="eye_pain"
                        group="eye_pain"
                        text="¿Padece alguna dolencia o inflamación en los ojos?"
                        onChange={(e) => setHasEyePain(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="latex"
                        group="latex"
                        text="¿Tiene alergia al látex?"
                        onChange={(e) => setHasLatex(e.target.value)}
                      />
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
