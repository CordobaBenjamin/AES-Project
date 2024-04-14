import * as React from "react";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./styles.css";
import Navbar from "./views/Navbar/navbar";
import First_step from "./views/Main/stepper";

function AppLayout() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <Navbar />
      <div className="first_div">
        <First_step />
      </div>
    </div>
  );
}

export default AppLayout;
