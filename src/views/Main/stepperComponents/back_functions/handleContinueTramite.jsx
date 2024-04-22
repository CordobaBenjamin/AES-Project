import React from "react";
import { continue_session } from "../../../../api/services";
import { open, save } from "@tauri-apps/api/dialog";

export const handleContinue = async (setKey, setError, setIsLoading, setCurrentStep) => {

  try {

    let s_path = await open({
      filters: [{ name: "keyex", extensions: ["keyex"] }],
    });

    let c_path = await save({
      filters: [{name: "keyex", extensions: ["keyex"], },],
    });

    if (s_path == null || c_path == null) {setError("Es necesario que seleccione ambos directorios.");}
    else {
      setIsLoading("continuar");
      let key = await continue_session(s_path, c_path);
      setKey(key);
      await setCurrentStep(2);
    }
    
  } catch (err) {
    setError(err);
  }
};
