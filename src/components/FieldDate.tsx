interface FieldDateProps {
  id: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  min: string;
}

export function FieldDate({
  id,
  type = "text",
  onChange,
  value,
  min,
}: FieldDateProps) {
  return (
    <div className="relative w-full mx-auto my-1 ">
      <input
        id={id}
        name={id}
        type={type}
        className="block py-2.5 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        onChange={onChange}
        required
        value={value}
        autoComplete="off"
        min={min}
      />
      <label
        htmlFor={id}
        className="absolute text-lg text-gray-800 duration-300 transform -translate-y-6 top-3 -z-10"
      ></label>
    </div>
  );
}
