import React from "react";
import { end_session } from "../../../../api/services";
import { open } from "@tauri-apps/api/dialog";

export const handleGetCode = async (setKey, setError, setIsLoading, setCurrentStep, userName) => {

    try {
      let path = await open({
        filters: [{name: "keyex", extensions: ["keyex"],},],
      });

      let sessionName = userName
      
      if (path == null) {
        setError("Es necesario seleccionar un directorio.");
      } 
      else {
        setIsLoading("recibir");
        let key = await end_session(sessionName, path);
        await setKey(key);
        await setCurrentStep(2);
      }

    } catch (err) {
      setError(err);
    }
  };