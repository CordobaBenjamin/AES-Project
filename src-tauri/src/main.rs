// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keyexapi;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn init_session(name: String, path: String) -> Result<(), String> {
    keyexapi::init_session(name, path)
}

#[tauri::command]
async fn continue_session(s_file_path: String, c_file_path: String) -> Result<String, String> {
    keyexapi::continue_session(s_file_path, c_file_path)
}

#[tauri::command]
async fn end_session(name: String, pk_path: String) -> Result<String, String> {
    keyexapi::end_session(name, pk_path)
}

#[tauri::command]
async fn encrypt_file_wrapper(input: String, output: String, key: String) -> Result<(), String> {
    keyexapi::encrypt_file_wrapper(input, output, key)
}

#[tauri::command]
async fn decrypt_file_wrapper(input: String, output: String, key: String) -> Result<(), String> {
    keyexapi::decrypt_file_wrapper(input, output, key)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init_session, continue_session, end_session, encrypt_file_wrapper, decrypt_file_wrapper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
 
