/*
 * @Author: QyInvoLing
 * @Date: 2023-07-26 14:10:32
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-26 17:55:21
 * @FilePath: \tauri-mo-client\src-tauri\src\main.rs
 * @Description: 
 */
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod generate_ini;
use generate_ini::{generateSpawn,generateSpawnMap};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,generateSpawn,generateSpawnMap])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
