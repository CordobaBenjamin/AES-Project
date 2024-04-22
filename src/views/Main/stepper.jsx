import { React } from "react";

import {
  Box,
  Typography,
  Grid,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import First_step from "./stepperComponents/stepper_dom/first_step";
import Second_step from "./stepperComponents/stepper_dom/second_step";
import Third_step from "./stepperComponents/stepper_dom/third_step";
import AppStateContext, { useAppState } from "../../AppStateContext";

import "animate.css";

const steps = ["Primer paso", "Segundo paso", "Tercer paso"];
const StepperComponent = () => {
  const { currentStep, isLoading } = useAppState();

  const ButtonSteps = () => {
    switch (currentStep) {
      case 0:
        return <First_step />;
      case 1:
        return <Second_step />;
      case 2:
        return <Third_step />;
      default:
        return "No se encontro la variable 'currentStep' Revisar 'ButtonStep'";
    }
  };

  return (
    <Box
      className="main_box_stepper animate__animated animate__pulse animate__fast"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
        height: "60%",
        margin: "0 auto",
        padding: "4vh",
        py: "6vh",
        boxShadow: "24",
        borderRadius: "12px",
        
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={currentStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                
                className="animate__animated animate__fadeInDown"
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <ButtonSteps />
          </Grid>

        </Box>
      </Box>
    </Box>
  );
};

export default StepperComponent;
