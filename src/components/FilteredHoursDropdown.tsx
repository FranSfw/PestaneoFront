import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ComboBoxPropsHours {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  date: string;
}

export function FilteredHoursDropdown({
  id,
  onChange,
  value,
  date,
}: ComboBoxPropsHours) {
  const [filteredHours, setFilteredHours] = useState<string[]>([]);
  const hours = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  useEffect(() => {
    if (!date) return;

    // Fecha actual sin tiempo de zona
    const now = new Date();
    const selectedDay = new Date(date).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0]; // Hoy sin horas

    // Hora actual en minutos desde las 00:00
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinutes;

    const updatedHours = hours.filter((hour) => {
      const [hourStr, minuteStr] = hour.split(":");
      const totalMinutes = parseInt(hourStr) * 60 + parseInt(minuteStr);

      // Si es hoy, filtrar horas pasadas
      if (selectedDay === today) {
        return totalMinutes >= currentTotalMinutes;
      }

      // Si no es hoy, mostrar todas las horas
      return hours;
    });

    setFilteredHours(updatedHours);
  }, [date]); // Ejecutar cuando cambia la fecha seleccionada

  return (
    <div className="relative z-0 w-full mb-5 group pt-2">
      <select
        defaultValue=""
        id={id}
        name={id}
        className="relative block py-2.5 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        onChange={onChange}
        value={value}
        required
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {filteredHours.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {/* <FontAwesomeIcon iconProp="fa-light fa-circle-chevron-down" className="absolute" /> */}
      </select>
      <label
        htmlFor={id}
        className="absolute text-lg text-gray-800 duration-300 transform -translate-y-6 top-3 -z-10"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
    </div>
  );
}
