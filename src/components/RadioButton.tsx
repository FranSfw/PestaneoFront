interface radioProps {
  id: string;
  text: string;
  group: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioButton({ id, text, group, onChange }: radioProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="flex absolute text-gray-800 peer-focus:text-gray-800 -top-3 text-sm"
      >
        {text}
      </label>
      <div className="pt-1 pb-3">
        <ul className="items-center w-fit text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex">
          <li className="w-fit">
            <div className="flex items-center ps-2">
              <input
                id="radio-si"
                type="radio"
                value="si"
                name={group}
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 focus:ring-2"
                onChange={onChange}
              //checked='si'  // Marcar el radio si está seleccionado
              />
              <label htmlFor="radio-si" className="w-fit py-2 pr-2 ms-2 text-sm font-medium text-gray-900">
                Si
              </label>
            </div>
          </li>
          <li className="w-fit">
            <div className="flex items-center ps-2">
              <input
                id="radio-no"
                type="radio"
                value="no"
                name={group}
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 focus:ring-2"
                onChange={onChange}
              //checked={selectedOption === 'no'}  // Marcar el radio si está seleccionado
              />
              <label htmlFor="radio-no" className="w-fit py-2 pr-2 ms-2 text-sm font-medium text-gray-900">
                No
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
