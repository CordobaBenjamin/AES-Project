import React from "react";
import { encrypt_file } from "../../../../api/services";
import { open, save } from "@tauri-apps/api/dialog";

export const encryptCode = async (key, setError, setIsLoading) => {
    try {
      let inputDirectory = await open({
        directory: true,
        filters: [{name: "keyex", extensions: ["keyex"],},],
      });

      let outputDirectory = await save({
        filters: [{name: "keyex",extensions: ["keyex"],},],
      });

      if (inputDirectory == null || outputDirectory == null) {
        setError("Es necesario seleccionar ambos directorios.");
      } 
      
      else {
        setIsLoading("encriptar");
        await encrypt_file(inputDirectory, outputDirectory, key);
      }

    } catch (err) {
      setError(err);
    }
  };