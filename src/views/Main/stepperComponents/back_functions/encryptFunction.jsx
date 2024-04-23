import React from "react";
import { encrypt_file } from "../../../../api/services";
import { open, save } from "@tauri-apps/api/dialog";

const getFileExtension = (path) => {
  if (typeof path !== "string" || !path.includes(".")) {
    return "";
  }

  return path.split(".").pop();
};

export const encryptCode = async (key, setError, setIsLoading) => {
  setError(null)
  try {
    let inputDirectory = await open();

    if (inputDirectory == null) {
      setError("Debe seleccionar un archivo para cifrar.");
    } 
    else {
      let inputFileExt = getFileExtension(inputDirectory);

      let outputDirectory = await save({
        filters: [
          { name: `${inputFileExt}.cif`, extensions: [`${inputFileExt}.cif`] },
        ],
      });

      if (outputDirectory == null) {
        setError("Debe guardar el archivo cifrado.");
      } else {
        setIsLoading("encriptar");
        await encrypt_file(inputDirectory, outputDirectory, key);
        setError(null);
      }
    }
  } catch (err) {
    setError(err);
  };
}
  