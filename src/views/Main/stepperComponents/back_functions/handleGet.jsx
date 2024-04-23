import React from "react";
import { end_session } from "../../../../api/services";
import { open } from "@tauri-apps/api/dialog";

export const handleGetCode = async (setKey, setError, setIsLoading, setCurrentStep, userName) => {
  setError(null)
    try {
      let path = await open({
        filters: [{name: "keyex", extensions: ["keyex"],},],
      });

      let sessionName = userName
      
      if (path == null) {
        setError("Debe seleccionar el archivo recibido.");
      } 
      else {
        setIsLoading("recibir");
        let key = await end_session(sessionName, path);
        await setKey(key);
        await setCurrentStep(2);
        setError(null)
      }

    } catch (err) {
      setError(err);
    }
  };