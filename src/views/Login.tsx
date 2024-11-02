import { Field } from "../components/Field";
import { Button } from "../components/Button";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/POSTlogin";

const API_URL = import.meta.env.VITE_API_URL;

import {
  QueryClient,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";


export function Login() {
  return (
    // Provide the client to your App
    <LoginForm />
  );
}

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const credentials = {
    email: email,
    password: password,
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
  if (mutation.isSuccess) {
    if (mutation.data.success) {
      localStorage.setItem("success", mutation.data.success + "");
      navigate("/dashboard");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="h-[93vh] bg-[url(src/images/Flowers.jpg)] rounded-3xl m-3 bg-cover bg-center"></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[9vh] text-[2228310] p-2 lora-400">Bienvenida</h1>
          <p className="text-[#000000] text-[3vh] p-2 w-3/4 text-center manrope-400">
            Ingrese su usuario y contraseña para continuar
          </p>
          <div className="w-[50vh] my-3">
            <div className="flex flex-col manrope-400">
              <Field id="Usuario" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col manrope-400 my-3">
              <Field id="Contraseña" onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <div className="flex flex-col manrope-400 mt-6">
              <Button
                id="submit"
                text={"Iniciar sesión"}
                type={"submit"}
                onClick={(event) => {
                  event.preventDefault();
                  mutation.mutate(credentials);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
