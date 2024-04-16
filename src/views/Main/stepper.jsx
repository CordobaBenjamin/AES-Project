import * as React from "react";
import { createTheme } from "@mui/material/styles";
import "animate.css";
import { invoke } from "@tauri-apps/api";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const steps = ["Seleccionar Trámite", "Recibir Código", "Completar Trámite"];
const theme = createTheme({
  palette: {
    primary: {
      main: "#f2df28",
    },
  },
});

export default function StepperComponent() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleStep = (step) => () => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    const newStep =
      currentStep + 1 < steps.length ? currentStep + 1 : currentStep;
    setCurrentStep(newStep);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStartTramite = () => {
    invoke(`init_session`)
    handleNext();
  };

  const handleContinueTramite = () => {
    invoke(`continue_session`)
    setCurrentStep(2);
  };

  const handleReceiveCode = () => {
    invoke(``)
    handleNext();
  };

  const handlePutTheCode = () => {
    invoke(`end_session`)
    handleNext();
  };

  const handlePutCode = () => {
    handleNext();
  };

  return (
    <Box
      className="main_box_stepper animate__animated animate__pulse animate__fast"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
        height: "80%",
        margin: "0 auto",
        padding: "5vh",
        boxShadow: "10",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={currentStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
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
          <Typography variant="h5" sx={{ py: 1 }}>
            {currentStep + 1}
          </Typography>

          <Typography variant="h6" sx={{ py: 1, textAlign: "center" }}>
            {steps[currentStep]}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {currentStep === 0 && (
              <>
                <Grid item sx={{ mt: 3, mr: 2 }}>
                  <Button
                    className="animate__animated animate__fadeInUp"
                    sx={{ color: "#f1b61c", fontSize: 16, borderBottom: 2 }}
                    onClick={handleStartTramite}
                  >
                    Iniciar Trámite
                  </Button>
                </Grid>
                <Grid item sx={{ mt: 3, ml: 2 }}>
                  <Button
                    className="animate__animated animate__fadeInUp"
                    sx={{ color: "#f1b61c", fontSize: 16, borderBottom: 2 }}
                    onClick={handleContinueTramite}
                  >
                    Continuar Tramite
                  </Button>
                </Grid>
              </>
            )}
            {currentStep === 1 && (
              <Grid item sx={{ mt: 3 }}>
                <Button
                  className="animate__animated animate__fadeInUp"
                  sx={{ color: "#f1b61c", fontSize: 18, borderBottom: 2 }}
                  onClick={handleReceiveCode}
                >
                  Recibio el Codigo?
                </Button>
              </Grid>
            )}
            {currentStep === 2 && (
              <Grid item sx={{ mt: 3 }}>
                <Button
                  className="animate__animated animate__fadeInUp"
                  sx={{ color: "#f1b61c", fontSize: 18, borderBottom: 2 }}
                  onClick={handlePutTheCode}
                >
                  Introducir Codigo
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "center",
            mx: "auto",
            width: "50%",
            p: 5,
            pt: 0,
          }}
        >
          <Button
            color="primary"
            disabled={currentStep === 0}
            onClick={handleBack}
            sx={{ mt: 2, width: "100%", borderBottom: 3 }}
          >
            Back
          </Button>
          <Button
            color="primary"
            onClick={handleNext}
            sx={{ mt: 2, width: "100%", borderBottom: 3 }}
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
