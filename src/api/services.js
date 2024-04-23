import { invoke } from "@tauri-apps/api";

export const init_session = (name, path) => invoke("init_session", {name, path});
export const continue_session = (sFilePath, cFilePath) => invoke("continue_session", {sFilePath, cFilePath});
export const end_session = (name, pkPath) => invoke("end_session", {name, pkPath});
export const encrypt_file = (input, output, key) => invoke("encrypt_file_wrapper", {input, output, key});
export const decrypt_file = (input, output, key) => invoke("decrypt_file_wrapper", {input, output, key});
