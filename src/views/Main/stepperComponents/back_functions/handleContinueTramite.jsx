import React from "react";
import { continue_session } from "../../../../api/services";
import { open, save, message } from "@tauri-apps/api/dialog";

export const handleContinue = async (
  setKey,
  setError,
  setIsLoading,
  setCurrentStep
) => {
  setError(null);
  try {
    let s_path = await open({
      filters: [{ name: "keyex", extensions: ["keyex"] }],
    });

    if (s_path == null) {
      setError("Debe seleccionar el archivo recibido");
    } else {
      await message(
        "Guarde el archivo necesario para terminar el intercambio.",
        {
          okLabel: "Aceptar",
          title: "",
        }
      );

      let c_path = await save({
        filters: [{ name: "keyex", extensions: ["keyex"] }],
      });

      if (c_path == null) {
        setError("Debe guardar el archivo a enviar.");
      } else {
        setIsLoading("continuar");
        let key = await continue_session(s_path, c_path);
        setKey(key);
        await setCurrentStep(2);
        setError(null);
      }
    }
  } catch (err) {
    setError(err);
  }
};
