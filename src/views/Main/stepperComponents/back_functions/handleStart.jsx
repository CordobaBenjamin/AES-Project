import React from "react";
import { save } from "@tauri-apps/api/dialog";
import { init_session } from "../../../../api/services";

const words = [
    "azul",
    "rojo",
    "verde",
    "amarillo",
    "naranja",
    "morado",
    "gato",
    "perro",
    "ratón",
    "pájaro",
    "elefante",
    "jirafa",
    "veloz",
    "brillante",
    "suave",
    "fuerte",
    "rápido",
    "lento",
  ];

const randomNameGenerator = () => {
  const adjetive = words[Math.floor(Math.random() * words.length)];
  const sustantive = words[Math.floor(Math.random() * words.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${adjetive}_${sustantive}_${randomNumber}`;
}

export const handleStart = async (setError, setUserName, setIsLoading, setCurrentStep) => {
  setError(null)  
    try {
      let path = await save({
        filters: [{ name: "keyex", extensions: ["keyex"],},],
      });

      let randomName = randomNameGenerator();

      if (path == null)  {setError("Debe guardar el archivo que enviara.");}
        else {
          setIsLoading("iniciar");
          await init_session(randomName, path);
          await setUserName(randomName)
          await setCurrentStep(1);
          setError(null)
        }

    } catch (err) {
      setError(err);
    }
  };