import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"; // Importa el ícono

interface ComboBoxProps {
  id: string;
  options: any[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export function ComboBoxEmployees({
  id,
  options,
  onChange,
  value,
}: ComboBoxProps) {
  return (
    <div className="relative z-0 w-full mb-5 mt-2 group">
      <select
        defaultValue=""
        id={id}
        name={id}
        className="block py-2 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        onChange={onChange}
        required
        value={value}
      >
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.id + " " + option.nombre + " " + option.apellido}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute text-lg text-gray-800 duration-300 transform -translate-y-6 top-1 -z-10"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      {/* Icono de flecha */}
      <FontAwesomeIcon
        icon={faChevronDown}
        className="absolute right-[2px] top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
      />
    </div>
  );
}
