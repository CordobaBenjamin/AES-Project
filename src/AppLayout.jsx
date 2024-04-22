import * as React from "react";
import { AppStateProvider } from "./AppStateContext";
import Navbar from "./views/Navbar/navbar";
import StepperComponent from "./views/Main/stepper";
import "./styles.css";

function AppLayout() {
  return (
    <AppStateProvider>
      <div className="container">
        <Navbar />
        <div className="first_div">
          <StepperComponent />
        </div>
      </div>
    </AppStateProvider>
  );
}

export default AppLayout;
