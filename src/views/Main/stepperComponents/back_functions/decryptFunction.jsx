import React from "react";
import { decrypt_file } from "../../../../api/services";
import { open, save } from "@tauri-apps/api/dialog";

const getFirstExtension = (path) => {
  if (typeof path !== "string" || !path.includes(".")) {
    return "";
  }

  const parts = path.split(".");
  return parts.length > 1 ? parts[parts.length - 2] : "";
};

export const decryptCode = async (key, setError, setIsLoading) => {
  setError(null)
  try {
    let inputDirectory = await open({filters: [{name: "cif", extensions: ["cif"]}]});

    if (inputDirectory == null) {
      setError("Debe seleccionar un archivo.");
      return;
    }

    let outputFileExt = getFirstExtension(inputDirectory);

    let outputDirectory = await save({
      filters: [{ name: `${outputFileExt}`, extensions: [`${outputFileExt}`] }],
    });

    if (outputDirectory == null) {
      setError("Debe seleccionar donde se guardara el archivo descifrado");
    } else {
      setIsLoading("encriptar");
      await decrypt_file(inputDirectory, outputDirectory, key);
      setError(null)
    }
  } catch (err) {
    setError(err);
  }
};
